import React, { useState, useEffect } from "react";

function Library({ onSelect }) {
  const [books, setBooks] = useState([]);

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
        books.map((book, i) => (
          <button
            key={i}
            onClick={() => onSelect(book)}
            className="bg-[#272121] border border-[#BEFC6D] text-[#BEFC6D] px-4 py-2 rounded-lg cursor-pointer transition-all hover:bg-[#403D36] hover:text-[#d9ff96] hover:scale-105 text-left"
          >
            {book.name}
          </button>
        ))
      )}
    </div>
  );
}

export default Library;
