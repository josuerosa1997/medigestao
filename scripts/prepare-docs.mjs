import { cpSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const output = fileURLToPath(new URL("../out/", import.meta.url));
const destination = fileURLToPath(new URL("../docs/", import.meta.url));
if (!existsSync(`${output}/index.html`) || !existsSync(`${output}/privacidade/index.html`)) {
  throw new Error("Run the static build successfully before preparing docs/.");
}
rmSync(destination, { recursive: true, force: true });
cpSync(output, destination, { recursive: true });
writeFileSync(`${destination}/.nojekyll`, "");
console.log("Copied the static export into docs/ for GitHub Pages branch publication.");
