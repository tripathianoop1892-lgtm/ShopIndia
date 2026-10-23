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

const htmlCell = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const exportRowsToPdf = (title, rows, subtitle = "") => {
  if (!Array.isArray(rows) || rows.length === 0) return false;

  const headers = Object.keys(rows[0]);
  const headerCells = headers.map((header) => `<th>${htmlCell(header)}</th>`).join("");
  const bodyRows = rows
    .map(
      (row) => `<tr>${headers.map((header) => `<td>${htmlCell(row[header])}</td>`).join("")}</tr>`
    )
    .join("");
  const printWindow = window.open("", "_blank");

  if (!printWindow) return false;

  printWindow.document.write(`<!doctype html><html><head><title>${htmlCell(title)}</title><style>
    @page { size: A4 landscape; margin: 12mm; }
    body { font-family: Arial, sans-serif; color: #172033; margin: 0; }
    h1 { color: #166534; margin: 0 0 4px; }
    p { color: #64748b; margin: 0 0 18px; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; }
    th { background: #166534; color: #fff; padding: 8px; text-align: left; }
    td { border: 1px solid #dbe3ea; padding: 7px; }
    tr:nth-child(even) { background: #f8fafc; }
  </style></head><body><h1>${htmlCell(title)}</h1><p>${htmlCell(subtitle)}</p><table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table><script>window.addEventListener("load", () => window.print());</script></body></html>`);
  printWindow.document.close();
  return true;
};
