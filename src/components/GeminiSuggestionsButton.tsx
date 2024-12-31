import React from 'react';
import { Wand2 } from 'lucide-react';
import { useGeminiSuggestions } from '../hooks/useGeminiSuggestions';

const GeminiSuggestionsButton: React.FC = () => {
  const { getSuggestions, loading, error } = useGeminiSuggestions();

  return (
    <div>
      <button
        onClick={getSuggestions}
        disabled={loading}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-300 transition-colors shadow-sm flex items-center gap-2"
      >
        <Wand2 className="w-5 h-5" />
        {loading ? 'Generating...' : 'AI Suggestions'}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-600" />
          {error}
        </p>
      )}
    </div>
  );
}

export default GeminiSuggestionsButton;