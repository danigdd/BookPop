export async function apiFetch(
  url: string,
  options: Record<string, unknown>,
  retry = true,
) {
  const response = await fetch(url, options);
  if (response.status !== 401 || !retry) {
    return response;
  }

  const refreshResponse = await fetch("/api/auth/refresh", {
    method: "POST",
  });

  if (!refreshResponse.ok) {
    return response;
  }

  return apiFetch(url, options, false);
}
