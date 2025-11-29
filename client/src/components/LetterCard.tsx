import { User, FileText, Zap, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LetterCardProps {
  letter: {
    id: number;
    title: string;
    author: string;
    words: number;
    wpm: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    insights: number;
    preview: string;
  };
  onStartTyping?: () => void;
  onClick?: () => void;
}

export default function LetterCard({ letter, onStartTyping, onClick }: LetterCardProps) {
  const difficultyColors = {
    beginner: 'bg-[oklch(0.75_0.15_160)] text-white', // Verde pastel con texto blanco
    intermediate: 'bg-[oklch(0.80_0.12_60)] text-white', // Naranja pastel con texto blanco
    advanced: 'bg-[oklch(0.75_0.15_25)] text-white' // Rojo pastel con texto blanco
  };

  return (
    <div 
      onClick={onClick || onStartTyping}
      className="practice-card card-enter bg-card border border-border rounded-xl p-6 hover:shadow-[0_8px_30px_rgb(59,130,246,0.15)] hover:border-primary/50 hover:-translate-y-1 cursor-pointer dark:hover:bg-[oklch(0.20_0.03_255)]"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-foreground">{letter.title}</h3>
        <span className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase font-sans ${difficultyColors[letter.difficulty]}`}>
          {letter.difficulty}
        </span>
      </div>

      {/* Metadata */}
      <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <User size={14} />
          <span>{letter.author}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FileText size={14} />
          <span>{letter.words} words</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap size={14} />
          <span>{letter.wpm || 0} WPM</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {letter.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-background border border-border px-3 py-1 rounded-md text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Preview */}
      <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
        {letter.preview}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Lightbulb size={14} />
          <span>{letter.insights} insights</span>
        </div>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            if (onStartTyping) {
              onStartTyping();
            } else if (onClick) {
              onClick();
            }
          }}
          className="bg-primary hover:bg-[oklch(0.58_0.22_255)] text-white"
        >
          Start Typing
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
