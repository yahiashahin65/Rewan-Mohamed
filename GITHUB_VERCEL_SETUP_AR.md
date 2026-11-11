# نشر بورتفليو روان محمد على GitHub و Vercel

الموقع النهائي: https://rewan-mohamed.vercel.app/

## 1) إنشاء المستودع

- من GitHub اختر **New repository**.
- الاسم المقترح: `rewan-mohamed-portfolio`.
- اختر **Private** أو **Public** حسب رغبتك.
- عند إنشاء المستودع اترك خيارات README و.gitignore الافتراضية غير مفعلة لأن المشروع يحتوي عليها بالفعل.
- بعد فك ضغط `Rewan_Mohamed_GitHub_Ready.zip` ارفع **جميع الملفات والمجلدات من داخل الأرشيف** إلى جذر المستودع (لا ترفع ملف ZIP نفسه).

إذا كنت تستخدم Git على جهاز الكمبيوتر، بعد إنشاء المستودع الفارغ:

```bash
git init
git add .
git commit -m "Launch Rewan Mohamed bilingual portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rewan-mohamed-portfolio.git
git push -u origin main
```

استبدل `YOUR-USERNAME` باسم حساب GitHub الخاص بك. لا تضف مفاتيح API أو ملفات `.env` الحقيقية للمستودع.

## 2) ربط Vercel

1. افتح **Vercel → Add New → Project**.
2. اختر **Import Git Repository** وحدد مستودع GitHub الجديد.
3. `Root Directory`: `./`
4. `Framework Preset`: `Other`.
5. `Build Command`: `npm run build`.
6. `Output Directory`: `dist`.
7. متغير `SITE_URL` **غير إلزامي**؛ القيمة الافتراضية مضبوطة على `https://rewan-mohamed.vercel.app`.
8. اضغط **Deploy**.
9. افتح **Project Settings → Domains** وتأكد أن الدومين `rewan-mohamed.vercel.app` مربوط **بنفس المشروع**، ولا يوجد تضارب مع مشروع آخر.

## 3) التأكد من عمل الصفحات

بعد اكتمال النشر افتح:

- https://rewan-mohamed.vercel.app/
- https://rewan-mohamed.vercel.app/en/
- https://rewan-mohamed.vercel.app/sitemap.xml
- https://rewan-mohamed.vercel.app/robots.txt
- https://rewan-mohamed.vercel.app/services/speech-therapy/
- https://rewan-mohamed.vercel.app/en/services/behavior-modification/

## 4) Google Search Console

- أضف الموقع كخاصية **URL-prefix**: `https://rewan-mohamed.vercel.app/`.
- اختر طريقة التحقق الملائمة (مثل HTML tag) وضع قيمة التحقق في المشروع إذا احتجتها، ثم أعد النشر.
- من **Sitemaps** أرسل: `https://rewan-mohamed.vercel.app/sitemap.xml`.
- من **URL Inspection** اختبر الصفحة الرئيسية وصفحات الخدمات واطلب فهرستها.

> التنبيه: الفهرسة وترتيب البحث يعتمدان على Google والمنافسة. إعدادات SEO لا تضمن الظهور في مقدمة النتائج عند كتابة أي تخصص.

## 5) تعديل المحتوى مستقبلًا

- بيانات التواصل والخدمات: `src/content.js`.
- الصفحات المتخصصة: `scripts/generate-seo.mjs`.
- تصميم الموقع: `src/styles.css`.
- صورة البروفايل: `public/assets/portrait.webp`.
- معرض الشهادات: `public/assets/certs/`.
- سلوك النماذج: `public/site.js`.

لتجربة كود الإنتاج:

```bash
npm run build
npm run check
npm run preview
```

> الأرشيف لا يحتوي على ملفات السيرة والشهادات الأصلية الخام، بل المواد المنقحة للعرض العام. احصل على موافقة صاحبة البيانات قبل النشر العام.
