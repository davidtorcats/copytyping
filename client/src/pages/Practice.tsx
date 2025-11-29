import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { salesLetters as defaultSalesLetters } from '@/data/salesLetters';
import LetterCard from '@/components/LetterCard';
import AddCustomTextModal from '@/components/AddCustomTextModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { SalesLetter } from '@/data/salesLetters';

export default function Practice() {
  const [, setLocation] = useLocation();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('alphabetical');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customLetters, setCustomLetters] = useState<SalesLetter[]>([]);
  const [salesLetters, setSalesLetters] = useState<SalesLetter[]>(defaultSalesLetters);

  // Load custom letters from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('customLetters');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCustomLetters(parsed);
        setSalesLetters([...defaultSalesLetters, ...parsed]);
      } catch (e) {
        console.error('Error loading custom letters:', e);
      }
    }
  }, []);

  // Get all unique categories (sorted alphabetically)
  const allCategories = Array.from(
    new Set(salesLetters.flatMap(letter => letter.tags))
  ).sort((a, b) => a.localeCompare(b));

  // Filter letters
  const filteredLetters = salesLetters.filter(letter => {
    const matchesDifficulty = selectedDifficulty === 'all' || letter.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesCategory = selectedCategory === 'all' || letter.tags.includes(selectedCategory);
    return matchesDifficulty && matchesCategory;
  });

  // Sort letters
  const sortedLetters = [...filteredLetters].sort((a, b) => {
    switch (sortBy) {
      case 'longest':
        return b.words - a.words;
      case 'shortest':
        return a.words - b.words;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'newest':
      default:
        return b.id - a.id;
    }
  });

  const handleLetterClick = (letterId: number) => {
    setLocation(`/typing/${letterId}`);
  };

  return (
    <div className="page-transition min-h-screen bg-background text-foreground py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Library</h1>
          <p className="text-muted-foreground">Choose a sales letter to practice with</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">All Categories</option>
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="alphabetical">Alphabetical</option>
            <option value="longest">Longest</option>
            <option value="newest">Newest</option>
            <option value="shortest">Shortest</option>
          </select>

          {/* Add Custom Text Button */}
          <Button
            variant="outline"
            className="gap-2 border-primary/50 hover:border-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Custom Text
          </Button>
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLetters.map(letter => (
            <LetterCard
              key={letter.id}
              letter={letter}
              onClick={() => handleLetterClick(letter.id)}
            />
          ))}
        </div>

        {/* No Results */}
        {sortedLetters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No letters found with the selected filters.</p>
          </div>
        )}
      </div>

      {/* Add Custom Text Modal */}
      <AddCustomTextModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(customText) => {
          const newLetter: SalesLetter = {
            id: Date.now(),
            title: customText.title,
            author: customText.author,
            words: customText.text.split(/\s+/).length,
            wpm: 0,
            difficulty: customText.difficulty,
            tags: customText.tags.length > 0 ? customText.tags : ['Custom'],
            insights: 0,
            preview: customText.text.substring(0, 150) + '...',
            fullText: customText.text,
            isCustom: true,
          };

          const updatedCustomLetters = [...customLetters, newLetter];
          setCustomLetters(updatedCustomLetters);
          setSalesLetters([...defaultSalesLetters, ...updatedCustomLetters]);
          
          // Save to localStorage
          localStorage.setItem('customLetters', JSON.stringify(updatedCustomLetters));
          
          // Navigate to the new letter
          setLocation(`/typing/${newLetter.id}`);
        }}
      />
    </div>
  );
}
