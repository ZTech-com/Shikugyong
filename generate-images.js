/* Shikugyong — image generator
   Hand-crafted SVG dish illustrations rasterized to JPG with sharp.
   Run: node generate-images.js */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "images");
fs.mkdirSync(OUT, { recursive: true });

/* ---------- procedural helpers ---------- */
function noodleStrands(cx, cy, rx, ry, count, color, w) {
  const paths = [];
  for (let i = 0; i < count; i++) {
    const y = cy - ry + (i * (ry * 2)) / (count - 1);
    const amp = rx * (0.12 + Math.random() * 0.18);
    const phase = Math.random() * Math.PI * 2;
    const swings = 2 + Math.floor(Math.random() * 3);
    let d = `M ${cx - rx} ${y.toFixed(1)}`;
    for (let s = 0; s < swings; s++) {
      const x1 = cx - rx + ((s + 1) * (rx * 2)) / (swings + 1);
      const x2 = cx - rx + ((s + 2) * (rx * 2)) / (swings + 1);
      const dir = s % 2 === 0 ? -1 : 1;
      d += ` C ${(x1 - rx * 0.18).toFixed(1)} ${(y + amp * dir).toFixed(1)}, ${(x1 + rx * 0.18).toFixed(1)} ${(y + amp * dir).toFixed(1)}, ${x1.toFixed(1)} ${y.toFixed(1)}`;
    }
    paths.push(`<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" opacity="${0.55 + Math.random() * 0.4}"/>`);
  }
  return paths.join("\n    ");
}
function steamPaths(cx, baseY) {
  const curves = [];
  for (let i = 0; i < 3; i++) {
    const x = cx + (i - 1) * 46;
    const h = 55 + i * 12;
    curves.push(`<path d="M ${x} ${baseY} C ${x - 22} ${baseY - h * 0.45}, ${x + 22} ${baseY - h * 0.6}, ${x + (i % 2 === 0 ? -10 : 10)} ${baseY - h}" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity="0.28"/>`);
  }
  return curves.join("\n    ");
}
function sesame(cx, cy, rx, ry, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * Math.min(rx, ry) * 0.9;
    s += `<ellipse cx="${(cx + Math.cos(a) * r).toFixed(1)}" cy="${(cy + Math.sin(a) * r).toFixed(1)}" rx="3" ry="1.8" fill="#fffdf5" opacity="0.9" transform="rotate(${Math.random() * 180} ${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)})"/>`;
  }
  return s;
}
function scallions(cx, cy, rx, ry, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * Math.min(rx, ry) * 0.85;
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    const rot = Math.random() * 360;
    s += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)})"><rect x="-9" y="-4" width="18" height="8" rx="4" fill="#3e7a2f"/><rect x="-9" y="-4" width="9" height="8" rx="4" fill="#5da545" opacity="0.9"/></g>`;
  }
  return s;
}

/* ---------- 1. MENU — NOODLES (900x600) ---------- */
const noodles = `
<svg width="900" height="600" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="#2a2e38"/><stop offset="1" stop-color="#12141a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.45" r="0.62">
      <stop offset="0" stop-color="#454b5c" stop-opacity="0.85"/><stop offset="1" stop-color="#1b1e25" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bowl" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f7f1e6"/><stop offset="1" stop-color="#cdc1a9"/>
    </linearGradient>
    <linearGradient id="broth" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#d96a33"/><stop offset="1" stop-color="#b23f1e"/>
    </linearGradient>
    <linearGradient id="wood" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#7a5330"/><stop offset="1" stop-color="#5c3c22"/>
    </linearGradient>
  </defs>
  <rect width="900" height="600" fill="url(#bg)"/>
  <circle cx="450" cy="300" r="300" fill="url(#glow)"/>
  <!-- bowl shadow -->
  <ellipse cx="452" cy="478" rx="285" ry="46" fill="#000" opacity="0.5" filter="blur(8px)"/>
  <!-- bowl body -->
  <ellipse cx="450" cy="340" rx="260" ry="170" fill="url(#bowl)"/>
  <ellipse cx="450" cy="340" rx="260" ry="170" fill="none" stroke="#b3a68c" stroke-width="6"/>
  <path d="M 190 340 A 260 170 0 0 1 710 340" fill="none" stroke="#ffffff" stroke-width="10" opacity="0.55"/>
  <!-- inner bowl -->
  <ellipse cx="450" cy="330" rx="236" ry="140" fill="#fdfaf2"/>
  <!-- broth -->
  <ellipse cx="450" cy="338" rx="216" ry="112" fill="url(#broth)"/>
  <ellipse cx="420" cy="300" rx="120" ry="40" fill="#ffd9a0" opacity="0.35"/>
  <!-- noodles -->
  ${noodleStrands(450, 340, 200, 92, 30, "#e8c47f", 8)}
  ${noodleStrands(450, 340, 190, 80, 16, "#d9a55c", 10)}
  <!-- half egg -->
  <g transform="translate(320 300) rotate(-12)">
    <ellipse rx="46" ry="34" fill="#f6f2e6"/><ellipse rx="46" ry="34" fill="none" stroke="#d8d2bf" stroke-width="3"/>
    <ellipse cy="-4" rx="30" ry="24" fill="#f2b632"/><ellipse cy="-4" rx="30" ry="24" fill="none" stroke="#d99a1f" stroke-width="3"/>
  </g>
  <!-- garnishes -->
  ${scallions(540, 320, 120, 60, 7)}
  <g transform="translate(560 350)"><ellipse rx="8" ry="8" fill="#c33d2a"/><ellipse rx="4" ry="4" fill="#e0664f"/></g>
  <g transform="translate(380 360)"><ellipse rx="7" ry="7" fill="#c33d2a"/></g>
  <!-- chopsticks -->
  <g>
    <rect x="640" y="150" width="14" height="330" rx="7" fill="url(#wood)" transform="rotate(28 647 315)"/>
    <rect x="672" y="180" width="14" height="330" rx="7" fill="url(#wood)" transform="rotate(28 679 345)"/>
    <rect x="640" y="150" width="14" height="140" rx="7" fill="#8f6540" transform="rotate(28 647 315)"/>
    <rect x="672" y="180" width="14" height="140" rx="7" fill="#8f6540" transform="rotate(28 679 345)"/>
  </g>
  <!-- steam -->
  ${steamPaths(430, 250)}
  <!-- korean flag accent -->
  <g transform="translate(112 96)">
    <circle r="54" fill="#f4f1e8"/><circle r="54" fill="none" stroke="#d9d2bf" stroke-width="4"/>
    <path d="M 0 -54 A 54 54 0 0 0 0 54 A 27 27 0 0 1 0 -54 Z" fill="#d4402f" opacity="0.92"/>
    <path d="M 0 -54 A 54 54 0 0 1 0 54 A 27 27 0 0 0 0 -54 Z" fill="#2d4f8f" opacity="0.92"/>
    <circle cx="0" cy="-16" r="6" fill="#d4402f" opacity="0.92"/><circle cx="0" cy="16" r="6" fill="#2d4f8f" opacity="0.92"/>
  </g>
  <circle cx="790" cy="96" r="14" fill="#d9a441" opacity="0.85"/>
  <circle cx="760" cy="86" r="7" fill="#d9a441" opacity="0.6"/>
  <circle cx="812" cy="124" r="7" fill="#d9a441" opacity="0.6"/>
</svg>`;

