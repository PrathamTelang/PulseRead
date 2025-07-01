import React, { useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Set workerSrc to a CDN or local path for compatibility
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

function PDFReader({ onLoadText }) {
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ") + " ";
    }

    const book = {
      name: file.name,
      content: text.trim(),
    };

    localStorage.setItem(file.name, JSON.stringify(book));
    onLoadText(book);
  };

  return (
    <div className="mb-8">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        ref={fileRef}
        className="px-3 py-2 rounded-md border border-[#BEFC6D] bg-[#272121] text-[#FFFDFD] cursor-pointer file:bg-[#BEFC6D] file:text-[#272121] file:px-3 file:py-1 file:rounded-md file:mr-4 file:cursor-pointer"
      />
    </div>
  );
}

export default PDFReader;
