import { Question, UserResponse } from '../types';
import { CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';

interface ReviewModeProps {
  questions: Question[];
  responses: UserResponse[];
  onBack: () => void;
}

export const ReviewMode = ({ questions, responses, onBack }: ReviewModeProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Results
          </button>
          <h1 className="text-xl font-bold text-gray-800">Answer Review</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {questions.map((question, index) => {
            const response = responses[index];
            const isCorrect = response.selectedAnswer === question.correctAnswer;
            const isUnattempted = !response.selectedAnswer;

            return (
              <div key={question.id} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-l-blue-600">
                <div className="flex items-start gap-3 mb-4">
                  <span className="flex-shrink-0 bg-blue-600 text-white px-3 py-1 rounded-md font-semibold">
                    Q{question.id}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-800 text-lg mb-3">{question.text}</p>

                    {question.isDropped && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm text-yellow-700 font-medium">
                          This question was dropped in the official answer key (0 marks awarded to all)
                        </span>
                      </div>
                    )}

                    <div className="space-y-2 mb-4">
                      {(['A', 'B', 'C', 'D'] as const).map((option) => {
                        const isUserAnswer = response.selectedAnswer === option;
                        const isCorrectAnswer = question.correctAnswer === option;

                        let borderColor = 'border-gray-200';
                        let bgColor = 'bg-white';
                        let icon = null;

                        if (isCorrectAnswer) {
                          borderColor = 'border-green-500';
                          bgColor = 'bg-green-50';
                          icon = <CheckCircle className="w-5 h-5 text-green-600" />;
                        }

                        if (isUserAnswer && !isCorrect && !isUnattempted) {
                          borderColor = 'border-red-500';
                          bgColor = 'bg-red-50';
                          icon = <XCircle className="w-5 h-5 text-red-600" />;
                        }

                        return (
                          <div
                            key={option}
                            className={`flex items-start gap-3 p-3 rounded-lg border-2 ${borderColor} ${bgColor}`}
                          >
                            <div className="flex-1">
                              <span className="font-semibold text-gray-700 mr-2">{option}.</span>
                              <span className="text-gray-800">{question.options[option]}</span>
                            </div>
                            {icon}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-600">Your Answer:</span>
                        <span className={`font-semibold ${
                          isUnattempted ? 'text-gray-500' : isCorrect ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isUnattempted ? 'Not Attempted' : response.selectedAnswer}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-600">Correct Answer:</span>
                        <span className="font-semibold text-green-600">{question.correctAnswer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-600">Topic:</span>
                        <span className="text-blue-600 font-medium">{question.topic}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                      <p className="text-gray-700 leading-relaxed">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
