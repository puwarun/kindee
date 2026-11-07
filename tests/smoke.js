// Smoke Test: รันหลัง deploy เปิดเว็บจริงแล้วเช็คว่าส่วนสำคัญยังอยู่
// ใช้: node tests/smoke.js <URL ของเว็บ> <commit ที่เพิ่ง deploy>
const url = process.argv[2];
const expectedVersion = process.argv[3] || "";
if (!url) { console.error("ต้องระบุ URL"); process.exit(2); }

const checks = [
  ["หน้าเว็บมีชื่อร้าน กินดี", html => html.includes("<h1>กินดี</h1>")],
  ["มีปุ่มจ่ายเงิน (pay-button)", html => html.includes('id="pay-button"')],
  ["โหลดเมนูได้ (menu.js)", html => html.includes('src="menu.js"')]
];

async function fetchLatest() {
  // GitHub Pages อาจใช้เวลาสักพักกว่าเวอร์ชันใหม่จะขึ้น จึงลองซ้ำได้สูงสุด 3 นาที
  for (let i = 1; i <= 18; i++) {
    const res = await fetch(url + "?t=" + Date.now(), { cache: "no-store" });
    const html = await res.text();
    if (res.ok && (!expectedVersion || html.includes(expectedVersion))) return html;
    console.log(`รอเวอร์ชันใหม่ขึ้นเว็บ... (ครั้งที่ ${i}, HTTP ${res.status})`);
    await new Promise(r => setTimeout(r, 10000));
  }
  throw new Error("เวอร์ชันใหม่ไม่ขึ้นเว็บภายใน 3 นาที");
}

(async () => {
  let failed = 0;
  try {
    const html = await fetchLatest();
    for (const [name, check] of checks) {
      if (check(html)) console.log("ผ่าน    " + name);
      else { console.log("ไม่ผ่าน " + name); failed++; }
    }
  } catch (e) {
    console.log("ไม่ผ่าน " + e.message); failed++;
  }
  if (failed) {
    console.log(`\nSmoke Test ไม่ผ่าน ${failed} ข้อ: เว็บที่ขึ้นไปแล้วมีปัญหา ให้ Rollback`);
    process.exit(1);
  }
  console.log("\nSmoke Test ผ่านทุกข้อ");
})();