/* ---------- 2. MENU — RICE BOWL (900x600) ---------- */
const ricebowl = `
<svg width="900" height="600" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg2" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="#26303a"/><stop offset="1" stop-color="#101318"/>
    </linearGradient>
    <radialGradient id="glow2" cx="0.5" cy="0.45" r="0.62">
      <stop offset="0" stop-color="#3f4a56" stop-opacity="0.9"/><stop offset="1" stop-color="#1a1e24" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bowl2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f8f2e7"/><stop offset="1" stop-color="#cfc3ab"/>
    </linearGradient>
    <linearGradient id="wood2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#7a5330"/><stop offset="1" stop-color="#5c3c22"/>
    </linearGradient>
  </defs>
  <rect width="900" height="600" fill="url(#bg2)"/>
  <circle cx="450" cy="300" r="300" fill="url(#glow2)"/>
  <ellipse cx="452" cy="478" rx="285" ry="46" fill="#000" opacity="0.5" filter="blur(8px)"/>
  <ellipse cx="450" cy="340" rx="260" ry="170" fill="url(#bowl2)"/>
  <ellipse cx="450" cy="340" rx="260" ry="170" fill="none" stroke="#b3a68c" stroke-width="6"/>
  <path d="M 190 340 A 260 170 0 0 1 710 340" fill="none" stroke="#ffffff" stroke-width="10" opacity="0.55"/>
  <ellipse cx="450" cy="330" rx="236" ry="140" fill="#fdfaf2"/>
  <!-- rice mound -->
  <ellipse cx="450" cy="330" rx="205" ry="105" fill="#fffdf6"/>
  <ellipse cx="450" cy="330" rx="205" ry="105" fill="none" stroke="#e8e2cf" stroke-width="4"/>
  <ellipse cx="410" cy="300" rx="90" ry="36" fill="#ffffff" opacity="0.5"/>
  <!-- egg yolk -->
  <ellipse cx="450" cy="318" rx="44" ry="38" fill="#f5b224"/>
  <ellipse cx="450" cy="318" rx="44" ry="38" fill="none" stroke="#d19416" stroke-width="4"/>
  <ellipse cx="438" cy="308" rx="16" ry="12" fill="#ffd36b" opacity="0.8"/>
  <!-- carrot -->
  <g transform="translate(380 330) rotate(-30)">
    <rect x="-10" y="-70" width="20" height="140" rx="8" fill="#e2723f"/><rect x="-10" y="-70" width="7" height="140" rx="4" fill="#f08c5a"/>
  </g>
  <g transform="translate(520 330) rotate(35)">
    <rect x="-10" y="-70" width="20" height="140" rx="8" fill="#e2723f"/><rect x="3" y="-70" width="7" height="140" rx="4" fill="#f08c5a"/>
  </g>
  <!-- spinach -->
  <g transform="translate(330 330) rotate(20)"><ellipse rx="60" ry="26" fill="#5c8f3a"/><ellipse rx="60" ry="26" fill="none" stroke="#49742d" stroke-width="4"/></g>
  <g transform="translate(570 330) rotate(-15)"><ellipse rx="60" ry="26" fill="#5c8f3a"/><ellipse rx="60" ry="26" fill="none" stroke="#49742d" stroke-width="4"/></g>
  <!-- gochujang dollop -->
  <path d="M 470 380 Q 500 358 520 372 Q 528 388 508 396 Q 486 402 470 380 Z" fill="#c1291c"/>
  <path d="M 478 376 Q 492 366 502 374" fill="none" stroke="#e04a3a" stroke-width="4" stroke-linecap="round"/>
  <!-- sesame -->
  ${sesame(450, 360, 150, 70, 26)}
  <!-- chopsticks -->
  <g>
    <rect x="640" y="150" width="14" height="330" rx="7" fill="url(#wood2)" transform="rotate(28 647 315)"/>
    <rect x="672" y="180" width="14" height="330" rx="7" fill="url(#wood2)" transform="rotate(28 679 345)"/>
    <rect x="640" y="150" width="14" height="140" rx="7" fill="#8f6540" transform="rotate(28 647 315)"/>
    <rect x="672" y="180" width="14" height="140" rx="7" fill="#8f6540" transform="rotate(28 679 345)"/>
  </g>
  ${steamPaths(430, 250)}
  <!-- accents -->
  <g transform="translate(112 96)">
    <circle r="54" fill="#f4f1e8"/><circle r="54" fill="none" stroke="#d9d2bf" stroke-width="4"/>
    <path d="M 0 -54 A 54 54 0 0 0 0 54 A 27 27 0 0 1 0 -54 Z" fill="#d4402f" opacity="0.92"/>
    <path d="M 0 -54 A 54 54 0 0 1 0 54 A 27 27 0 0 0 0 -54 Z" fill="#2d4f8f" opacity="0.92"/>
    <circle cx="0" cy="-16" r="6" fill="#d4402f" opacity="0.92"/><circle cx="0" cy="16" r="6" fill="#2d4f8f" opacity="0.92"/>
  </g>
  <circle cx="790" cy="96" r="14" fill="#d9a441" opacity="0.85"/>
  <circle cx="760" cy="86" r="7" fill="#d9a441" opacity="0.6"/>
  <circle cx="812" cy="124" r="7" fill="#d9a441" opacity="0.6"/>
</svg>`;

