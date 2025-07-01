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
          <div className="text-[6vw] md:text-5xl font-extrabold text-[#FFFDFD] text-center px-4 py-8 rounded-lg bg-[#403D36] shadow-inner mb-8 w-full">
            {currentWord}
          </div>
        </div>
        <div className="flex gap-4 my-4 items-center justify-center">
          <button
            onClick={goBackward}
            className="bg-[#BEFC6D] text-[#272121] font-semibold rounded-lg px-4 py-2 shadow-md hover:bg-[#d9ff96] transition-all"
          >
            ← -10
          </button>
          <button
            onClick={isPlaying ? pause : start}
            className="bg-[#BEFC6D] text-[#272121] font-semibold rounded-lg px-6 py-3 shadow-md hover:bg-[#d9ff96] transition-all"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={reset}
            className="bg-[#BEFC6D] text-[#272121] font-semibold rounded-lg px-6 py-3 shadow-md hover:bg-[#d9ff96] transition-all"
          >
            Reset
          </button>
          <button
            onClick={goForward}
            className="bg-[#BEFC6D] text-[#272121] font-semibold rounded-lg px-4 py-2 shadow-md hover:bg-[#d9ff96] transition-all"
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
            className="h-full bg-[#BEFC6D] transition-all duration-400"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default WordFlasher;
