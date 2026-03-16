import { AlertTriangle } from 'lucide-react';

interface SubmitModalProps {
  isOpen: boolean;
  answeredCount: number;
  totalQuestions: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SubmitModal = ({
  isOpen,
  answeredCount,
  totalQuestions,
  onConfirm,
  onCancel,
}: SubmitModalProps) => {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-800">Submit Exam?</h2>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-gray-700">
            Are you sure you want to submit your exam? This action cannot be undone.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Total Questions:</span>
              <span className="font-semibold text-gray-800">{totalQuestions}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Answered:</span>
              <span className="font-semibold text-green-600">{answeredCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Unanswered:</span>
              <span className="font-semibold text-red-600">{unansweredCount}</span>
            </div>
          </div>

          {unansweredCount > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                You have {unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}.
                These will be marked as incorrect.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
};