/* ---------- 3. MENU — CHICKEN (900x600) ---------- */
function drumstick(x, y, rot, scale) {
  const s = scale || 1;
  return `
  <g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <!-- bone -->
    <rect x="-10" y="-70" width="20" height="64" rx="9" fill="#f1e7d0"/>
    <rect x="-10" y="-70" width="20" height="64" rx="9" fill="none" stroke="#d8c9a8" stroke-width="3"/>
    <ellipse cx="0" cy="-72" rx="12" ry="7" fill="#e8dab8"/>
    <!-- meat -->
    <path d="M -34 40 Q -46 6 -16 -14 Q 6 -28 22 -16 Q 40 -4 36 22 Q 32 48 8 54 Q -16 58 -34 40 Z" fill="#d99a3e"/>
    <path d="M -34 40 Q -46 6 -16 -14 Q 6 -28 22 -16 Q 40 -4 36 22 Q 32 48 8 54 Q -16 58 -34 40 Z" fill="none" stroke="#b5711f" stroke-width="4"/>
    <!-- crispy texture -->
    <circle cx="-14" cy="6" r="5" fill="#c9812a" opacity="0.8"/>
    <circle cx="6" cy="18" r="4" fill="#c9812a" opacity="0.8"/>
    <circle cx="16" cy="0" r="4" fill="#c9812a" opacity="0.8"/>
    <circle cx="-24" cy="24" r="4" fill="#c9812a" opacity="0.7"/>
    <path d="M -20 14 Q -12 10 -8 16" fill="none" stroke="#f3c97f" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
    <!-- glaze -->
    <path d="M -26 30 Q -18 40 -6 38" fill="none" stroke="#7c3f12" stroke-width="6" stroke-linecap="round" opacity="0.6"/>
  </g>`;
}
const chicken = `
<svg width="900" height="600" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg3" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="#2c2620"/><stop offset="1" stop-color="#141210"/>
    </linearGradient>
    <radialGradient id="glow3" cx="0.5" cy="0.45" r="0.62">
      <stop offset="0" stop-color="#4a3d2c" stop-opacity="0.9"/><stop offset="1" stop-color="#1c1813" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f8f4ea"/><stop offset="1" stop-color="#dcd4c0"/>
    </linearGradient>
  </defs>
  <rect width="900" height="600" fill="url(#bg3)"/>
  <circle cx="450" cy="300" r="300" fill="url(#glow3)"/>
  <ellipse cx="452" cy="478" rx="300" ry="50" fill="#000" opacity="0.5" filter="blur(8px)"/>
  <!-- plate -->
  <ellipse cx="450" cy="360" rx="300" ry="150" fill="url(#plate)"/>
  <ellipse cx="450" cy="360" rx="300" ry="150" fill="none" stroke="#c6bda6" stroke-width="6"/>
  <ellipse cx="450" cy="356" rx="250" ry="116" fill="none" stroke="#e6dfcd" stroke-width="4"/>
  <!-- chicken pieces -->
  ${drumstick(350, 380, -38, 1.15)}
  ${drumstick(540, 360, 42, 1.2)}
  ${drumstick(455, 330, 4, 1.25)}
  <g transform="translate(360 300) rotate(-12) scale(0.95)">
    <path d="M -46 26 Q -58 -8 -30 -26 Q -2 -40 20 -28 Q 42 -14 38 16 Q 34 46 8 52 Q -18 54 -46 26 Z" fill="#e0a54c"/>
    <path d="M -46 26 Q -58 -8 -30 -26 Q -2 -40 20 -28 Q 42 -14 38 16 Q 34 46 8 52 Q -18 54 -46 26 Z" fill="none" stroke="#b5711f" stroke-width="4"/>
    <path d="M -22 0 Q -8 -10 6 -2" fill="none" stroke="#f3c97f" stroke-width="5" stroke-linecap="round" opacity="0.9"/>
  </g>
  <!-- sauce bowl -->
  <g transform="translate(660 440)">
    <ellipse rx="70" ry="44" fill="#4a2c17"/><ellipse rx="70" ry="44" fill="none" stroke="#33200f" stroke-width="5"/>
    <ellipse cy="-10" rx="56" ry="30" fill="#8f1f16"/><ellipse cy="-14" rx="40" ry="18" fill="#b5351f" opacity="0.85"/>
  </g>
  <!-- sesame on chicken -->
  ${sesame(450, 360, 140, 80, 20)}
  <!-- accents -->
  <g transform="translate(112 96)">
    <circle r="54" fill="#f4f1e8"/><circle r="54" fill="none" stroke="#d9d2bf" stroke-width="4"/>
    <path d="M 0 -54 A 54 54 0 0 0 0 54 A 27 27 0 0 1 0 -54 Z" fill="#d4402f" opacity="0.92"/>
    <path d="M 0 -54 A 54 54 0 0 1 0 54 A 27 27 0 0 0 0 -54 Z" fill="#2d4f8f" opacity="0.92"/>
    <circle cx="0" cy="-16" r="6" fill="#d4402f" opacity="0.92"/><circle cx="0" cy="16" r="6" fill="#2d4f8f" opacity="0.92"/>
  </g>
  <circle cx="790" cy="96" r="14" fill="#d9a441" opacity="0.85"/>
</svg>`;

