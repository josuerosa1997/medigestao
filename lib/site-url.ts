import { BASE_PATH } from "./site-path";

const configuredSiteUrl = process.env.SITE_URL
  || "https://medigestaoconsultoria.com/";
const siteRoot = new URL(`${configuredSiteUrl.replace(/\/+$/, "")}/`);

/** Absolute metadata URLs relative to the published site's root directory. */
export function siteUrl(path = "/"): string {
  return new URL(path.replace(/^\/+/, ""), siteRoot).toString();
}
