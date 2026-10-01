const csvCell = (value) => {
  const original = value === null || value === undefined ? "" : String(value);
  const protectedValue = /^[=+\-@]/.test(original) ? `'${original}` : original;
  return `"${protectedValue.replace(/"/g, '""')}"`;
};
// CSV files open directly in Excel and avoid shipping a vulnerable spreadsheet
// parser to every browser. Formula-like values are prefixed to prevent CSV injection.
export const exportRowsToExcel = (fileName, rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return;

  const headers = Object.keys(rows[0]);
  const csv = [
    headers.map(csvCell).join(","),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(",")),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
