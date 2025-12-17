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
      <label htmlFor="pdf-upload">
        <span
          style={{
            display: "inline-block",
            background: "var(--primary)",
            border: "none",
            borderRadius: "12px",
            padding: "16px 32px",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--primary-foreground)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "var(--shadow-lg)",
            marginRight: "16px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "var(--shadow-xl)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "var(--shadow-lg)";
          }}
        >
          Choose file
        </span>
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFile}
          ref={fileRef}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}

export default PDFReader;
