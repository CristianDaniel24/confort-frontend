// PrintButton.tsx
"use client";

import html2pdf from "html2pdf.js";

export function PrintButton({ elementId }: { elementId: string }) {
  const handlePrint = () => {
    const element = document.getElementById(elementId);
    if (element) {
      html2pdf().from(element).save();
    }
  };

  return <button onClick={handlePrint}>Descargar</button>;
}
