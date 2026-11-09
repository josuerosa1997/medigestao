const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const BASE_PATH = configuredBasePath === "/"
  ? ""
  : configuredBasePath.replace(/\/+$/, "");

/** Prefix local public assets and native links; leave external destinations intact. */
export function sitePath(path = "/"): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(path)) return path;
  if (BASE_PATH && (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`))) return path;
  return `${BASE_PATH}/${path.replace(/^\/+/, "")}`;
}
