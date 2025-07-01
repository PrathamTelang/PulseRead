import React, { useState, useEffect } from "react";
import PDFReader from "./components/PDFReader";
import WordFlasher from "./components/WordFlasher";
import Library from "./components/Library";
import logo from "./assets/logo.png";

function App() {
  const [book, setBook] = useState(null);
  const [wpm, setWpm] = useState(300);
  const [showLibrary, setShowLibrary] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowLibrary(false);
      } else {
        setShowLibrary(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectBook = (bookData) => {
    const progress = parseInt(localStorage.getItem(`progress-${bookData.name}`)) || 0;
    setBook({ ...bookData, startIndex: progress });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#272121] text-[#FFFDFD] overflow-x-hidden">
      {/* Header */}
      <header className="w-full flex items-center gap-2 px-4 py-3 bg-[#181C1F] border-b border-[#3a332f] z-50">
        <button
          onClick={() => setShowLibrary((prev) => !prev)}
          className="bg-[#BEFC6D] text-[#272121] font-semibold rounded-lg p-2 shadow-md hover:bg-[#d9ff96] transition-all flex items-center justify-center"
          style={{ minWidth: "40px", minHeight: "40px" }}
          aria-label={showLibrary ? "Close sidebar" : "Open sidebar"}
        >
          {showLibrary ? (
            // Close (X) icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Menu (hamburger) icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <h2 className="font-sora text-xl md:text-2xl text-[#FFFDFD] tracking-wide flex-1 flex items-center gap-2">
          PulseRead
          <img
            src={logo}
            alt="PulseRead Logo"
            className="h-10 w-10 md:h-15 md:w-15 object-contain"
          />
        </h2>
      </header>

      {/* Sidebar */}
      <aside
        className="fixed top-[64px] left-0 z-40 w-2/3 md:w-[16vw] h-[calc(100%-64px)] bg-[#181C1F] p-4 md:p-6 border-b md:border-b-0 md:border-r border-[#3a332f] flex flex-col gap-4 md:gap-8 shadow-lg transition-transform duration-300 ease-in-out"
        style={{
          transform: showLibrary
            ? "translateX(0)"
            : "translateX(-100%)",
          pointerEvents: showLibrary ? "auto" : "none", // Prevent interaction when hidden
        }}
      >
        <Library onSelect={handleSelectBook} />
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 overflow-auto w-full transition-all duration-300"
      >
        <div className="w-full flex flex-col items-center">
          <PDFReader onLoadText={setBook} />
          {book && (
            <>
              <WordFlasher book={book} wpm={wpm} />
              <div className="flex flex-col sm:flex-row gap-4 my-4 items-center justify-center">
                <label className="font-semibold">WPM:</label>
                <input
                  type="number"
                  step="10"
                  value={wpm}
                  onChange={(e) => setWpm(parseInt(e.target.value))}
                  min={100}
                  className="px-4 py-2 rounded-lg border border-[#BEFC6D] bg-[#272121] text-[#FFFDFD] focus:outline-none focus:border-[#d9ff96] w-32"
                />
              </div>
            </>
          )}
          {!book && (
            <p className="text-lg mt-8 text-center">Upload or select a book to get started!</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
