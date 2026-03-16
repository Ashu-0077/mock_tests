import { UserResponse } from '../types';
import { getQuestionStatus } from '../utils/scoring';
import { X } from 'lucide-react';

interface QuestionPaletteProps {
  responses: UserResponse[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const QuestionPalette = ({
  responses,
  currentQuestionIndex,
  onQuestionSelect,
  isMobileOpen = false,
  onMobileClose,
}: QuestionPaletteProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-500 text-white';
      case 'marked-review':
        return 'bg-purple-500 text-white';
      case 'not-answered':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const content = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">Question Palette</h3>
        {onMobileClose && (
          <button onClick={onMobileClose} className="lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="grid grid-cols-5 gap-2 mb-6">
          {responses.map((response, index) => {
            const status = getQuestionStatus(response);
            const isCurrent = index === currentQuestionIndex;

            return (
              <button
                key={response.questionId}
                onClick={() => {
                  onQuestionSelect(index);
                  onMobileClose?.();
                }}
                className={`
                  w-10 h-10 rounded-lg font-semibold text-sm
                  transition-all duration-200
                  ${getStatusColor(status)}
                  ${isCurrent ? 'ring-4 ring-blue-400 scale-110' : 'hover:scale-105'}
                `}
              >
                {response.questionId}
              </button>
            );
          })}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-500"></div>
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-500"></div>
            <span>Not Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-purple-500"></div>
            <span>Marked for Review</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-300"></div>
            <span>Not Visited</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block bg-white border-l border-gray-200 h-full">
        {content}
      </div>

      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onMobileClose}>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            {content}
          </div>
        </div>
      )}
    </>
  );
};
