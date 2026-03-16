import { Result } from '../types';
import { Trophy, Target, CheckCircle, XCircle, MinusCircle } from 'lucide-react';

interface ResultsPageProps {
  result: Result;
  onReviewAnswers: () => void;
  onRestartExam: () => void;
}

export const ResultsPage = ({ result, onReviewAnswers, onRestartExam }: ResultsPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Exam Completed!</h1>
            <p className="text-gray-600">UPSC Prelims 2021 - General Studies Paper 1</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {result.totalScore}
              </div>
              <div className="text-sm text-gray-600">Total Score</div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-600 mb-1">
                {result.accuracy.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {result.correctCount + result.incorrectCount}
              </div>
              <div className="text-sm text-gray-600">Attempted</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-semibold text-green-700">{result.correctCount}</div>
                <div className="text-sm text-green-600">Correct</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
              <div>
                <div className="font-semibold text-red-700">{result.incorrectCount}</div>
                <div className="text-sm text-red-600">Incorrect</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <MinusCircle className="w-6 h-6 text-gray-600" />
              <div>
                <div className="font-semibold text-gray-700">{result.unattemptedCount}</div>
                <div className="text-sm text-gray-600">Unattempted</div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Topic-wise Analysis</h2>
            <div className="space-y-3">
              {result.topicWise.map((topic) => (
                <div key={topic.topic} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">{topic.topic}</h3>
                    <span className="text-sm text-gray-500">
                      {topic.correct + topic.incorrect}/{topic.total} attempted
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-600">✓ {topic.correct}</span>
                    <span className="text-red-600">✗ {topic.incorrect}</span>
                    <span className="text-gray-500">− {topic.unattempted}</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-green-500 h-full"
                      style={{
                        width: `${topic.total > 0 ? (topic.correct / topic.total) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={onReviewAnswers}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Review Answers
            </button>
            <button
              onClick={onRestartExam}
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Restart Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
