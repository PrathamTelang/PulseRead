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
    <div className="w-full max-w-2xl">
      <div className="mb-4">
        <h2 className="font-sora text-xl font-bold text-center mb-6">
          Now Reading: {book.name}
        </h2>
        <div className="flex justify-center items-center">
          <div
            className="word-display mb-8 w-full"
            style={{
              background: "rgba(26, 26, 46, 0.4)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(120, 255, 120, 0.1)",
              borderRadius: "24px",
              padding: "80px 60px",
              minHeight: "280px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <span
              className="word"
              style={{
                fontSize: "4rem",
                fontWeight: 300,
                color: "#fff",
                textShadow: "0 0 30px rgba(120, 255, 120, 0.5)",
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
                background: "conic-gradient(transparent, rgba(120, 255, 120, 0.1), transparent)",
                animation: "rotate 20s linear infinite",
                zIndex: 0,
                pointerEvents: "none"
              }}
            />
          </div>
        </div>
        <div className="flex gap-4 my-4 items-center justify-center">
          <button
            onClick={goBackward}
            style={{
              background: "rgba(26, 26, 46, 0.6)",
              border: "1px solid rgba(120, 255, 120, 0.2)",
              borderRadius: "12px",
              padding: "14px 24px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              minWidth: "80px",
              marginRight: "8px"
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "rgba(26, 26, 46, 0.8)";
              e.currentTarget.style.borderColor = "rgba(120, 255, 120, 0.4)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "rgba(26, 26, 46, 0.6)";
              e.currentTarget.style.borderColor = "rgba(120, 255, 120, 0.2)";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ← -10
          </button>
          <button
            onClick={isPlaying ? pause : start}
            style={{
              background: "linear-gradient(135deg, #78ff78, #4ade80)",
              color: "#0f0f23",
              fontWeight: 600,
              boxShadow: "0 4px 15px rgba(120, 255, 120, 0.3)",
              border: "none",
              borderRadius: "12px",
              padding: "14px 24px",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minWidth: "80px",
              marginRight: "8px"
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(120, 255, 120, 0.4)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(120, 255, 120, 0.3)";
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={reset}
            style={{
              background: "rgba(26, 26, 46, 0.6)",
              border: "1px solid rgba(120, 255, 120, 0.2)",
              borderRadius: "12px",
              padding: "14px 24px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              minWidth: "80px",
              marginRight: "8px"
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "rgba(26, 26, 46, 0.8)";
              e.currentTarget.style.borderColor = "rgba(120, 255, 120, 0.4)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "rgba(26, 26, 46, 0.6)";
              e.currentTarget.style.borderColor = "rgba(120, 255, 120, 0.2)";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Reset
          </button>
          <button
            onClick={goForward}
            style={{
              background: "rgba(26, 26, 46, 0.6)",
              border: "1px solid rgba(120, 255, 120, 0.2)",
              borderRadius: "12px",
              padding: "14px 24px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              minWidth: "80px"
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "rgba(26, 26, 46, 0.8)";
              e.currentTarget.style.borderColor = "rgba(120, 255, 120, 0.4)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "rgba(26, 26, 46, 0.6)";
              e.currentTarget.style.borderColor = "rgba(120, 255, 120, 0.2)";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            +10 →
          </button>
        </div>
      </div>
      <div className="w-full max-w-xl mt-8">
        <p className="text-center text-[#FFFDFD] mb-2">
          {Math.floor(progress)}% completed
        </p>
        <div className="w-full h-2 bg-[#403D36] rounded overflow-hidden">
          <div
            className="h-full bg-[#69F47B] transition-all duration-400"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default WordFlasher;
