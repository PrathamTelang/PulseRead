import React, { useState, useEffect } from "react";

function Library({ onSelect }) {
  const [books, setBooks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const loadBooks = () => {
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
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = (e, book) => {
    e.stopPropagation();
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      localStorage.removeItem(bookToDelete.name);
      localStorage.removeItem(`progress-${bookToDelete.name}`);
      loadBooks();
      setActiveIndex(null);
    }
    setShowDeleteModal(false);
    setBookToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBookToDelete(null);
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}
          onClick={cancelDelete}
        >
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "380px",
              width: "100%",
              boxShadow: "var(--shadow-2xl)",
              animation: "modalSlideIn 0.3s ease-out"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "color-mix(in srgb, var(--destructive) 10%, transparent)",
                  border: "2px solid color-mix(in srgb, var(--destructive) 30%, transparent)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px"
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="var(--destructive)"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "var(--foreground)", marginBottom: "8px" }}>
                Delete Book?
              </h3>
              <p style={{ color: "var(--muted-foreground)", fontSize: "14px", lineHeight: "1.5" }}>
                Are you sure you want to delete <span style={{ color: "var(--primary)", fontWeight: "600" }}>"{bookToDelete?.name}"</span>? This action cannot be undone.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={cancelDelete}
                style={{
                  flex: 1,
                  background: "var(--secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "12px 20px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "var(--secondary-foreground)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "var(--secondary)";
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  flex: 1,
                  background: "var(--destructive)",
                  border: "1px solid var(--destructive)",
                  borderRadius: "10px",
                  padding: "12px 20px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "var(--destructive-foreground)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "var(--shadow-lg)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-xl)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {books.length === 0 ? (
          <p style={{ color: "var(--muted-foreground)" }}>No books saved yet.</p>
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
                background: isActive ? "var(--accent)" : "var(--card)",
                border: isActive ? "1px solid var(--primary)" : "1px solid var(--border)",
                borderRadius: "12px",
                padding: "16px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
                marginBottom: "12px",
                color: isActive ? "var(--accent-foreground)" : "var(--primary)",
                textAlign: "left",
                boxShadow: isActive ? "var(--shadow-md)" : "var(--shadow-sm)",
                fontSize: isActive ? "14px" : undefined,
                marginLeft: isActive ? "16px" : undefined,
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = isActive ? "var(--accent)" : "var(--muted)";
                e.currentTarget.style.borderColor = isActive ? "var(--primary)" : "var(--primary)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = isActive ? "var(--accent)" : "var(--card)";
                e.currentTarget.style.borderColor = isActive ? "var(--primary)" : "var(--border)";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = isActive ? "var(--shadow-md)" : "var(--shadow-sm)";
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
              <button
                onClick={(e) => handleDelete(e, book)}
                style={{
                  background: "color-mix(in srgb, var(--destructive) 10%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--destructive) 30%, transparent)",
                  borderRadius: "8px",
                  padding: "8px",
                  color: "var(--destructive)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = "color-mix(in srgb, var(--destructive) 20%, transparent)";
                  e.currentTarget.style.borderColor = "var(--destructive)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = "color-mix(in srgb, var(--destructive) 10%, transparent)";
                  e.currentTarget.style.borderColor = "color-mix(in srgb, var(--destructive) 30%, transparent)";
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </button>
          );
        })
      )}
      </div>
    </>
  );
}

export default Library;
