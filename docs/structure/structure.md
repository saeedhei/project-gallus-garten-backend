src/
├── config/
│   └── couchdb.ts               # تنظیمات اتصال به CouchDB
├── core/
│   └── app.ts                   # ایجاد و تنظیم اپلیکیشن Express
│   └── server.ts                # راه‌اندازی سرور
├── modules/
│   └── user/
│       ├── user.controller.ts   # کنترلرها
│       ├── user.routes.ts       # روت‌های REST API
│       ├── user.service.ts      # منطق تجاری (Business Logic)
│       ├── user.model.ts        # مدل CouchDB (با nano یا pouchdb)
│       ├── user.middleware.ts   # Middleware مخصوص یوزر (مثل auth)
│       └── user.types.ts        # تعریف TypeScript types و interfaces
├── utils/
│   └── jwt.ts                   # توابع کمکی JWT
│   └── logger.ts                # لاگر ساده یا پیشرفته
├── middleware/
│   └── errorHandler.ts          # مدیریت خطاهای سراسری
│   └── notFound.ts              # هندل کردن مسیرهای نامعتبر
└── index.ts                     # نقطه ورود پروژه (start app)

