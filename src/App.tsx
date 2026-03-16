import { useState, useEffect, useCallback } from 'react';
import { Menu } from 'lucide-react';
import { questions } from './data/questions';
import { ExamState, Result } from './types';
import { saveExamState, loadExamState, clearExamState, initializeExamState } from './utils/storage';
import { calculateResults } from './utils/scoring';
import { Timer } from './components/Timer';
import { QuestionPalette } from './components/QuestionPalette';
import { QuestionDisplay } from './components/QuestionDisplay';
import { NavigationControls } from './components/NavigationControls';
import { ResultsPage } from './components/ResultsPage';
import { ReviewMode } from './components/ReviewMode';
import { SubmitModal } from './components/SubmitModal';

type AppMode = 'exam' | 'results' | 'review';

function App() {
  const [examState, setExamState] = useState<ExamState>(() => {
    const saved = loadExamState();
    return saved || initializeExamState(questions.length);
  });
  const [mode, setMode] = useState<AppMode>('exam');
  const [result, setResult] = useState<Result | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);

  useEffect(() => {
    if (mode === 'exam') {
      saveExamState(examState);
    }
  }, [examState, mode]);

  const currentQuestion = questions[examState.currentQuestionIndex];
  const currentResponse = examState.responses[examState.currentQuestionIndex];

  const handleAnswerSelect = (answer: 'A' | 'B' | 'C' | 'D') => {
    setExamState((prev) => {
      const newResponses = [...prev.responses];
      newResponses[prev.currentQuestionIndex] = {
        ...newResponses[prev.currentQuestionIndex],
        selectedAnswer: answer,
        isVisited: true,
      };
      return { ...prev, responses: newResponses };
    });
  };

  const handleClearResponse = () => {
    setExamState((prev) => {
      const newResponses = [...prev.responses];
      newResponses[prev.currentQuestionIndex] = {
        ...newResponses[prev.currentQuestionIndex],
        selectedAnswer: undefined,
      };
      return { ...prev, responses: newResponses };
    });
  };

  const handleMarkForReview = () => {
    setExamState((prev) => {
      const newResponses = [...prev.responses];
      newResponses[prev.currentQuestionIndex] = {
        ...newResponses[prev.currentQuestionIndex],
        isMarkedForReview: !newResponses[prev.currentQuestionIndex].isMarkedForReview,
        isVisited: true,
      };
      return { ...prev, responses: newResponses };
    });
  };

  const handleSaveAndNext = () => {
    setExamState((prev) => {
      const newResponses = [...prev.responses];
      newResponses[prev.currentQuestionIndex] = {
        ...newResponses[prev.currentQuestionIndex],
        isVisited: true,
      };

      const nextIndex = prev.currentQuestionIndex < questions.length - 1
        ? prev.currentQuestionIndex + 1
        : prev.currentQuestionIndex;

      if (nextIndex !== prev.currentQuestionIndex) {
        newResponses[nextIndex] = {
          ...newResponses[nextIndex],
          isVisited: true,
        };
      }

      return {
        ...prev,
        responses: newResponses,
        currentQuestionIndex: nextIndex,
      };
    });
  };

  const handlePrevious = () => {
    if (examState.currentQuestionIndex > 0) {
      setExamState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  };

  const handleNext = () => {
    if (examState.currentQuestionIndex < questions.length - 1) {
      setExamState((prev) => {
        const newResponses = [...prev.responses];
        newResponses[prev.currentQuestionIndex + 1] = {
          ...newResponses[prev.currentQuestionIndex + 1],
          isVisited: true,
        };
        return {
          ...prev,
          responses: newResponses,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        };
      });
    }
  };

  const handleQuestionSelect = (index: number) => {
    setExamState((prev) => {
      const newResponses = [...prev.responses];
      newResponses[index] = {
        ...newResponses[index],
        isVisited: true,
      };
      return {
        ...prev,
        responses: newResponses,
        currentQuestionIndex: index,
      };
    });
  };

  const handleTimerTick = useCallback((newTime: number) => {
    setExamState((prev) => ({ ...prev, timeRemaining: newTime }));
  }, []);

  const handleTimeUp = useCallback(() => {
    handleSubmitExam();
  }, []);

  const handleSubmitExam = () => {
    const calculatedResult = calculateResults(questions, examState.responses);
    setResult(calculatedResult);
    setMode('results');
    setShowSubmitModal(false);
    clearExamState();
  };

  const handleRestartExam = () => {
    setExamState(initializeExamState(questions.length));
    setResult(null);
    setMode('exam');
  };

  const answeredCount = examState.responses.filter((r) => r.selectedAnswer).length;

  if (mode === 'review' && result) {
    return <ReviewMode questions={questions} responses={examState.responses} onBack={() => setMode('results')} />;
  }

  if (mode === 'results' && result) {
    return (
      <ResultsPage
        result={result}
        onReviewAnswers={() => setMode('review')}
        onRestartExam={handleRestartExam}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg z-20">
        <div className="px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={() => setIsMobilePaletteOpen(true)}
              className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold">UPSC Civil Services Preliminary Examination 2021</h1>
              <p className="text-blue-200 text-sm">General Studies - Paper 1</p>
            </div>

            <Timer timeRemaining={examState.timeRemaining} onTick={handleTimerTick} onTimeUp={handleTimeUp} />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            <div className="mb-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Question {examState.currentQuestionIndex + 1} of {questions.length}
              </div>
              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
              >
                Submit Exam
              </button>
            </div>

            <QuestionDisplay
              question={currentQuestion}
              response={currentResponse}
              onAnswerSelect={handleAnswerSelect}
              questionNumber={examState.currentQuestionIndex + 1}
            />
          </div>
        </main>

        <aside className="w-80 hidden lg:block">
          <QuestionPalette
            responses={examState.responses}
            currentQuestionIndex={examState.currentQuestionIndex}
            onQuestionSelect={handleQuestionSelect}
          />
        </aside>

        <QuestionPalette
          responses={examState.responses}
          currentQuestionIndex={examState.currentQuestionIndex}
          onQuestionSelect={handleQuestionSelect}
          isMobileOpen={isMobilePaletteOpen}
          onMobileClose={() => setIsMobilePaletteOpen(false)}
        />
      </div>

      <NavigationControls
        currentIndex={examState.currentQuestionIndex}
        totalQuestions={questions.length}
        isMarkedForReview={currentResponse.isMarkedForReview}
        hasAnswer={!!currentResponse.selectedAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onClearResponse={handleClearResponse}
        onMarkForReview={handleMarkForReview}
        onSaveAndNext={handleSaveAndNext}
      />

      <SubmitModal
        isOpen={showSubmitModal}
        answeredCount={answeredCount}
        totalQuestions={questions.length}
        onConfirm={handleSubmitExam}
        onCancel={() => setShowSubmitModal(false)}
      />
    </div>
  );
}

export default App;
