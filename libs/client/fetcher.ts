export async function fetchAPI<T>(url: string, cacheOption?: RequestCache): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}${url}`, {
    cache: cacheOption || 'no-store',
  });
  const { ok, data } = await res.json();

  if (!ok) throw new Error(`Failed to fetch ${url}`);

  return data;
}
