// Test ที่รันก่อน deploy ทุกครั้ง ถ้าข้อใดไม่ผ่าน ระบบจะไม่ deploy (quality gate)
const test = require("node:test");
const assert = require("node:assert");
const MENU = require("../menu.js");

test("ต้องมีเมนูอย่างน้อย 1 รายการ", () => {
  assert.ok(MENU.length >= 1);
});

test("ทุกเมนูต้องมีชื่อ", () => {
  for (const item of MENU) {
    assert.ok(item.name && item.name.trim() !== "", "มีเมนูที่ไม่มีชื่อ");
  }
});

test("ราคาทุกเมนูต้องมากกว่า 0", () => {
  for (const item of MENU) {
    assert.ok(item.price > 0, `${item.name} ราคา ${item.price} ไม่ถูกต้อง`);
  }
});

// ภารกิจ 3: เขียน test ของตัวเองต่อจากบรรทัดนี้
// ตัวอย่าง: ราคาต้องไม่เกิน 200 บาท
// test("ราคาต้องไม่เกิน 200 บาท", () => {
//   for (const item of MENU) {
//     assert.ok(item.price <= 200, `${item.name} แพงเกินไป`);
//   }
// });
