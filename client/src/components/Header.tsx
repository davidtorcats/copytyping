import { Home, Zap, History, Sun, Moon } from 'lucide-react';
import { useLocation } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const [location, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };

  return (
    <header className="h-16 bg-[oklch(0.16_0.03_255)] border-b border-border sticky top-0 z-50">
      <div className="container h-full flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setLocation('/')}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-white font-bold text-xl">CopyTyping</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <button
            onClick={() => setLocation('/')}
            className={`flex items-center gap-2 transition-colors duration-200 ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Home size={18} />
            <span className="text-sm font-medium">Home</span>
          </button>
          <button
            onClick={() => setLocation('/practice')}
            className={`flex items-center gap-2 transition-colors duration-200 ${
              isActive('/practice') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Zap size={18} />
            <span className="text-sm font-medium">Practice</span>
          </button>
          <button
            onClick={() => setLocation('/history')}
            className={`flex items-center gap-2 transition-colors duration-200 ${
              isActive('/history') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <History size={18} />
            <span className="text-sm font-medium">History</span>
          </button>
        </nav>

        {/* Theme Toggle */}
        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-card border border-border hover:bg-[oklch(0.20_0.03_255)] transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-primary" />
            ) : (
              <Moon size={20} className="text-primary" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
