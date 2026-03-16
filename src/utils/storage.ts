import { ExamState, UserResponse } from '../types';

const STORAGE_KEY = 'upsc_exam_state';

export const saveExamState = (state: ExamState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving exam state:', error);
  }
};

export const loadExamState = (): ExamState | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading exam state:', error);
    return null;
  }
};

export const clearExamState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing exam state:', error);
  }
};

export const initializeExamState = (totalQuestions: number): ExamState => {
  const responses: UserResponse[] = Array.from({ length: totalQuestions }, (_, i) => ({
    questionId: i + 1,
    isMarkedForReview: false,
    isVisited: false,
  }));

  return {
    currentQuestionIndex: 0,
    responses,
    timeRemaining: 120 * 60,
    isSubmitted: false,
    startTime: Date.now(),
  };
};
