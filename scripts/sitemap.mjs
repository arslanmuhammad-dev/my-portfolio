import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.join(root, "build");
const siteUrl = process.env.SITE_URL || "https://muhammad-arslan-portfolio-green.vercel.app/";

let lastmod;
try {
  lastmod = execFileSync("git", ["log", "-1", "--format=%cI"], {
    cwd: root,
    encoding: "utf8",
  }).trim();
} catch {
  lastmod = new Date().toISOString();
}

const url = new URL("/", siteUrl).toString();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`;

fs.mkdirSync(buildDir, { recursive: true });
fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);
console.log(`Wrote sitemap.xml for ${url}`);
