import { useState, useEffect, useCallback, useRef } from 'react';
import { getAllQuestionsForExam } from './data/questions';
import { getExamConfig, examRegistry } from './data/exams';
import { ExamState, Result, ExamAttempt, ExamConfig } from './types';
import {
  saveExamState,
  loadExamState,
  clearExamState,
  initializeExamState,
  saveExamAttempt,
  getRecentAttempts,
} from './utils/storage';
import { calculateResults } from './utils/scoring';
import { LandingHub } from './components/LandingHub';
import { CircularTimer } from './components/CircularTimer';
import { QuestionDisplay } from './components/QuestionDisplay';
import { BubblePalette } from './components/BubblePalette';
import { NavigationControls } from './components/NavigationControls';
import { FloatingActions } from './components/FloatingActions';
import { SubmitModal } from './components/SubmitModal';
import { ModernResultsDashboard } from './components/ModernResultsDashboard';
import { ReviewMode } from './components/ReviewMode';

type AppMode = 'landing' | 'exam' | 'results' | 'review';

function AppNew() {
  const [mode, setMode] = useState<AppMode>('landing');
  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [examState, setExamState] = useState<ExamState | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);
  const [recentAttempts, setRecentAttempts] = useState<ExamAttempt[]>([]);
  const autoSaveInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setRecentAttempts(getRecentAttempts());
  }, []);

  useEffect(() => {
    if (mode === 'exam' && examState) {
      const interval = setInterval(() => {
        saveExamState(examState);
      }, 10000);

      autoSaveInterval.current = interval;
      return () => clearInterval(interval);
    }
  }, [mode, examState]);


  const handleSelectExam = (examId: string) => {
    const examConfig = getExamConfig(examId);
    if (!examConfig) return;

    const savedState = loadExamState(examId);
    const questions = getAllQuestionsForExam(examId);

    if (savedState && savedState.responses.length === questions.length) {
      setExamState(savedState);
    } else {
      setExamState(initializeExamState(examId, questions.length, examConfig.duration));
    }

    setSelectedExamId(examId);
    setMode('exam');
    setIsMobilePaletteOpen(false);
  };

  const handleTimerTick = useCallback((newTime: number) => {
    setExamState((prev) => (prev ? { ...prev, timeRemaining: newTime } : null));
  }, []);

  const handleTimeUp = useCallback(() => {
    handleSubmitExam();
  }, []);
  useEffect(() => {
    let timer: number;

    if (mode === 'exam' && examState && examState.timeRemaining > 0) {
      timer = window.setInterval(() => {
        handleTimerTick(examState.timeRemaining - 1);
      }, 1000);
    } else if (mode === 'exam' && examState?.timeRemaining === 0) {
      handleTimeUp();
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [mode, examState?.timeRemaining, handleTimerTick, handleTimeUp]);

  const handleAnswerSelect = (answer: 'A' | 'B' | 'C' | 'D') => {
    if (!examState) return;
    setExamState((prev) => {
      if (!prev) return null;
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
    if (!examState) return;
    setExamState((prev) => {
      if (!prev) return null;
      const newResponses = [...prev.responses];
      newResponses[prev.currentQuestionIndex] = {
        ...newResponses[prev.currentQuestionIndex],
        selectedAnswer: undefined,
      };
      return { ...prev, responses: newResponses };
    });
  };

  const handleMarkForReview = () => {
    if (!examState) return;
    setExamState((prev) => {
      if (!prev) return null;
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
    if (!examState) return;
    setExamState((prev) => {
      if (!prev) return null;
      const questions = getAllQuestionsForExam(prev.examId);
      const newResponses = [...prev.responses];
      newResponses[prev.currentQuestionIndex] = {
        ...newResponses[prev.currentQuestionIndex],
        isVisited: true,
      };

      const nextIndex =
        prev.currentQuestionIndex < questions.length - 1 ? prev.currentQuestionIndex + 1 : prev.currentQuestionIndex;

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
    if (!examState || examState.currentQuestionIndex === 0) return;
    setExamState((prev) => (prev ? { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 } : null));
  };

  const handleNext = () => {
    if (!examState) return;
    const questions = getAllQuestionsForExam(examState.examId);
    if (examState.currentQuestionIndex >= questions.length - 1) return;

    setExamState((prev) => {
      if (!prev) return null;
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
  };

  const handleQuestionSelect = (index: number) => {
    if (!examState) return;
    setExamState((prev) => {
      if (!prev) return null;
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

  const handleSubmitExam = () => {
    if (!examState) return;
    const questions = getAllQuestionsForExam(examState.examId);
    const calculatedResult = calculateResults(questions, examState.responses);
    const examConfig = getExamConfig(examState.examId);

    const attempt: ExamAttempt = {
      id: `${examState.examId}_${Date.now()}`,
      examId: examState.examId,
      examTitle: examConfig?.title || '',
      score: calculatedResult.totalScore,
      accuracy: calculatedResult.accuracy,
      attemptedAt: Date.now(),
    };

    saveExamAttempt(attempt);
    setResult({ ...calculatedResult, examId: examState.examId, completedAt: Date.now() });
    setMode('results');
    setShowSubmitModal(false);
    clearExamState(examState.examId);
  };

  const handleRestartExam = () => {
    if (!selectedExamId) return;
    const examConfig = getExamConfig(selectedExamId);
    if (!examConfig) return;
    const questions = getAllQuestionsForExam(selectedExamId);
    setExamState(initializeExamState(selectedExamId, questions.length, examConfig.duration));
    setResult(null);
    setMode('exam');
  };

  if (mode === 'landing') {
    return <LandingHub onSelectExam={handleSelectExam} recentAttempts={recentAttempts} />;
  }

  if (!examState) {
    return null;
  }

  const questions = getAllQuestionsForExam(examState.examId);
  const examConfig = getExamConfig(examState.examId);
  const currentQuestion = questions[examState.currentQuestionIndex];
  const currentResponse = examState.responses[examState.currentQuestionIndex];
  const answeredCount = examState.responses.filter((r) => r.selectedAnswer).length;

  if (mode === 'review' && result) {
    return <ReviewMode questions={questions} responses={examState.responses} onBack={() => setMode('results')} />;
  }

  if (mode === 'results' && result) {
    return (
      <ModernResultsDashboard
        result={result}
        onReviewAnswers={() => setMode('review')}
        onRestartExam={handleRestartExam}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="sticky top-0 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-md border-b border-slate-700/50 z-20">
        <div className="px-4 py-4 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-white">{examConfig?.title}</h1>
            <p className="text-slate-400 text-sm">Question {examState.currentQuestionIndex + 1} of {questions.length}</p>
          </div>

          <div className="flex items-center gap-6">
            <CircularTimer
              timeRemaining={examState.timeRemaining}
              totalTime={examConfig?.duration ? examConfig.duration * 60 : 7200}
              onTimeUp={handleTimeUp}
            />

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-500/30 whitespace-nowrap"
            >
              Submit
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            {currentQuestion && (
              <QuestionDisplay
                question={currentQuestion}
                response={currentResponse}
                onAnswerSelect={handleAnswerSelect}
                questionNumber={examState.currentQuestionIndex + 1}
              />
            )}
          </div>
        </main>

        <BubblePalette
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

      <FloatingActions
        onSaveAndNext={handleSaveAndNext}
        onMarkForReview={handleMarkForReview}
        isMarkedForReview={currentResponse.isMarkedForReview}
        hasAnswer={!!currentResponse.selectedAnswer}
        onTogglePalette={() => setIsMobilePaletteOpen(!isMobilePaletteOpen)}
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

export default AppNew;
