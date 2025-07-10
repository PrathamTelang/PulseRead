import React, { useState, useEffect } from "react";

function Library({ onSelect }) {
  const [books, setBooks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const saved = [];
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && !key.startsWith("progress-")) {
        try {
          const book = JSON.parse(localStorage.getItem(key));
          if (book && book.content) {
            saved.push(book);
          }
        } catch (err) {
          console.error("Invalid book data in localStorage:", key);
        }
      }
    }
    setBooks(saved);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {books.length === 0 ? (
        <p className="text-[#8b949e]">No books saved yet.</p>
      ) : (
        books.map((book, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                onSelect(book);
              }}
              style={{
                background: isActive ? "rgba(84, 229, 127, 0.1)" : "rgba(26, 26, 46, 0.6)",
                border: isActive ? "1px solid #54E57F" : "1px solid rgba(84, 229, 127, 0.1)",
                borderRadius: "12px",
                padding: "16px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
                marginBottom: "12px",
                color: isActive ? "#94a3b8" : "#54E57F",
                textAlign: "left",
                boxShadow: isActive ? "0 4px 20px #54E57F33" : undefined,
                fontSize: isActive ? "14px" : undefined,
                marginLeft: isActive ? "16px" : undefined
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = isActive ? "rgba(84, 229, 127, 0.1)" : "rgba(26, 26, 46, 0.8)";
                e.currentTarget.style.borderColor = isActive ? "#54E57F" : "rgba(84, 229, 127, 0.3)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = isActive ? "0 4px 20px #54E57F33" : "0 8px 25px rgba(0, 0, 0, 0.3)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = isActive ? "rgba(84, 229, 127, 0.1)" : "rgba(26, 26, 46, 0.6)";
                e.currentTarget.style.borderColor = isActive ? "#54E57F" : "rgba(84, 229, 127, 0.1)";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = isActive ? "0 4px 20px #54E57F33" : "none";
              }}
            >
              {book.name}
            </button>
          );
        })
      )}
    </div>
  );
}

export default Library;