/* ---------- 4. MENU — HOTPOT (900x600) ---------- */
const hotpot = `
<svg width="900" height="600" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg4" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="#2b1c20"/><stop offset="1" stop-color="#120e10"/>
    </linearGradient>
    <radialGradient id="glow4" cx="0.5" cy="0.45" r="0.62">
      <stop offset="0" stop-color="#4c2c33" stop-opacity="0.9"/><stop offset="1" stop-color="#1a1214" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="pot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a3f4a"/><stop offset="1" stop-color="#20242c"/>
    </linearGradient>
    <radialGradient id="broth4" cx="0.5" cy="0.4" r="0.7">
      <stop offset="0" stop-color="#d6442a"/><stop offset="0.7" stop-color="#a8241a"/><stop offset="1" stop-color="#7f1b14"/>
    </radialGradient>
    <linearGradient id="wood4" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#7a5330"/><stop offset="1" stop-color="#5c3c22"/>
    </linearGradient>
  </defs>
  <rect width="900" height="600" fill="url(#bg4)"/>
  <circle cx="450" cy="300" r="300" fill="url(#glow4)"/>
  <ellipse cx="452" cy="500" rx="320" ry="44" fill="#000" opacity="0.55" filter="blur(8px)"/>
  <!-- burner glow -->
  <ellipse cx="450" cy="462" rx="210" ry="30" fill="#ff6a2a" opacity="0.22" filter="blur(14px)"/>
  <!-- pot handles -->
  <path d="M 150 330 Q 118 330 118 366 Q 118 402 150 402" fill="none" stroke="#454b58" stroke-width="20" stroke-linecap="round"/>
  <path d="M 750 330 Q 782 330 782 366 Q 782 402 750 402" fill="none" stroke="#454b58" stroke-width="20" stroke-linecap="round"/>
  <!-- pot body -->
  <path d="M 180 240 L 720 240 Q 740 380 700 462 Q 450 500 200 462 Q 160 380 180 240 Z" fill="url(#pot)"/>
  <path d="M 180 240 L 720 240" stroke="#5a6170" stroke-width="10"/>
  <path d="M 180 240 Q 450 260 720 240" fill="none" stroke="#e8e4d8" stroke-width="7" opacity="0.8"/>
  <!-- broth -->
  <ellipse cx="450" cy="290" rx="262" ry="64" fill="url(#broth4)"/>
  <ellipse cx="400" cy="272" rx="130" ry="26" fill="#ffb27a" opacity="0.35"/>
  <!-- bubbles -->
  <circle cx="330" cy="280" r="10" fill="#ffd9b0" opacity="0.6"/><circle cx="360" cy="300" r="7" fill="#ffd9b0" opacity="0.5"/>
  <circle cx="520" cy="278" r="11" fill="#ffd9b0" opacity="0.6"/><circle cx="560" cy="296" r="7" fill="#ffd9b0" opacity="0.5"/>
  <circle cx="440" cy="266" r="8" fill="#ffd9b0" opacity="0.7"/>
  <!-- tofu -->
  <g transform="translate(360 268)"><rect x="-22" y="-14" width="44" height="28" rx="6" fill="#f2ecdc"/><rect x="-22" y="-14" width="44" height="28" rx="6" fill="none" stroke="#d8d0b8" stroke-width="3"/></g>
  <g transform="translate(540 286)"><rect x="-20" y="-13" width="40" height="26" rx="6" fill="#f2ecdc"/><rect x="-20" y="-13" width="40" height="26" rx="6" fill="none" stroke="#d8d0b8" stroke-width="3"/></g>
  <!-- mushrooms -->
  <g transform="translate(470 258)"><ellipse rx="16" ry="12" fill="#8a5a3a"/><rect x="-3" y="-2" width="6" height="14" rx="3" fill="#e8ddc8"/></g>
  <g transform="translate(300 296)"><ellipse rx="13" ry="10" fill="#8a5a3a"/><rect x="-2" y="-2" width="5" height="12" rx="3" fill="#e8ddc8"/></g>
  <!-- scallions -->
  ${scallions(450, 286, 200, 30, 10)}
  <!-- meat slices -->
  <g transform="translate(500 256) rotate(18)"><ellipse rx="34" ry="12" fill="#d94a3a" opacity="0.9"/><ellipse rx="30" ry="9" fill="#e97a63" opacity="0.9"/></g>
  <g transform="translate(420 300) rotate(-12)"><ellipse rx="30" ry="11" fill="#d94a3a" opacity="0.9"/><ellipse rx="26" ry="8" fill="#e97a63" opacity="0.9"/></g>
  <!-- steam -->
  ${steamPaths(430, 220)}
  <!-- chopsticks -->
  <g>
    <rect x="660" y="120" width="14" height="330" rx="7" fill="url(#wood4)" transform="rotate(30 667 285)"/>
    <rect x="694" y="150" width="14" height="330" rx="7" fill="url(#wood4)" transform="rotate(30 701 315)"/>
  </g>
  <!-- accents -->
  <g transform="translate(112 96)">
    <circle r="54" fill="#f4f1e8"/><circle r="54" fill="none" stroke="#d9d2bf" stroke-width="4"/>
    <path d="M 0 -54 A 54 54 0 0 0 0 54 A 27 27 0 0 1 0 -54 Z" fill="#d4402f" opacity="0.92"/>
    <path d="M 0 -54 A 54 54 0 0 1 0 54 A 27 27 0 0 0 0 -54 Z" fill="#2d4f8f" opacity="0.92"/>
    <circle cx="0" cy="-16" r="6" fill="#d4402f" opacity="0.92"/><circle cx="0" cy="16" r="6" fill="#2d4f8f" opacity="0.92"/>
  </g>
  <circle cx="790" cy="96" r="14" fill="#d9a441" opacity="0.85"/>
</svg>`;

