import React, { useEffect, useRef, useState } from "react";

function WordFlasher({ book, wpm }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const savedIndex =
      book.startIndex !== undefined
        ? book.startIndex
        : parseInt(localStorage.getItem(`progress-${book.name}`)) || 0;
    setIndex(savedIndex);
  }, [book]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const intervalRef = useRef(null);
  const words = book.content.split(/\s+/);

  const delay = 60000 / wpm;

  const start = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= words.length) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          return prev;
        }
        localStorage.setItem(`progress-${book.name}`, next);
        return next;
      });
    }, delay);

    setIsPlaying(true);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const reset = () => {
    pause();
    setIndex(0);
    localStorage.setItem(`progress-${book.name}`, 0);
  };

  useEffect(() => {
    setCurrentWord(words[index] || "Done!");
  }, [index]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const progress = Math.min((index / words.length) * 100, 100);

  const goForward = () => {
    setIndex((prev) => {
      const next = Math.min(prev + 10, words.length - 1);
      localStorage.setItem(`progress-${book.name}`, next);
      return next;
    });
  };

  const goBackward = () => {
    setIndex((prev) => {
      const next = Math.max(prev - 10, 0);
      localStorage.setItem(`progress-${book.name}`, next);
      return next;
    });
  };

  return (
    <div className="w-full">
      <div className="mb-4 w-full flex flex-col items-center justify-between">
        <h2 className="font-sora text-lg sm:text-xl font-bold text-center mb-4 sm:mb-6 w-full flex flex-col items-center justify-between px-2">
          Now Reading: {book.name}
        </h2>
        <div className="w-full flex justify-center items-center px-2 sm:px-0">
          <div
            className="word-display mb-6 sm:mb-8 w-full"
            style={{
              background: "var(--card)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--border)",
              borderRadius: "24px",
              padding: "2rem 1rem",
              minHeight: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-2xl)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <span
              className="word"
              style={{
                fontSize: "clamp(1.5rem, 8vw, 4rem)",
                fontWeight: 300,
                color: "var(--foreground)",
                textShadow: "0 0 30px color-mix(in srgb, var(--primary) 50%, transparent)",
                letterSpacing: "-1px",
                transition: "all 0.3s ease",
                zIndex: 1
              }}
            >
              {currentWord}
            </span>
            <span
              style={{
                content: "''",
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: "conic-gradient(transparent, color-mix(in srgb, var(--primary) 10%, transparent), transparent)",
                animation: "rotate 20s linear infinite",
                zIndex: 0,
                pointerEvents: "none"
              }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 my-4 items-center justify-center px-2">
          
          <button
            onClick={isPlaying ? pause : start}
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              fontWeight: 600,
              boxShadow: "var(--shadow-lg)",
              border: "none",
              borderRadius: "12px",
              padding: "0.75rem 1rem",
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minWidth: "60px",
              flex: "1 1 45%"
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "var(--shadow-xl)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "var(--shadow-lg)";
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={reset}
            style={{
              background: "var(--secondary)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "0.75rem 1rem",
              color: "var(--secondary-foreground)",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              minWidth: "60px",
              flex: "1 1 45%"
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "var(--secondary)";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Reset
          </button>
          <button
            onClick={goBackward}
            style={{
              background: "var(--secondary)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "0.75rem 1rem",
              color: "var(--secondary-foreground)",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              minWidth: "60px",
              flex: "1 1 45%"
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "var(--secondary)";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ← -10
          </button>
          <button
            onClick={goForward}
            style={{
              background: "var(--secondary)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "0.75rem 1rem",
              color: "var(--secondary-foreground)",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              minWidth: "60px",
              flex: "1 1 45%"
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "var(--secondary)";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            +10 →
          </button>
        </div>
      </div>
      <div className="w-full mt-6 sm:mt-8 px-2 sm:px-0">
        <p className="text-center mb-2 text-sm sm:text-base" style={{ color: "var(--foreground)" }}>
          {Math.floor(progress)}% completed
        </p>
        <div className="w-full h-2 rounded overflow-hidden" style={{ background: "var(--muted)" }}>
          <div
            className="h-full transition-all duration-400"
            style={{ width: `${progress}%`, background: "var(--primary)" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default WordFlasher;
