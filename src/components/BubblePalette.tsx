import { UserResponse } from '../types';
import { getQuestionStatus } from '../utils/scoring';
import { X } from 'lucide-react';

interface BubblePaletteProps {
  responses: UserResponse[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const BubblePalette = ({
  responses,
  currentQuestionIndex,
  onQuestionSelect,
  isMobileOpen,
  onMobileClose,
}: BubblePaletteProps) => {
  const getStatusColor = (status: string, isCurrentQuestion: boolean) => {
    if (isCurrentQuestion) return 'ring-2 ring-cyan-400 bg-cyan-500/30';
    switch (status) {
      case 'answered':
        return 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30';
      case 'marked-review':
        return 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30';
      case 'not-answered':
        return 'bg-red-500/20 text-red-300 hover:bg-red-500/30';
      default:
        return 'bg-slate-600/20 text-slate-400 hover:bg-slate-600/30';
    }
  };

  const mobileClass = isMobileOpen
    ? 'translate-x-0'
    : '-translate-x-full md:translate-x-0';

  const content = (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-4 pt-4">
        <h3 className="font-semibold text-white">Questions</h3>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="md:hidden p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-5 md:grid-cols-4 gap-2 px-4 pb-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {responses.map((response, index) => {
          const status = getQuestionStatus(response);
          const isCurrentQuestion = index === currentQuestionIndex;

          return (
            <button
              key={response.questionId}
              onClick={() => {
                onQuestionSelect(index);
                onMobileClose?.();
              }}
              className={`aspect-square flex items-center justify-center rounded-full font-semibold text-sm transition-all ${getStatusColor(
                status,
                isCurrentQuestion
              )}`}
              title={`Q${response.questionId} - ${status}`}
            >
              {response.questionId}
            </button>
          );
        })}
      </div>

      <div className="border-t border-slate-700/50 px-4 py-3 text-xs space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500/30"></div>
          <span className="text-slate-300">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500/30"></div>
          <span className="text-slate-300">Marked for Review</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
          <span className="text-slate-300">Not Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-600/30"></div>
          <span className="text-slate-300">Not Visited</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-slate-800 to-slate-900 border-l border-slate-700/50">
        {content}
      </aside>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={onMobileClose}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700/50 md:hidden transition-transform duration-300 z-40 ${mobileClass}`}
      >
        {content}
      </div>
    </>
  );
};