/* ---------- 5. HERO — Korean restaurant at dusk (1024x1024) ---------- */
const hero = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0d1220"/><stop offset="0.55" stop-color="#23203f"/><stop offset="0.85" stop-color="#4a2a3d"/><stop offset="1" stop-color="#2b1c26"/>
    </linearGradient>
    <radialGradient id="warm" cx="0.5" cy="0.52" r="0.55">
      <stop offset="0" stop-color="#ffd9a0" stop-opacity="0.55"/><stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3c3330"/><stop offset="1" stop-color="#241e1c"/>
    </linearGradient>
    <linearGradient id="bld2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4a403a"/><stop offset="1" stop-color="#2c2522"/>
    </linearGradient>
    <linearGradient id="door" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7a3c2a"/><stop offset="1" stop-color="#4e2418"/>
    </linearGradient>
    <linearGradient id="table" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5c4326"/><stop offset="1" stop-color="#3a2a16"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#sky)"/>
  <!-- stars -->
  <circle cx="120" cy="110" r="3" fill="#fff" opacity="0.8"/><circle cx="300" cy="70" r="2.5" fill="#fff" opacity="0.7"/>
  <circle cx="520" cy="120" r="3" fill="#fff" opacity="0.8"/><circle cx="700" cy="80" r="2.5" fill="#fff" opacity="0.7"/>
  <circle cx="880" cy="140" r="3" fill="#fff" opacity="0.8"/><circle cx="950" cy="260" r="2" fill="#fff" opacity="0.6"/>
  <circle cx="180" cy="220" r="2" fill="#fff" opacity="0.6"/><circle cx="820" cy="60" r="2" fill="#fff" opacity="0.6"/>
  <!-- moon -->
  <circle cx="840" cy="170" r="46" fill="#f2ead2" opacity="0.9"/>
  <circle cx="858" cy="160" r="42" fill="#23203f" opacity="0.85"/>
  <!-- ground -->
  <rect y="800" width="1024" height="224" fill="#16121a"/>
  <rect y="800" width="1024" height="14" fill="#2a2330"/>
  <!-- warm glow from restaurant -->
  <circle cx="512" cy="560" r="420" fill="url(#warm)"/>
  <!-- building -->
  <rect x="230" y="380" width="564" height="430" rx="10" fill="url(#bld)"/>
  <rect x="230" y="380" width="564" height="18" fill="#6b5745"/>
  <!-- awning -->
  <path d="M 214 420 L 810 420 L 796 472 L 228 472 Z" fill="#7a1f18"/>
  <path d="M 250 420 L 256 472 M 320 420 L 326 472 M 390 420 L 396 472 M 460 420 L 466 472 M 530 420 L 536 472 M 600 420 L 606 472 M 670 420 L 676 472 M 740 420 L 746 472" stroke="#e8b25a" stroke-width="16"/>
  <!-- windows (warm light) -->
  <g>
    <rect x="272" y="500" width="150" height="120" rx="8" fill="#1a1418"/>
    <rect x="282" y="510" width="130" height="100" rx="4" fill="#ffd58a" opacity="0.95"/>
    <path d="M 347 510 L 347 610 M 282 560 L 412 560" stroke="#1a1418" stroke-width="8"/>
    <rect x="602" y="500" width="150" height="120" rx="8" fill="#1a1418"/>
    <rect x="612" y="510" width="130" height="100" rx="4" fill="#ffd58a" opacity="0.95"/>
    <path d="M 677 510 L 677 610 M 612 560 L 742 560" stroke="#1a1418" stroke-width="8"/>
  </g>
  <!-- signboard -->
  <rect x="330" y="640" width="364" height="96" rx="10" fill="#f4e7c8"/>
  <rect x="330" y="640" width="364" height="96" rx="10" fill="none" stroke="#c9a86a" stroke-width="6"/>
  <circle cx="392" cy="688" r="34" fill="#d4402f"/>
  <circle cx="392" cy="688" r="34" fill="none" stroke="#c9a86a" stroke-width="4"/>
  <path d="M 392 654 A 34 34 0 0 0 392 722 A 17 17 0 0 1 392 654 Z" fill="#f4e7c8"/>
  <path d="M 392 654 A 34 34 0 0 1 392 722 A 17 17 0 0 0 392 654 Z" fill="#2d4f8f"/>
  <path d="M 452 700 Q 470 680 492 700" fill="none" stroke="#d4402f" stroke-width="14" stroke-linecap="round"/>
  <path d="M 452 700 Q 470 718 492 700" fill="none" stroke="#d4402f" stroke-width="14" stroke-linecap="round"/>
  <circle cx="530" cy="700" r="16" fill="#d9a441"/>
  <!-- door -->
  <rect x="452" y="736" width="120" height="90" rx="6" fill="url(#door)"/>
  <rect x="452" y="736" width="120" height="90" rx="6" fill="none" stroke="#3a1d12" stroke-width="5"/>
  <circle cx="548" cy="782" r="6" fill="#e8c25a"/>
  <!-- lanterns -->
  <g>
    <line x1="512" y1="392" x2="512" y2="330" stroke="#4a3a2a" stroke-width="3"/>
    <ellipse cx="512" cy="308" rx="16" ry="22" fill="#d4402f"/><ellipse cx="512" cy="308" rx="16" ry="22" fill="none" stroke="#8f2419" stroke-width="4"/>
    <rect x="504" y="288" width="16" height="6" rx="3" fill="#8f2419"/>
    <rect x="504" y="332" width="16" height="6" rx="3" fill="#8f2419"/>
  </g>
  <g>
    <line x1="270" y1="412" x2="270" y2="360" stroke="#4a3a2a" stroke-width="3"/>
    <ellipse cx="270" cy="338" rx="13" ry="18" fill="#d4402f"/><ellipse cx="270" cy="338" rx="13" ry="18" fill="none" stroke="#8f2419" stroke-width="3"/>
  </g>
  <g>
    <line x1="754" y1="412" x2="754" y2="360" stroke="#4a3a2a" stroke-width="3"/>
    <ellipse cx="754" cy="338" rx="13" ry="18" fill="#d4402f"/><ellipse cx="754" cy="338" rx="13" ry="18" fill="none" stroke="#8f2419" stroke-width="3"/>
  </g>
  <!-- plants -->
  <g transform="translate(214 780)"><ellipse rx="26" ry="44" fill="#2c4a2a"/><ellipse rx="26" ry="44" fill="none" stroke="#1c3320" stroke-width="4"/><rect x="-8" y="30" width="16" height="60" rx="6" fill="#5c3c22"/></g>
  <g transform="translate(810 780)"><ellipse rx="26" ry="44" fill="#2c4a2a"/><ellipse rx="26" ry="44" fill="none" stroke="#1c3320" stroke-width="4"/><rect x="-8" y="30" width="16" height="60" rx="6" fill="#5c3c22"/></g>
  <!-- outdoor table with dishes -->
  <rect x="340" y="852" width="344" height="26" rx="13" fill="url(#table)"/>
  <rect x="360" y="878" width="22" height="70" fill="#2c2218"/>
  <rect x="642" y="878" width="22" height="70" fill="#2c2218"/>
  <ellipse cx="420" cy="840" rx="34" ry="16" fill="#d9a441"/>
  <ellipse cx="500" cy="840" rx="40" ry="19" fill="#f4e7c8"/>
  <ellipse cx="500" cy="838" rx="30" ry="13" fill="#d4402f"/>
  <ellipse cx="590" cy="840" rx="34" ry="16" fill="#f4e7c8"/>
  <ellipse cx="590" cy="838" rx="26" ry="11" fill="#c9a86a"/>
  <!-- steam from dishes -->
  <path d="M 500 812 C 490 800, 512 794, 500 782" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="0.35"/>
  <path d="M 590 812 C 580 802, 600 796, 590 786" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="0.3"/>
