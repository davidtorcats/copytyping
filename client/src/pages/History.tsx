import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { History as HistoryIcon, Calendar, Zap, Target, Clock, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Footer from '@/components/Footer';

interface PracticeSession {
  letterId: number;
  letterTitle: string;
  letterAuthor: string;
  wpm: number;
  accuracy: number;
  errors: number;
  time: number;
  words: number;
  completedAt: string;
}

export default function History() {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('practiceHistory') || '[]');
    setSessions(history);
  }, []);

  const handleDeleteSession = (index: number) => {
    const updatedSessions = sessions.filter((_, i) => i !== index);
    setSessions(updatedSessions);
    localStorage.setItem('practiceHistory', JSON.stringify(updatedSessions));
    toast.success('Session deleted successfully');
  };

  const handleDeleteAllHistory = () => {
    if (window.confirm('Are you sure you want to delete all your practice history? This action cannot be undone.')) {
      setSessions([]);
      localStorage.setItem('practiceHistory', JSON.stringify([]));
      toast.success('All history deleted successfully');
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return 'text-[oklch(0.68_0.19_160)]';
    if (accuracy >= 85) return 'text-[oklch(0.65_0.25_45)]';
    return 'text-[oklch(0.62_0.24_25)]';
  };

  const getWPMColor = (wpm: number) => {
    if (wpm >= 60) return 'text-[oklch(0.68_0.19_160)]';
    if (wpm >= 40) return 'text-[oklch(0.65_0.25_45)]';
    return 'text-muted-foreground';
  };

  if (sessions.length === 0) {
    return (
      <div className="page-transition min-h-screen flex flex-col bg-background text-foreground">

        
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-6">
              <HistoryIcon size={48} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No Practice History Yet</h2>
            <p className="text-muted-foreground mb-6">
              Complete your first typing session to see your progress and statistics here.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Calculate overall stats
  const totalSessions = sessions.length;
  const avgWPM = Math.round(sessions.reduce((sum, s) => sum + s.wpm, 0) / totalSessions);
  const avgAccuracy = (sessions.reduce((sum, s) => sum + s.accuracy, 0) / totalSessions).toFixed(1);
  const totalWords = sessions.reduce((sum, s) => sum + s.words, 0);

  return (
    <div className="page-transition min-h-screen flex flex-col bg-background text-foreground">

      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice History</h1>
          <p className="text-muted-foreground">Track your typing progress and performance over time</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Sessions</div>
            <div className="text-3xl font-bold text-primary">{totalSessions}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Avg WPM</div>
            <div className={`text-3xl font-bold ${getWPMColor(avgWPM)}`}>{avgWPM}</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Avg Accuracy</div>
            <div className={`text-3xl font-bold ${getAccuracyColor(Number(avgAccuracy))}`}>{avgAccuracy}%</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Words</div>
            <div className="text-3xl font-bold text-foreground">{totalWords.toLocaleString()}</div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recent Sessions</h2>
            <Button
              variant="destructive"
              onClick={handleDeleteAllHistory}
              className="gap-2"
            >
              <Trash2 size={16} />
              Delete All History
            </Button>
          </div>
          
          {sessions.map((session, index) => (
            <div 
              key={index}
              className="relative bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteSession(index)}
                  className="absolute top-4 right-4 p-2 hover:bg-destructive/10 rounded-lg transition-colors group"
                  title="Delete session"
                >
                  <Trash2 size={16} className="text-muted-foreground group-hover:text-destructive" />
                </button>
                {/* Left: Letter Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{session.letterTitle}</h3>
                  <p className="text-sm text-muted-foreground mb-3">by {session.letterAuthor}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>{formatDate(session.completedAt)}</span>
                  </div>
                </div>

                {/* Right: Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-background border border-border rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                      <Zap size={12} />
                      <span>WPM</span>
                    </div>
                    <div className={`text-2xl font-bold ${getWPMColor(session.wpm)}`}>
                      {session.wpm}
                    </div>
                  </div>
                  
                  <div className="bg-background border border-border rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                      <Target size={12} />
                      <span>Accuracy</span>
                    </div>
                    <div className={`text-2xl font-bold ${getAccuracyColor(session.accuracy)}`}>
                      {session.accuracy}%
                    </div>
                  </div>
                  
                  <div className="bg-background border border-border rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                      <Clock size={12} />
                      <span>Time</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {formatTime(session.time)}
                    </div>
                  </div>
                  
                  <div className="bg-background border border-border rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                      <FileText size={12} />
                      <span>Words</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {session.words}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
