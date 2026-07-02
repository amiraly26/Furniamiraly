export function GetPayloadURL() {
  return (process.env.NEXT_PUBLIC_PAYLOAD_URL ?? "http://localhost:1337").replace(/\/$/, "") + "/";
}

export function getPayloadMediaURL(url: string | null | undefined) {
  if (!url) return "";
  if (url.startsWith("data:") || url.startsWith("http") || url.startsWith("//")) return url;
  if (url.startsWith("/images/")) return url;

  return GetPayloadURL().slice(0, -1) + (url.startsWith("/") ? url : `/${url}`);
}
