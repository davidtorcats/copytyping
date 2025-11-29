import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'wouter';
import { ArrowLeft, RotateCcw, Target, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { salesLetters as defaultSalesLetters } from '@/data/salesLetters';
import type { SalesLetter } from '@/data/salesLetters';

export default function Practice() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const letterId = parseInt(params.id || '1');
  
  // Get all letters (default + custom from localStorage)
  const getAllLetters = (): SalesLetter[] => {
    const stored = localStorage.getItem('customLetters');
    if (stored) {
      try {
        const customLetters = JSON.parse(stored);
        return [...defaultSalesLetters, ...customLetters];
      } catch (e) {
        console.error('Error loading custom letters:', e);
      }
    }
    return defaultSalesLetters;
  };
  
  const allLetters = getAllLetters();
  const letter = allLetters.find(l => l.id === letterId) || allLetters[0];

  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);

  const fullText = letter.fullText;

  // Calculate stats
  const calculateWPM = () => {
    if (!startTime || elapsedTime === 0) return 0;
    const minutes = elapsedTime / 60;
    const words = userInput.trim().split(/\s+/).length;
    return Math.round(words / minutes);
  };

  const calculateAccuracy = () => {
    if (userInput.length === 0) return 100;
    const correctChars = userInput.split('').filter((char, index) => char === fullText[index]).length;
    return Number(((correctChars / userInput.length) * 100).toFixed(1));
  };

  const calculateProgress = () => {
    return Number(((userInput.length / fullText.length) * 100).toFixed(1));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer
  useEffect(() => {
    if (!startTime || showModal) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, showModal]);



  // Handle typing
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    
    // Start timer on first character
    if (!startTime && newInput.length > 0) {
      setStartTime(Date.now());
    }

    // Count errors
    let errorCount = 0;
    for (let i = 0; i < newInput.length; i++) {
      if (newInput[i] !== fullText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    setUserInput(newInput);
  };

  // Render colored text with cursor
  const renderColoredText = () => {
    // Cursor follows the user input position, regardless of correctness
    const currentPosition = userInput.length;
    
    return fullText.split('').map((char, index) => {
      let color = 'text-muted-foreground'; // gray (not typed yet)
      let className = color;
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          // Correct letter - keep default color (no green)
          className = color; // No color change, no underline
        } else {
          color = 'text-[oklch(0.62_0.24_25)]'; // red (error)
          className = `${color} underline decoration-[oklch(0.62_0.24_25)] decoration-2 underline-offset-2`; // Red with underline
        }
      }
      
      // Add cursor at current position
      const isCursorPosition = index === currentPosition;

      return (
        <span key={index} className={`relative ${className} ${isCursorPosition ? 'cursor-position' : ''}`}>
          {isCursorPosition && (
            <span className="absolute top-0 left-0 w-[8px] h-full bg-gray-500 animate-pulse rounded-sm" />
          )}
          {char}
        </span>
      );
    });
  };

  const handleRestart = () => {
    setUserInput('');
    setStartTime(null);
    setElapsedTime(0);
    setErrors(0);
    setShowModal(false);
    textareaRef.current?.focus();
  };

  const handleEndSession = () => {
    // Save to history
    const session = {
      letterId: letter.id,
      letterTitle: letter.title,
      letterAuthor: letter.author,
      wpm: calculateWPM(),
      accuracy: calculateAccuracy(),
      errors,
      time: elapsedTime,
      words: userInput.trim().split(/\s+/).length,
      completedAt: new Date().toISOString(),
    };

    const history = JSON.parse(localStorage.getItem('practiceHistory') || '[]');
    history.unshift(session);
    localStorage.setItem('practiceHistory', JSON.stringify(history));

    setShowModal(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-[oklch(0.68_0.19_160)]';
      case 'intermediate':
        return 'bg-[oklch(0.65_0.25_45)]';
      case 'advanced':
        return 'bg-[oklch(0.62_0.24_25)]';
      default:
        return 'bg-primary';
    }
  };

  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();
  const progress = calculateProgress();

  return (
    <div className="page-transition min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border py-4">
        <div className="container flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Selection
          </Button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <h1 className="text-xl font-bold">{letter.title}</h1>
              <p className="text-sm text-muted-foreground">by {letter.author}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getDifficultyColor(letter.difficulty)}`}>
              {letter.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">WPM</p>
            <p className="text-3xl font-bold text-primary">{wpm}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
            <p className="text-3xl font-bold text-primary">{accuracy}%</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Errors</p>
            <p className="text-3xl font-bold text-primary">{errors}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Progress</p>
            <p className="text-3xl font-bold text-primary">{progress}%</p>
          </div>
        </div>

        {/* Practice Area */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Original Text */}
          <div 
            ref={textDisplayRef}
            className="bg-[#fefad6] p-6 rounded-lg shadow-lg border-2 border-[oklch(0.70_0.12_80)] h-[400px] overflow-y-auto"
          >
            <div 
              className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-[oklch(0.25_0.02_85)]"
            >
              {renderColoredText()}
            </div>
          </div>

          {/* Typing Area */}
          <div className="flex flex-col gap-4">
            <textarea
              ref={textareaRef}
              value={userInput}
              onChange={handleInputChange}
              placeholder="Start typing here..."
              className="flex-1 w-full h-[400px] p-4 bg-card border-2 border-primary/50 rounded-lg resize-none focus:outline-none focus:border-primary font-mono text-sm leading-relaxed"
              autoFocus
            />
            
            {/* Progress Bar */}
            <div className="w-full bg-card border border-border rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={handleEndSession}
                className="w-full"
              >
                End Session
              </Button>
              <Button
                onClick={handleRestart}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Session Completed!</h2>
              <p className="text-muted-foreground">
                You just completed typing "<span className="text-primary font-semibold">{letter.title}</span>" by <span className="font-semibold">{letter.author}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">⚡ WPM</p>
                <p className="text-2xl font-bold">{wpm}</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">🎯 Accuracy</p>
                <p className="text-2xl font-bold">{accuracy}%</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">⏱️ Time</p>
                <p className="text-2xl font-bold">{formatTime(elapsedTime)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">📝 Words</p>
                <p className="text-2xl font-bold">{userInput.trim().split(/\s+/).length}</p>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mb-6">
              💡 Your performance has been saved to your history!
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={handleRestart}
                className="w-full"
              >
                Try Again
              </Button>
              <Button
                onClick={() => setLocation('/practice')}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Choose New Letter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
