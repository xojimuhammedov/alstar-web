# ALSTAR — veb-sayt (React + Vite, SSG)

Alyuminiy kompozit panellar ishlab chiqaruvchisi ALSTAR uchun landing sahifa.
Dizayn `ALSTAR_PREMIUM_V2/index.html` asosida React komponentlarga ko‘chirilgan.

**Stek:** React 19 · TypeScript · Vite 8 · Radix UI (Dialog: mobil menyu) · lucide-react · Inter Variable (self-hosted) · sharp (rasm optimizatsiyasi)

## Buyruqlar

```bash
npm install
npm run dev        # http://localhost:5173  (/, /ru/, /en/)
npm run build      # dist/ — tayyor statik sayt
npm run preview    # build natijasini ko‘rish
npm run images     # assets-src/ dagi rasmlardan WebP o‘lchamlarini qayta yaratish
```

Production domeni: `.env` faylida `VITE_SITE_URL=https://alstar.uz` (`.env.example` ga qarang).

## Nega SSG (pre-render)?

Oddiy React SPA bo‘sh `<div id="root">` qaytaradi, va Google, Yandex, ChatGPT, Perplexity
uni to‘liq o‘qiy olmaydi. `npm run build` har bir til uchun **tayyor HTML** yaratadi
(`dist/index.html`, `dist/ru/index.html`, `dist/en/index.html`). Unda butun kontent,
meta teglar va JSON-LD bor, keyin React uni "hydrate" qiladi (animatsiyalar, menyu).

## Tuzilma

```
src/
  config/site.ts        ← kompaniya ma’lumotlari (manzil, telefon, statistika) — BIR JOYDA
  config/images.ts      ← responsive rasm helper (srcset, width/height)
  i18n/{uz,ru,en}.ts    ← barcha matnlar (uz — asosiy, "/" da)
  seo/head.ts           ← title, description, canonical, hreflang, OG, Twitter, geo
  seo/schema.ts         ← JSON-LD: Organization, WebSite, WebPage, Product list, FAQPage
  sections/             ← Hero, Why, Products, Colours, Projects, News, Technical, Faq, Cta
  components/           ← Header (+ mobil menyu), Footer, LanguageSwitcher, ui
  hooks/                ← reveal animatsiya, scroll effektlar, count-up
scripts/
  prerender.mjs         ← HTML + sitemap.xml + robots.txt + llms.txt yaratadi
  optimize-images.mjs   ← assets-src → public/images (WebP), og-image.jpg, ikonkalar
```

## SEO / GEO — nima qilingan

| | |
|---|---|
| Statik HTML | Har bir til alohida URL: `/` (uz), `/ru/`, `/en/` |
| Meta | title, description, keywords, robots, canonical, author |
| Ko‘p tillilik | `hreflang` uz/ru/en + `x-default`, `og:locale` + alternate, `<html lang>` |
| Ijtimoiy tarmoqlar | Open Graph + Twitter Card, 1200×630 `og-image.jpg` (Telegram preview) |
| Structured data | JSON-LD `@graph`: Organization (+LocalBusiness, manzil kiritilganda), WebSite, WebPage, ItemList/Product, FAQPage |
| Local SEO (geo) | `geo.region`, `geo.placename`, `geo.position`/`ICBM` (koordinata kiritilganda), NAP footer va CTA’da |
| GEO (AI qidiruv) | `llms.txt`, robots.txt’da GPTBot / ClaudeBot / PerplexityBot / Google-Extended ruxsat, ko‘rinadigan FAQ bo‘limi |
| Sitemap | `sitemap.xml` hreflang alternativlari va rasm bilan |
| Semantika | bitta `h1` (kalit so‘z bilan), har bo‘limda `h2`, `aria-labelledby`, `dl` statistikalar, `address`, skip-link |
| Tezlik | 14 MB → 1.3 MB rasmlar (WebP, srcset), hero `fetchpriority=high` + preload, lazy-loading, self-hosted shrift |
| Kalit so‘zlar | "alyukobond / алюкобонд", "alyuminiy kompozit panel", "fasad panellari", A2/B1 |

## ⚠️ Ishga tushirishdan oldin to‘ldirish kerak (`src/config/site.ts`)

- [ ] `address` — rasmiy manzil (ko‘cha, shahar, indeks) → LocalBusiness schema va geo teglar avtomatik qo‘shiladi
- [ ] `geo` — xaritadagi koordinatalar `{ lat, lng }`
- [ ] `geoRegion` — masalan `UZ-TO` (Toshkent viloyati) yoki `UZ-TK` (Toshkent sh.)
- [ ] `legalName` — rasmiy nomi (MChJ / ООО)
- [ ] `sameAs` — Instagram, Telegram, Facebook, LinkedIn, YouTube havolalari
- [ ] Statistikani tekshirish: dizaynda "40+ yil tajriba" va "2013-yildan beri" bir-biriga zid
- [ ] Google Search Console va Yandex Webmaster’ga saytni qo‘shib, `sitemap.xml` yuborish
- [ ] Google Business Profile (Google Maps) ochish — local SEO uchun eng muhim qadam

## Deploy

`dist/` — oddiy statik papka (Nginx, Vercel, Netlify, Cloudflare Pages). Nginx misoli:

```nginx
location / {
  try_files $uri $uri/index.html =404;
}
location /images/ { expires 1y; add_header Cache-Control "public, immutable"; }
location /assets/ { expires 1y; add_header Cache-Control "public, immutable"; }
```

## Keyingi qadamlar (tavsiya)

- Mahsulot sahifalari (`/products/a2/`), maqola sahifalari (`/news/...`) — har biri alohida URL bilan SEO trafik oshadi
- Haqiqiy loyiha fotosuratlari (hozir "konseptual vizual")
- Narx so‘rash formasi (hozircha mailto havolalar)
