/**
 * Parses a basic CSV string into row objects using the first row as headers.
 */
export function parseCsv(input: string): Record<string, string>[] {
  const lines = input.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split(",").map((c) => c.trim());
    const row: Record<string, string> = {};
    for (let i = 0; i < headers.length; i += 1) row[headers[i]] = cols[i] ?? "";
    return row;
  });
}
