export function getCookieValue(
  cookieHeader: string | null,
  cookieName: string,
) {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";");

  const cookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${cookieName}=`),
  );

  if (!cookie) return null;

  return cookie.split("=")[1];
}
