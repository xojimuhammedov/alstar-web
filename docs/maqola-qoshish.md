# Yangi maqola qanday qo'shiladi

Saytdagi maqolalar `src/content/articles.ts` faylida saqlanadi. Har bir maqola saytni build qilish
paytida alohida sahifaga aylanadi: `/maqolalar/<url>/`.

## Otabek nima yuborishi kerak

Bitta maqola uchun quyidagilar kerak (25-noyabrdagi "Zamonaviy arxitekturada ACP" maqolasi aynan shu
shaklda yuborilgan edi):

| Maydon | Misol |
|---|---|
| Sarlavha | Zamonaviy arxitekturada ACP panellarning o'rni |
| Bo'lim (kategoriya) | Arxitektura va dizayn |
| Kartochka tavsifi (1–2 gap) | Zamonaviy binolar arxitekturasida ACP panellarning imkoniyatlari… |
| SEO sarlavha | Zamonaviy arxitekturada ACP panellar \| ALSTAR |
| Meta-tavsif (≈150 belgi) | ACP panellarning zamonaviy arxitekturadagi o'rni… |
| URL | /maqolalar/zamonaviy-arxitekturada-acp |
| Rasm | 1280×720 yoki kattaroq, gorizontal |
| Matn | quyidagi qoidalar bo'yicha |

Matn qoidalari:

- Xatboshilar orasida bitta bo'sh qator.
- Kichik sarlavha `## ` bilan boshlanadi: `## Minimalistik arxitektura`
- Ro'yxat qatorlari `- ` bilan boshlanadi, har biri yangi qatorda.
- Qalin so'z: `**Yengil konstruksiya.**`

## Dasturchi uchun

1. Rasmni `assets-src/article-<nom>.png` ga qo'ying va `npm run images` ni ishga tushiring.
2. `src/content/articles.ts` dagi `articles` ro'yxatiga yangi obyekt qo'shing (`slug` = URL ning oxirgi qismi,
   `image: 'article-<nom>'`, `date: 'YYYY-MM-DD'`). Ro'yxatdagi birinchi maqola "Maqolalar" sahifasida
   katta kartochka bo'lib chiqadi.
3. Bosh sahifadagi "Yangiliklar va maqolalar" blokida ko'rsatish kerak bo'lsa, `src/i18n/*.ts` dagi
   `news.items` ni yangilang.
4. `npm run build` — sahifa, sitemap va SEO teglar avtomatik yaratiladi.

> Keyingi bosqich: maqolalarni Otabekning o'zi qo'shishi uchun alstar-backend admin panelidagi
> `news` bo'limini saytga ulash mumkin (hozir sayt maqolalarni statik fayldan oladi).
