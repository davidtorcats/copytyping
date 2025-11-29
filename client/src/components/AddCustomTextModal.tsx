import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddCustomTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customText: {
    title: string;
    author: string;
    text: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    tags: string[];
  }) => void;
}

export default function AddCustomTextModal({
  isOpen,
  onClose,
  onSave,
}: AddCustomTextModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState("");
  const [error, setError] = useState("");

  const existingCategories = [
    'Business', 'Communication', 'Copywriting', 'Economics', 'Finance',
    'France', 'Habits', 'Health', 'Investment', 'Lifestyle', 'Luxury',
    'Marketing', 'Minimalism', 'Opportunity', 'Philosophy', 'Product',
    'Productivity', 'Real Estate', 'Self-Help', 'Simple', 'Stock Market',
    'Strategy', 'Travel', 'Wealth', 'Wellness'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!title.trim()) {
      setError("El título es requerido");
      return;
    }

    if (!text.trim()) {
      setError("El texto es requerido");
      return;
    }

    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount < 50) {
      setError(`El texto debe tener al menos 50 palabras (actualmente: ${wordCount})`);
      return;
    }

    // Guardar
    onSave({
      title: title.trim(),
      author: author.trim() || "Custom",
      text: text.trim(),
      difficulty,
      tags: selectedCategories,
    });

    // Limpiar formulario
    setTitle("");
    setAuthor("");
    setText("");
    setDifficulty("beginner");
    setSelectedCategories([]);
    setCustomCategory("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  const wordCount = text.trim().split(/\s+/).filter(w => w).length;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            Add Custom Text
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-[oklch(0.75_0.15_25)]/20 border border-[oklch(0.75_0.15_25)] text-[oklch(0.45_0.18_25)] dark:bg-red-500/10 dark:border-red-500/50 dark:text-red-500 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter a title for your practice text"
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-foreground mb-2">
              Author (optional)
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter author name (optional)"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-foreground mb-2">
              Difficulty <span className="text-red-500">*</span>
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as "beginner" | "intermediate" | "advanced")}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Categories (select up to 3)
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3 max-h-40 overflow-y-auto p-2 bg-background border border-border rounded-lg">
              {existingCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    if (selectedCategories.includes(category)) {
                      setSelectedCategories(selectedCategories.filter(c => c !== category));
                    } else if (selectedCategories.length < 3) {
                      setSelectedCategories([...selectedCategories, category]);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    selectedCategories.includes(category)
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-primary/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Custom Category Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Add custom category"
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const trimmed = customCategory.trim();
                  if (trimmed && selectedCategories.length < 3 && !selectedCategories.includes(trimmed)) {
                    setSelectedCategories([...selectedCategories, trimmed]);
                    setCustomCategory("");
                  }
                }}
                disabled={!customCategory.trim() || selectedCategories.length >= 3}
                className="bg-transparent"
              >
                Add
              </Button>
            </div>
            
            {/* Selected Categories */}
            {selectedCategories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-md text-sm"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                      className="hover:text-primary-foreground"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Text */}
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-foreground mb-2">
              Practice Text <span className="text-red-500">*</span>
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
              placeholder="Paste or type your custom text here (minimum 50 words)"
            />
            <div className="mt-2 text-sm text-muted-foreground">
              Word count: {wordCount} {wordCount < 50 && `(minimum 50 required)`}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Save & Practice
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
