import { Question, UserResponse } from '../types';

interface QuestionDisplayProps {
  question: Question;
  response: UserResponse;
  onAnswerSelect: (answer: 'A' | 'B' | 'C' | 'D') => void;
  questionNumber: number;
}

export const QuestionDisplay = ({
  question,
  response,
  onAnswerSelect,
  questionNumber,
}: QuestionDisplayProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 bg-blue-600 text-white px-3 py-1 rounded-md font-semibold">
            Q{questionNumber}
          </span>
          <p className="text-gray-800 text-lg leading-relaxed">{question.text}</p>
        </div>
      </div>

      <div className="space-y-3">
        {(['A', 'B', 'C', 'D'] as const).map((option) => (
          <label
            key={option}
            className={`
              flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer
              transition-all duration-200
              ${
                response.selectedAnswer === option
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }
            `}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={response.selectedAnswer === option}
              onChange={() => onAnswerSelect(option)}
              className="mt-1 w-4 h-4 text-blue-600 cursor-pointer"
            />
            <div className="flex-1">
              <span className="font-semibold text-gray-700 mr-2">{option}.</span>
              <span className="text-gray-800">{question.options[option]}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
