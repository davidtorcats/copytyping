import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [, setLocation] = useLocation();
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Master your typing speed while learning from legendary sales copy.';
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-transition min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="container max-w-4xl text-center px-4">
        {/* Logo/Icon */}
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-8">
          <span className="text-white font-bold text-4xl">T</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Copy<span className="text-primary">Typing</span>
        </h1>

        {/* Animated Description */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 h-16 font-mono">
          {displayText}
          <span className="animate-pulse">|</span>
        </p>

        {/* Start Practice Button */}
        <Button
          size="lg"
          onClick={() => setLocation('/practice')}
          className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
        >
          Start Practice
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

        {/* Footer */}
        <footer className="mt-20 text-sm text-muted-foreground">
          <p>© 2025 CopyTyping. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
