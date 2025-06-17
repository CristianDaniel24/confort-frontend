import * as XLSX from "xlsx";

export const exportToExcel = (
  data: Record<string, any>[],
  fileName: string,
  sheetName: string
) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Calcular automáticamente el ancho de cada columna
  const columnWidths = Object.keys(data[0] || {}).map((key) => {
    const maxLength = Math.max(
      key.length,
      ...data.map((item) => String(item[key] ?? "").length)
    );
    return { wch: maxLength + 2 }; // +2 para márgenes
  });

  worksheet["!cols"] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
