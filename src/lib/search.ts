/**
 * Subsequence match: every character of `query` appears in `text`, in order,
 * with gaps allowed (whitespace in the query is ignored). So "expertm" matches
 * "Expert curation made simple". Shared by the blogs and locations search.
 */
export function matchesSubsequence(query: string, text: string): boolean {
  const q = query.toLowerCase().replace(/\s+/g, "");
  if (q === "") return true;
  const t = text.toLowerCase();
  let i = 0;
  for (let j = 0; j < t.length && i < q.length; j++) {
    if (t[j] === q[i]) i++;
  }
  return i === q.length;
}

/** True when `query` matches any of the given fields by subsequence. */
export function matchesAny(query: string, fields: string[]): boolean {
  if (query.trim() === "") return true;
  return fields.some((field) => matchesSubsequence(query, field));
}
