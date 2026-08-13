# Shikugyong — images papkasi

Bu papkada **haqiqiy restoran fotosuratlari** saqlanadi. Sayt ularni `CONFIG.menuFallback`
yordamida menyuga ulaydi (fayl nomi taom nomiga mos keladi).

## Noodles — fotolari bor

| Fayl | Taom |
|---|---|
| `Naengmyeon.jpg` | Naengmyeon |
| `Bibim-Naengmyeon.jpg` | Bibim Naengmyeon |
| `Sogogi-Jjamppong.jpg` | Sogogi Jjamppong |
| `Jjamppong.jpg` | Jjamppong |
| `Jjajangmyeon.jpg` | Jjajangmyeon |
| `Japchae.jpg` | Japchae |
| `Yukgae-Japchae.jpg` | Yukgae Japchae |
| `Ramyeon.jpg` | Ramyeon |
| `Mild-Ramyeon.jpg` | Mild Ramyeon |
| `Cheese-Ramyeon.jpg` | Cheese Ramyeon |

## Boshqa fayllar

| Fayl | Nima |
|---|---|
| `Hero-CTA.png` | Hero bo'limi foni va ramkasi (katta banner) |
| `logo.jpg` | Logotip (navbar, footer, favicon) |

## Fotosurati yo'q taomlar

Rice Bowl, Chicken va Hotpot / Jeongol taomlariga hali foto yo'q — sayt ular uchun avtomatik
chiroyli placeholder kartochka ko'rsatadi. Foto qo'shmoqchi bo'lsangiz:

1. Fotonni shu papkaga qo'ying (masalan `Bibimbap.jpg`).
2. `index.html` → `CONFIG.menuFallback` → o'sha taomga `img: "/images/Bibimbap.jpg"` qo'shing.

Fotodan so'ng sayt kartochkani avtomatik foto bilan ko'rsatadi. 🍜
