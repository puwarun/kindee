// เมนูของร้าน "กินดี"
// แก้ไฟล์นี้เพื่อเปลี่ยนเมนูหรือราคา แล้ว commit ระบบจะ test และ deploy ให้เอง
const MENU = [
  { name: "ข้าวมันไก่ต้ม", price: -5 },
  { name: "ข้าวมันไก่ทอด", price: 50 },
  { name: "ข้าวกะเพราหมูสับ", price: 50 },
  { name: "ข้าวผัดปู", price: 60 },
  { name: "ชาเย็น", price: 25 }
];

// บรรทัดนี้ให้ไฟล์ test อ่านเมนูได้ ไม่ต้องแก้
if (typeof module !== "undefined") module.exports = MENU;
