import React, { useState, useEffect } from 'react'
import { HiSun, HiMoon } from 'react-icons/hi'
import PDFReader from './components/PDFReader'
import Library from './components/Library'
import WordFlasher from './components/WordFlasher'
import './App.css'

function App() {
  const [currentBook, setCurrentBook] = useState(null)
  const [wpm, setWpm] = useState(300)
  const [showReader, setShowReader] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleLoadText = (book) => {
    setCurrentBook(book)
    setShowReader(true)
  }

  const handleSelectBook = (book) => {
    setCurrentBook(book)
    setShowReader(true)
  }

  if (showReader && currentBook) {
    return (
      <div className="min-h-screen px-4 sm:px-8 py-6 sm:py-12" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-3">
            <button
              onClick={() => setShowReader(false)}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all cursor-pointer text-sm sm:text-base"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              ← Back to Home
            </button>
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="dark-mode-toggle h-10 w-10 rounded-full transition-all cursor-pointer flex items-center justify-center"
              style={{ background: 'var(--secondary)', color: 'var(--secondary-foreground)', border: '1px solid var(--border)' }}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
            </button>
          </div>
          
          <div className="mb-6 sm:mb-8 w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <label className="text-base sm:text-lg font-medium">Reading Speed:</label>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
              className="flex-1 max-w-md cursor-pointer"
            />
            <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--primary)' }}>{wpm} WPM</span>
          </div>

          <WordFlasher book={currentBook} wpm={wpm} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Hero Section */}
      <header className="px-4 sm:px-8 py-8 sm:py-16 w-full text-center relative">
        <button
          onClick={toggleDarkMode}
          aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="absolute top-4 sm:top-8 right-4 sm:right-8 dark-mode-toggle h-10 sm:h-11 w-10 sm:w-11 rounded-full transition-all cursor-pointer flex items-center justify-center"
          style={{ background: 'var(--secondary)', color: 'var(--secondary-foreground)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
        </button>
        <div className="w-full mx-auto px-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6" style={{ background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            PulseRead
          </h1>
          <p className="text-lg sm:text-2xl mb-3 sm:mb-4" style={{ color: 'var(--muted-foreground)' }}>
            Accelerate Your Reading Speed
          </p>
          <p className="text-sm sm:text-lg max-w-2xl mx-auto px-2" style={{ color: 'var(--muted-foreground)' }}>
            Train your brain to read faster with our advanced rapid serial visual presentation (RSVP) technology. 
            Upload PDFs and watch your reading speed soar.
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <section className="px-4 sm:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          <div className="backdrop-blur-lg rounded-2xl p-4 sm:p-8 text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-3" style={{ color: 'var(--primary)' }}>3x</div>
            <div className="text-sm sm:text-base" style={{ color: 'var(--muted-foreground)' }}>Faster Reading Speed</div>
          </div>
          <div className="backdrop-blur-lg rounded-2xl p-4 sm:p-8 text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-3" style={{ color: 'var(--primary)' }}>100%</div>
            <div className="text-sm sm:text-base" style={{ color: 'var(--muted-foreground)' }}>Comprehension Retained</div>
          </div>
          <div className="backdrop-blur-lg rounded-2xl p-4 sm:p-8 text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-3" style={{ color: 'var(--primary)' }}>PDF</div>
            <div className="text-sm sm:text-base" style={{ color: 'var(--muted-foreground)' }}>Direct Upload Support</div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="px-4 sm:px-8 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="backdrop-blur-lg rounded-3xl p-6 sm:p-12" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)' }}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Get Started</h2>
            <p className="text-center mb-6 sm:mb-8 text-sm sm:text-base" style={{ color: 'var(--muted-foreground)' }}>
              Upload a PDF to begin your speed reading journey
            </p>
            <div className="flex justify-center">
              <PDFReader onLoadText={handleLoadText} />
            </div>
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section className="px-4 sm:px-8 py-8 sm:py-12 pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Your Library</h2>
          <div className="backdrop-blur-lg rounded-3xl p-4 sm:p-8" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)' }}>
            <Library onSelect={handleSelectBook} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-8 py-12 sm:py-16" style={{ background: 'var(--muted)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <div className="p-4 sm:p-6 backdrop-blur-lg rounded-2xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: 'var(--primary)' }}>Customizable Speed</h3>
              <p className="text-sm sm:text-base" style={{ color: 'var(--muted-foreground)' }}>
                Adjust your reading speed from 100 to 1000 words per minute to match your skill level.
              </p>
            </div>
            <div className="p-4 sm:p-6 backdrop-blur-lg rounded-2xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📚</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: 'var(--primary)' }}>Personal Library</h3>
              <p className="text-sm sm:text-base" style={{ color: 'var(--muted-foreground)' }}>
                Your books are saved locally. Resume reading from where you left off anytime.
              </p>
            </div>
            <div className="p-4 sm:p-6 backdrop-blur-lg rounded-2xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎯</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: 'var(--primary)' }}>Progress Tracking</h3>
              <p className="text-sm sm:text-base" style={{ color: 'var(--muted-foreground)' }}>
                Track your progress through each book with visual indicators.
              </p>
            </div>
            <div className="p-4 sm:p-6 backdrop-blur-lg rounded-2xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎨</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: 'var(--primary)' }}>Beautiful Interface</h3>
              <p className="text-sm sm:text-base" style={{ color: 'var(--muted-foreground)' }}>
                Enjoy a sleek, modern design that makes reading a pleasure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-6 sm:py-8 text-center text-sm sm:text-base" style={{ color: 'var(--muted-foreground)' }}>
        <p>© 2025 pulseRead. Read faster, learn more.</p>
      </footer>
    </div>
  )
}

export default App