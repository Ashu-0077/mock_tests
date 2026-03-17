import { ExamState, UserResponse, ExamAttempt } from '../types';

const getExamStateKey = (examId: string) => `exam_state_${examId}`;
const ATTEMPTS_KEY = 'exam_attempts';

export const saveExamState = (state: ExamState): void => {
  try {
    localStorage.setItem(getExamStateKey(state.examId), JSON.stringify(state));
  } catch (error) {
    console.error('Error saving exam state:', error);
  }
};

export const loadExamState = (examId: string): ExamState | null => {
  try {
    const data = localStorage.getItem(getExamStateKey(examId));
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading exam state:', error);
    return null;
  }
};

export const clearExamState = (examId: string): void => {
  try {
    localStorage.removeItem(getExamStateKey(examId));
  } catch (error) {
    console.error('Error clearing exam state:', error);
  }
};

export const initializeExamState = (examId: string, totalQuestions: number, duration: number): ExamState => {
  const responses: UserResponse[] = Array.from({ length: totalQuestions }, (_, i) => ({
    questionId: i + 1,
    isMarkedForReview: false,
    isVisited: false,
  }));

  return {
    examId,
    currentQuestionIndex: 0,
    responses,
    timeRemaining: duration * 60,
    isSubmitted: false,
    startTime: Date.now(),
  };
};

export const saveExamAttempt = (attempt: ExamAttempt): void => {
  try {
    const attempts = getExamAttempts();
    attempts.push(attempt);
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch (error) {
    console.error('Error saving exam attempt:', error);
  }
};

export const getExamAttempts = (): ExamAttempt[] => {
  try {
    const data = localStorage.getItem(ATTEMPTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading exam attempts:', error);
    return [];
  }
};

export const getRecentAttempts = (limit: number = 5): ExamAttempt[] => {
  const attempts = getExamAttempts();
  return attempts.sort((a, b) => b.attemptedAt - a.attemptedAt).slice(0, limit);
};
