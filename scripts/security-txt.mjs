import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.join(root, "build");
const wellKnownDir = path.join(buildDir, ".well-known");
const siteUrl = process.env.SITE_URL || "https://muhammad-arslan-portfolio.vercel.app/";
const canonical = new URL("/.well-known/security.txt", siteUrl).toString();
const expires = new Date();
expires.setUTCFullYear(expires.getUTCFullYear() + 1);

const body = `Contact: mailto:arslansaleem622@gmail.com
Expires: ${expires.toISOString()}
Preferred-Languages: en
Canonical: ${canonical}
`;

fs.mkdirSync(wellKnownDir, { recursive: true });
fs.writeFileSync(path.join(wellKnownDir, "security.txt"), body);
console.log("Wrote .well-known/security.txt");
