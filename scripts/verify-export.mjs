import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const output = fileURLToPath(new URL("../out/", import.meta.url));
const configuredBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "/medigestao";
const base = configuredBase === "/" ? "" : configuredBase.replace(/\/+$/, "");
const configuredSiteUrl = process.env.SITE_URL || `https://josuerosa1997.github.io${base}/`;
const siteRoot = new URL(`${configuredSiteUrl.replace(/\/+$/, "")}/`);
const failures = [];
function expect(condition, message) { if (!condition) failures.push(message); }
for (const path of ["index.html", "privacidade/index.html", "404.html", ".nojekyll", "FONT-LICENSES.txt"]) {
  expect(existsSync(join(output, path)), `Missing exported file: ${path}`);
}
const index = readFileSync(join(output, "index.html"), "utf8");
const privacy = readFileSync(join(output, "privacidade/index.html"), "utf8");
expect(index.includes('https://wa.me/5594992326657?text='), "Home page is missing the confirmed WhatsApp destination.");
expect(index.includes("medigestaocontabil@gmail.com"), "Home page is missing the confirmed email address.");
expect(index.includes(`href="${base}/privacidade/"`), "Privacy link does not use the selected base path.");
expect(privacy.includes(`href="${base}/"`), "Privacy page return link does not use the selected base path.");
expect(!index.includes("medigestao.josuerosa.chatgpt.site") && !privacy.includes("medigestao.josuerosa.chatgpt.site"), "Previous hosting URL remains in the exported pages.");

for (const [label, html] of [["home", index], ["privacy", privacy]]) {
  const canonical = new URL(label === "home" ? "" : "privacidade/", siteRoot).toString();
  expect(html.includes(`rel="canonical" href="${canonical}"`), `${label}: canonical URL does not match the publication URL.`);
  expect(html.includes(`property="og:url" content="${canonical}"`), `${label}: Open Graph URL does not match the page's publication URL.`);
  const urls = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1]);
  for (const value of urls) {
    if (!value.startsWith("/") || value.startsWith("//")) continue;
    expect(!base || value.startsWith(`${base}/`), `${label}: root-relative URL outside the base path: ${value}`);
    const relative = (base && value.startsWith(`${base}/`) ? value.slice(base.length + 1) : value.slice(1)).split(/[?#]/)[0];
    const target = join(output, relative);
    expect(existsSync(target), `${label}: exported target missing: ${value}`);
  }
}

function walk(directory) {
  return readdirSync(directory).flatMap(name => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}
const cssFiles = walk(join(output, "_next")).filter(path => path.endsWith(".css"));
let fontCount = 0;
for (const cssFile of cssFiles) {
  const css = readFileSync(cssFile, "utf8");
  for (const match of css.matchAll(/url\(["']?([^"')]+\.woff2(?:\?[^"')]+)?)["']?\)/g)) {
    const url = match[1];
    fontCount++;
    expect(url.startsWith(`${base}/_next/`), `Font URL is missing the selected base path: ${url}`);
    expect(existsSync(join(output, url.slice(base.length + 1).split("?")[0])), `Bundled font is absent: ${url}`);
  }
}
expect(fontCount >= 3, "Expected all three local font declarations in the compiled CSS.");
if (failures.length) {
  for (const failure of failures) console.error(failure);
  process.exitCode = 1;
} else {
  console.log(`Export verified: routes, assets, fonts, metadata destination, and confirmed contact links use ${base || "/"}.`);
}