</svg>`;

/* ---------- 6. INTERIOR (1200x900) ---------- */
const interior = `
<svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8a6f52"/><stop offset="1" stop-color="#6e563d"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4a3520"/><stop offset="1" stop-color="#332411"/>
    </linearGradient>
    <radialGradient id="lamp" cx="0.5" cy="0.4" r="0.7">
      <stop offset="0" stop-color="#ffe3ae" stop-opacity="0.95"/><stop offset="1" stop-color="#ffc877" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7a5330"/><stop offset="1" stop-color="#523a20"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="#1a1418"/>
  <!-- wall -->
  <rect y="0" width="1200" height="560" fill="url(#wall)"/>
  <!-- wainscot -->
  <rect y="430" width="1200" height="130" fill="#5a452e"/>
  <rect y="430" width="1200" height="8" fill="#4a3824"/>
  <rect y="470" width="1200" height="4" fill="#4a3824"/><rect y="510" width="1200" height="4" fill="#4a3824"/>
  <!-- floor -->
  <rect y="560" width="1200" height="340" fill="url(#floor)"/>
  <line x1="0" y1="620" x2="1200" y2="620" stroke="#3a2a16" stroke-width="3"/>
  <line x1="0" y1="700" x2="1200" y2="700" stroke="#3a2a16" stroke-width="3"/>
  <line x1="0" y1="780" x2="1200" y2="780" stroke="#3a2a16" stroke-width="3"/>
  <line x1="0" y1="860" x2="1200" y2="860" stroke="#3a2a16" stroke-width="3"/>
  <!-- back wall shelf -->
  <rect x="880" y="60" width="260" height="380" rx="8" fill="#3c2c1c"/>
  <rect x="895" y="74" width="230" height="110" rx="6" fill="#241a10"/>
  <rect x="895" y="198" width="230" height="110" rx="6" fill="#241a10"/>
  <rect x="895" y="322" width="230" height="104" rx="6" fill="#241a10"/>
  <!-- bottles -->
  <g>
    <rect x="915" y="98" width="22" height="52" rx="6" fill="#c9a86a"/><rect x="921" y="86" width="10" height="16" rx="3" fill="#8f7448"/>
    <rect x="950" y="108" width="20" height="46" rx="6" fill="#8f2a1e"/><rect x="955" y="96" width="10" height="16" rx="3" fill="#6b1f16"/>
    <rect x="985" y="102" width="22" height="52" rx="6" fill="#2d4f8f"/><rect x="991" y="90" width="10" height="16" rx="3" fill="#1f3a6b"/>
    <rect x="1022" y="110" width="20" height="44" rx="6" fill="#4a7a3a"/><rect x="1027" y="98" width="10" height="16" rx="3" fill="#375c2a"/>
    <rect x="1060" y="100" width="22" height="54" rx="6" fill="#d9a441"/><rect x="1066" y="88" width="10" height="16" rx="3" fill="#a87a2a"/>
  </g>
  <!-- wall art -->
  <rect x="150" y="120" width="240" height="170" rx="8" fill="#f4e7c8"/>
  <rect x="150" y="120" width="240" height="170" rx="8" fill="none" stroke="#c9a86a" stroke-width="8"/>
  <circle cx="270" cy="205" r="52" fill="#d4402f"/>
  <circle cx="270" cy="205" r="52" fill="none" stroke="#c9a86a" stroke-width="5"/>
  <path d="M 270 153 A 52 52 0 0 0 270 257 A 26 26 0 0 1 270 153 Z" fill="#f4e7c8"/>
  <path d="M 270 153 A 52 52 0 0 1 270 257 A 26 26 0 0 0 270 153 Z" fill="#2d4f8f"/>
  <!-- window -->
  <rect x="560" y="90" width="240" height="230" rx="8" fill="#0d1220"/>
  <rect x="560" y="90" width="240" height="230" rx="8" fill="none" stroke="#523a20" stroke-width="10"/>
  <path d="M 680 90 L 680 320 M 560 205 L 800 205" stroke="#523a20" stroke-width="10"/>
  <rect x="570" y="100" width="100" height="95" fill="#2a3a5a" opacity="0.9"/>
  <rect x="690" y="100" width="100" height="95" fill="#2a3a5a" opacity="0.9"/>
  <rect x="570" y="215" width="100" height="95" fill="#2a3a5a" opacity="0.9"/>
  <rect x="690" y="215" width="100" height="95" fill="#2a3a5a" opacity="0.9"/>
  <!-- pendant lamps -->
  <g>
    <line x1="300" y1="0" x2="300" y2="70" stroke="#1a1418" stroke-width="6"/>
    <path d="M 268 70 L 332 70 L 318 96 L 282 96 Z" fill="#2c2218"/>
    <ellipse cx="300" cy="118" rx="120" ry="60" fill="url(#lamp)"/>
  </g>
  <g>
    <line x1="900" y1="0" x2="900" y2="70" stroke="#1a1418" stroke-width="6"/>
    <path d="M 868 70 L 932 70 L 918 96 L 882 96 Z" fill="#2c2218"/>
    <ellipse cx="900" cy="118" rx="120" ry="60" fill="url(#lamp)"/>
  </g>
  <!-- table 1 -->
  <g transform="translate(120 620)">
    <rect x="0" y="0" width="420" height="26" rx="12" fill="url(#wood)"/>
    <rect x="24" y="26" width="26" height="150" fill="#2c2218"/><rect x="370" y="26" width="26" height="150" fill="#2c2218"/>
    <!-- benches -->
    <rect x="-30" y="120" width="150" height="26" rx="10" fill="url(#wood)"/>
    <rect x="300" y="120" width="150" height="26" rx="10" fill="url(#wood)"/>
    <!-- dishes on table -->
    <ellipse cx="120" cy="-8" rx="40" ry="18" fill="#f4e7c8"/><ellipse cx="120" cy="-10" rx="30" ry="13" fill="#d4402f"/>
    <ellipse cx="230" cy="-8" rx="46" ry="20" fill="#f4e7c8"/><ellipse cx="230" cy="-11" rx="36" ry="15" fill="#c9a86a"/>
    <ellipse cx="330" cy="-8" rx="40" ry="18" fill="#f4e7c8"/><ellipse cx="330" cy="-10" rx="30" ry="13" fill="#4a7a3a"/>
    <circle cx="80" cy="-12" r="14" fill="#8f2a1e"/>
  </g>
  <!-- table 2 -->
  <g transform="translate(600 640)">
    <rect x="0" y="0" width="480" height="26" rx="12" fill="url(#wood)"/>
    <rect x="24" y="26" width="26" height="150" fill="#2c2218"/><rect x="430" y="26" width="26" height="150" fill="#2c2218"/>
    <rect x="-30" y="120" width="160" height="26" rx="10" fill="url(#wood)"/>
    <rect x="350" y="120" width="160" height="26" rx="10" fill="url(#wood)"/>
    <ellipse cx="140" cy="-8" rx="46" ry="20" fill="#f4e7c8"/><ellipse cx="140" cy="-11" rx="36" ry="15" fill="#d9a441"/>
    <ellipse cx="280" cy="-8" rx="44" ry="19" fill="#f4e7c8"/><ellipse cx="280" cy="-10" rx="34" ry="14" fill="#2d4f8f"/>
    <ellipse cx="400" cy="-8" rx="40" ry="18" fill="#f4e7c8"/><ellipse cx="400" cy="-10" rx="30" ry="13" fill="#8f2a1e"/>
  </g>
  <!-- plant -->
  <g transform="translate(1090 700)">
    <ellipse rx="60" ry="80" fill="#2c4a2a"/><ellipse rx="60" ry="80" fill="none" stroke="#1c3320" stroke-width="5"/>
    <ellipse cx="-20" cy="-30" rx="30" ry="50" fill="#375c2a"/>
    <rect x="-16" y="70" width="32" height="90" rx="10" fill="#6b4a2a"/>
    <ellipse cx="0" cy="160" rx="50" ry="14" fill="#2c2218"/>
  </g>
