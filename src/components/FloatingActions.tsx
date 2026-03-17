import { Save, Bookmark, Menu } from 'lucide-react';

interface FloatingActionsProps {
  onSaveAndNext: () => void;
  onMarkForReview: () => void;
  isMarkedForReview: boolean;
  onTogglePalette?: () => void;
  hasAnswer: boolean;
}

export const FloatingActions = ({
  onSaveAndNext,
  onMarkForReview,
  isMarkedForReview,
  onTogglePalette,
  hasAnswer,
}: FloatingActionsProps) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30 lg:hidden">
      {onTogglePalette && (
        <button
          onClick={onTogglePalette}
          className="p-4 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transition-all hover:scale-110 border border-slate-600/50"
          title="Toggle question palette"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      <button
        onClick={onMarkForReview}
        className={`p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 border transition-colors flex items-center justify-center ${
          isMarkedForReview
            ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-purple-500/30 border-purple-500/50 hover:shadow-purple-500/40'
            : 'bg-gradient-to-br from-slate-700 to-slate-800 text-slate-400 border-slate-600/50 hover:text-purple-400'
        }`}
        title={isMarkedForReview ? 'Unmark for review' : 'Mark for review'}
      >
        <Bookmark className="w-5 h-5" />
      </button>

      <button
        onClick={onSaveAndNext}
        disabled={!hasAnswer && !isMarkedForReview}
        className="p-4 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-110 transition-all border border-cyan-500/50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        title="Save and next question"
      >
        <Save className="w-5 h-5" />
      </button>
    </div>
  );
};
