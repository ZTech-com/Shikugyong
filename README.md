# Shikugyong — koreys restorani sayti

Samarqanddagi **Shikugyong** koreys restorani uchun bir sahifali (single-page) veb-sayt.
O'zbek tilida, to'liq responsive — telefon, planshet va kompyuterda bir xil yaxshi ko'rinadi.

## Loyiha tuzilishi

```
index.html            — saytning o'zi (CSS va JS inline)
images/               — rasmlar (taom fotolari, logotip, banner)
server.js             — lokal ko'rish uchun oddiy statik server (port 8123)
vercel.json           — Vercel deploy sozlamalari
robots.txt            — qidiruv tizimlari uchun
generate-images.js    — (ixtiyoriy) rasmlar generatori, ishlatish shart emas
```

## Lokal ishga tushirish

```bash
node server.js
# brauzerda: http://localhost:8123
```

(Eskirgan `generate-images.js` uchun `npm install` kerak — sayt haqiqiy fotolar bilan ishlaydi, bu skript shart emas.)

## Barcha ma'lumotlar qayerda?

Saytdagi barcha ma'lumotlar `index.html` ichidagi **`CONFIG`** obyektida:

| Nima | Qayerda |
|---|---|
| Telefon, manzil, ish vaqti | `CONFIG.phone`, `CONFIG.address`, `CONFIG.hours` |
| Reyting va sharhlar soni | `CONFIG.rating`, `CONFIG.reviewsCount` |
| Menyu (nom, narx, rasm, tavsif) | `CONFIG.menuFallback` |
| Sharhlar | `CONFIG.reviews` |
| Telegram havolasi | `CONFIG.telegram` |

### Yangi taom qo'shish / o'zgartirish

`CONFIG.menuFallback` ga qator qo'shing:

```js
{ name: "Taom nomi", price: "100 000 so'm", category: "Noodles", img: "/images/taom.jpg", desc: "Qisqa tavsif" }
```

- **`img`** — foto bor bo'lsa ko'rsatiladi (faylni `images/` ga qo'ying).
- **`img` bo'lmasa** — taom uchun chiroyli placeholder kartochka ko'rsatiladi.
- **`price2` / `unit` / `unit2`** — ikkita narx (masalan, 1 kg va 0.5 kg) uchun.

### Yangi taom fotosini qo'shish

1. Fotonni `images/` papkasiga qo'ying (nomida bo'sh joy bo'lishi mumkin — sayt o'zi hal qiladi).
2. Menyudagi taomga `img: "/images/fayl nomi.jpg"` deb yozing.

## Vercel'ga deploy (bepul)

1. Loyihani GitHub'ga yuklang (repo yarating → `git push`).
2. [vercel.com](https://vercel.com) ga kiring → **Add New Project** → GitHub reponi tanlang.
3. **Framework Preset**: "Other" (yoki "Static HTML") — boshqa hech narsa o'zgartirmang → **Deploy**.
4. Bir daqiqada tayyor: `https://loyiha-nomi.vercel.app` URL beriladi.

### Domen ulash

1. Vercel loyihasi → **Settings → Domains** → domeningizni kiriting (masalan `shikugyong.uz`).
2. Domen sotib olgan joyingizda (UZ.uz, reg.ru, Namecheap va h.k.) DNS sozlamalarida Vercel ko'rsatgan
   **A-record / CNAME** qiymatlarini qo'shing.
3. Bir necha daqiqada domen ishlay boshlaydi (Vercel SSL sertifikatini avtomatik qo'yadi — https).

### Deploydan so'ng

- `index.html` dagi `og:image` havolasini mutlaq URL'ga almashtiring:
  `https://sizningdomen.uz/images/Hero-CTA.png`
- Ish vaqtini, telefonni tekshiring: `CONFIG` → `hours`, `phone`.
- Xohlasangiz `CONFIG.instagram` ga Instagram havolangizni qo'shing — tugma avtomatik chiqadi.

## Tekshirish

```bash
npm test   # server.js va generate-images.js sintaksisini tekshiradi
```

## Xavfsizlik

Sayt quyidagi xavfsizlik choralari bilan himoyalangan:

- **Content-Security-Policy (CSP)** — `vercel.json` va `server.js` da sozlangan
  (tashqi skriptlarni bloklaydi, Google Fonts va xarita iframe'iga ruxsat beradi).
- **HSTS** — `Strict-Transport-Security` headeri, HTTPS majburiy (Vercel).
- **X-Frame-Options / X-Content-Type-Options / Referrer-Policy / Permissions-Policy** headerlari.
- **Path traversal himoyasi** — `server.js` faqat loyiha papkasidagi fayllarni
  ko'rsatadi, noto'g'ri URL'lar (masalan `%zz`) serverni qulatmaydi.
- **Maxfiy kalitlar** — `.env` fayllari `.gitignore` da, repo'ga tushmaydi.

Saytda foydalanuvchi kiritadigan ma'lumot yo'q (barcha ma'lumotlar `CONFIG` da
statik), shuning uchun XSS xavfi minimal. Yangi tashqi resurs (skript, font,
iframe) qo'shsangiz — CSP'ni ham yangilang, aks holda u bloklanadi.
