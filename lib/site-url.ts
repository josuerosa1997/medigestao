import { BASE_PATH } from "./site-path";

const configuredSiteUrl = process.env.SITE_URL
  || `https://josuerosa1997.github.io${BASE_PATH}/`;
const siteRoot = new URL(`${configuredSiteUrl.replace(/\/+$/, "")}/`);

/** Absolute metadata URLs relative to the published site's root directory. */
export function siteUrl(path = "/"): string {
  return new URL(path.replace(/^\/+/, ""), siteRoot).toString();
}
