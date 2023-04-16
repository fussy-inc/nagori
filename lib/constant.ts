const FUSSY_API_URL =
  process.env.NEXT_PUBLIC_FUSSY_API_URL ?? ("https://api.fussy.fun" as const);
const FUSSY_SERVICE_URL =
  process.env.NEXT_PUBLIC_FUSSY_SERVICE_URL ??
  ("https://www.fussy.fun" as const);
const NAGORI_SERVICE_URL =
  process.env.NEXT_PUBLIC_NAGORI_SERVICE_URL ??
  ("https://nagori.vercel.app" as const);

export { FUSSY_API_URL, FUSSY_SERVICE_URL, NAGORI_SERVICE_URL };
