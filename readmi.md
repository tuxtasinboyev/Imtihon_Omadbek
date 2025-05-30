🧪 Imtihon Loyihasi API Qo'llanmasi

Ushbu hujjat "Tuxtasinboyev Omadbek" tomonidan yaratilgan backend tizim uchun API qo‘llanmadir. API test qilish uchun Postman ishlatilgan va quyidagi yo‘riqnomalar yordamida tizim bilan ishlashingiz mumkin.

🌐 Asosiy URL:

https://imtihon-omadbek.onrender.com/api

⚠️ Ba'zi endpointlar Bearer Token bilan autentifikatsiya talab qiladi.

🔐 1. Auth (Ro‘yxatdan o‘tish / Kirish)

✅ POST /register

{
  "username": "abbosbek",
  "password": "123456789",
  "repeat_password": "123456789",
  "birth_date": "17-09-2008",
  "gender": "erkak",
  "branch_id": 1
}

✅ POST /login

{
  "username": "Omadbek@gmail.com",
  "password": "OMADBEK007"
}

🧠 Login muvaffaqiyatli bo‘lsa, token qaytariladi. Uni barcha keyingi so‘rovlar uchun headerga qo‘shing:

Authorization: Bearer <token>

👤 2. Admin bilan ishlash

➕ POST /post/admin

Admin yaratish:

{
  "username": "admin@gmail.com",
  "password": "Admin123",
  "repeat_password": "Admin123",
  "birth_date": "01-09-2000",
  "gender": "male",
  "role": "admin",
  "branch_id": 1
}

📥 GET /get/role/admin

Ro‘li admin bo‘lgan barcha foydalanuvchilarni olish

🧾 GET /get/info/admin

Admin ma'lumotlarini olish (body orqali username beriladi)

❌ DELETE /delete/admin/:id

Adminni o‘chirish

🔐 3. Admin huquqlari (Permission)

➕ POST /post/admin/permission

Adminga huquq biriktirish

{
  "user_id": 1,
  "can_create": true,
  "can_read": true,
  "can_delete": true,
  "can_update": true,
  "can_add_permission": true,
  "can_add_admin": true,
  "can_control_branch": true
}

🖊 PUT /put/admin/permission/:id

Huquqlarni yangilash

❌ DELETE /admin/permission/:id

Huquqlarni o‘chirish

👥 4. Foydalanuvchilar bilan ishlash

➕ POST /post/user

{
  "username": "user@gmail.com",
  "password": "12345678",
  "repeat_password": "12345678",
  "birth_date": "01-09-2007",
  "gender": "male",
  "branch_id": 1
}

🧾 GET /get/all/info/:id

ID bo‘yicha foydalanuvchini olish

🖊 PUT /put/user/:id

Yangilash

❌ DELETE /delete/user/:id

O‘chirish

🏢 5. Filiallar (Branch)

➕ POST /post/branch

{
  "name": "Qoraqalpoq Filiali",
  "location": "Qoraqalpog'iston"
}

🔁 PUT /put/branch/:id

Yangilash

❌ DELETE /delete/branch/:id

O‘chirish

📋 GET /get/all/branch

Barcha filiallarni olish

🚛 6. Transport

➕ POST /post/transport

Form-data:

model: "traktor"

color: "qora"

price: 5000

branch_id: 2

img: (file)

📋 GET /get/transport/branch/:id

Filialdagi transportlar

📋 GET /get/transport/model/:model

Model bo‘yicha izlash

🖊 PUT /put/transport/:id

Form-data bilan yangilash

❌ DELETE /delete/transport/:id

Transportni o‘chirish

🎯 7. Huquqlar (Permissions)

📋 GET /get/all/permission

Barcha permissionlarni olish

📋 GET /one/permission/:id

Bitta permissionni olish

🖊 PUT /update/permission/:id

Yangilash

❌ DELETE /delete/permision/:id

O‘chirish

📌 Eslatma:

Token talab qilinadigan endpointlar uchun Authorization: Bearer <token> headerni unutmang.

branch_id, user_id kabi maydonlar mavjud ID'lar bilan ishlashi kerak.

👨‍💻 Muallif: Tuxtasinboyev Omadbek

Postman link: imtihon collection