</svg>`;

/* ---------- 7. LOGO (512x512) ---------- */
const logo = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="lg" cx="0.35" cy="0.3" r="0.85">
      <stop offset="0" stop-color="#e6472f"/><stop offset="0.6" stop-color="#d4402f"/><stop offset="1" stop-color="#a8211a"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f0cf8a"/><stop offset="0.5" stop-color="#d9a441"/><stop offset="1" stop-color="#a87a2a"/>
    </linearGradient>
  </defs>
  <circle cx="256" cy="256" r="236" fill="#16181d"/>
  <circle cx="256" cy="256" r="236" fill="none" stroke="url(#gold)" stroke-width="16"/>
  <circle cx="256" cy="256" r="196" fill="url(#lg)"/>
  <circle cx="256" cy="256" r="196" fill="none" stroke="#ffd9a0" stroke-width="6" opacity="0.5"/>
  <!-- bowl -->
  <path d="M 156 268 Q 160 336 256 336 Q 352 336 356 268 Z" fill="#f8f2e4"/>
  <path d="M 156 268 Q 160 336 256 336 Q 352 336 356 268 Z" fill="none" stroke="#d8cba8" stroke-width="8"/>
  <ellipse cx="256" cy="268" rx="100" ry="26" fill="#fdfaf0"/>
  <ellipse cx="256" cy="268" rx="100" ry="26" fill="none" stroke="#d8cba8" stroke-width="6"/>
  <!-- steam -->
  <path d="M 226 216 C 216 198, 240 194, 230 176" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity="0.85"/>
  <path d="M 286 216 C 276 200, 300 196, 290 180" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity="0.85"/>
  <!-- chopsticks -->
  <rect x="196" y="286" width="12" height="120" rx="6" fill="#8f6540" transform="rotate(28 202 346)"/>
  <rect x="220" y="286" width="12" height="120" rx="6" fill="#7a5330" transform="rotate(28 226 346)"/>
</svg>`;

/* ---------- render ---------- */
const jobs = [
  ["menu-noodles", noodles, 900, 600],
  ["menu-rice-bowl", ricebowl, 900, 600],
  ["menu-chicken", chicken, 900, 600],
  ["menu-hotpot", hotpot, 900, 600],
  ["hero", hero, 1024, 1024],
  ["interior", interior, 1200, 900],
  ["logo", logo, 512, 512],
];

(async () => {
  for (const [name, svg, w, h] of jobs) {
    const file = path.join(OUT, name + ".jpg");
    await sharp(Buffer.from(svg))
      .resize(w, h)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(file);
    const meta = await sharp(file).metadata();
    console.log(`${name}.jpg  ${meta.width}x${meta.height}  ${(fs.statSync(file).size / 1024).toFixed(1)} KB`);
  }
  console.log("DONE — barcha rasmlar yaratildi");
})();
