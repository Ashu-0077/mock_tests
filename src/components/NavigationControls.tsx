import { ChevronLeft, ChevronRight, X, Bookmark, Save } from 'lucide-react';

interface NavigationControlsProps {
  currentIndex: number;
  totalQuestions: number;
  isMarkedForReview: boolean;
  hasAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onClearResponse: () => void;
  onMarkForReview: () => void;
  onSaveAndNext: () => void;
}

export const NavigationControls = ({
  currentIndex,
  totalQuestions,
  isMarkedForReview,
  hasAnswer,
  onPrevious,
  onNext,
  onClearResponse,
  onMarkForReview,
  onSaveAndNext,
}: NavigationControlsProps) => {
  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-4xl mx-auto flex flex-wrap gap-3 justify-between">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onClearResponse}
            disabled={!hasAnswer}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear Response
          </button>

          <button
            onClick={onMarkForReview}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isMarkedForReview
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            {isMarkedForReview ? 'Marked' : 'Mark for Review'}
          </button>

          <button
            onClick={onSaveAndNext}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save & Next
          </button>
        </div>

        <button
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
