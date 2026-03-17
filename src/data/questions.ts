import { Question } from '../types';
import { upsc2021Questions } from './upsc-2021';

// Central mapping for all exams
export const questions: Record<string, Question[]> = {
  'upsc-2021': upsc2021Questions,
  // Add future exams here:
  // 'cuet-pg-2025': cuet2025Questions,
};

export const getAllQuestionsForExam = (examId: string): Question[] => {
  return questions[examId] || [];
};
