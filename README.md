# กินดี · Workshop Deploy จริง

เว็บสั่งอาหารตัวอย่าง สำหรับฝึก **Test → Deploy → Smoke Test → Rollback** ด้วย GitHub Actions และ GitHub Pages
ทำผ่านเว็บ GitHub ได้ทั้งหมด ไม่ต้องติดตั้งโปรแกรม

## ไฟล์ในโปรเจกต์

| ไฟล์ | คืออะไร |
|---|---|
| `index.html` | หน้าเว็บร้าน |
| `menu.js` | รายการเมนูและราคา |
| `tests/menu.test.js` | Test ที่รันก่อน deploy (quality gate) |
| `tests/smoke.js` | Smoke Test ที่รันหลัง deploy บนเว็บจริง |
| `.github/workflows/deploy.yml` | Pipeline: Test → Deploy → Smoke |

## เริ่มต้น (ทำครั้งเดียว)

1. กดปุ่ม **Use this template → Create a new repository** ตั้งชื่อ `kindee` เลือก **Public**
2. ไปที่ **Settings → Pages** ตรง Source เลือก **GitHub Actions**
3. ไปที่แท็บ **Actions** เลือก **Test, Deploy, Smoke** แล้วกด **Run workflow**
4. รอจนขึ้นสีเขียวครบ 3 ขั้น แล้วเปิดเว็บที่ `https://<ชื่อบัญชี>.github.io/kindee/`

## ภารกิจ

1. **Deploy ครั้งแรก:** แก้ข้อความใน `index.html` บรรทัด `id="welcome"` เป็นชื่อตัวเอง แล้ว Commit
2. **Quality gate:** แก้ราคาใน `menu.js` ให้ติดลบ แล้ว Commit ดูว่า pipeline หยุดที่ขั้นไหน เว็บเปลี่ยนไหม จากนั้นแก้กลับ
3. **เขียน test เอง:** เพิ่ม test ใน `tests/menu.test.js` เช่น ราคาต้องไม่เกิน 200 บาท
4. **Smoke Test จับของพัง:** ลบบรรทัดปุ่ม `pay-button` ใน `index.html` แล้ว Commit ดูว่าขั้นไหนผ่าน ขั้นไหนไม่ผ่าน
5. **Rollback:** ไปที่แท็บ Actions เปิดรอบล่าสุดที่ **เขียวครบ** แล้วกด **Re-run all jobs** เพื่อเอาเวอร์ชันเดิมกลับขึ้นเว็บ จับเวลาว่าใช้กี่นาที
