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
                marginLeft: isActive ? "16px" : undefined,
                display: "flex",
                alignItems: "center",
                gap: "12px"
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
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 flex-shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="flex-1 truncate">{book.name}</span>
            </button>
          );
        })
      )}
    </div>
  );
}

export default Library;
