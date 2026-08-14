// Oddiy statik server — Shikugyong saytini lokal ko'rish uchun
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 8123;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".md": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

// Xavfsizlik headerlari — ishlab chiqishda ham sayt himoyalangan bo'ladi
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    "frame-src https://www.google.com",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests"
  ].join("; ")
};

// URL'dan xavfsiz fayl yo'lini chiqarish.
// Xato bo'lsa null qaytaradi (403 javob uchun).
function resolveFilePath(urlPath) {
  if (urlPath.includes("\0")) return null; // null-bayt hujumidan himoya
  const filePath = path.normalize(path.join(ROOT, urlPath));
  // ROOT ichida qolishini qat'iy tekshirish (path traversal hujumidan himoya)
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) return null;
  return filePath;
}

http.createServer((req, res) => {
  // Noto'g'ri URL (masalan "%zz") serverni qulatmasligi uchun xavfsiz dekodlash
  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split("?")[0]);
  } catch {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("400 — Noto'g'ri so'rov");
    return;
  }

  if (urlPath === "/") urlPath = "/index.html";

  const filePath = resolveFilePath(urlPath);
  if (!filePath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("403 — Taqiqlangan");
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 — Fayl topilmadi");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const headers = { ...SECURITY_HEADERS, "Content-Type": MIME[ext] || "application/octet-stream" };
    if (/\.(jpg|jpeg|png|webp|svg|ico)$/i.test(filePath)) {
      headers["Cache-Control"] = "public, max-age=86400";
    }
    if (req.method === "HEAD") {
      res.writeHead(200, headers);
      res.end();
      return;
    }
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  });
}).listen(PORT, () => console.log("Server: http://localhost:" + PORT));
