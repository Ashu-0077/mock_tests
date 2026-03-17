import { ExamConfig } from '../types';

export const examRegistry: ExamConfig[] = [
  {
    id: 'upsc-2021',
    title: 'UPSC Civil Services Preliminary 2021',
    category: 'upsc',
    year: 2021,
    duration: 120,
    marking: {
      correct: 2,
      wrong: -0.666,
    },
    totalQuestions: 100,
  },
  {
    id: 'upsc-2022',
    title: 'UPSC Civil Services Preliminary 2022',
    category: 'upsc',
    year: 2022,
    duration: 120,
    marking: {
      correct: 2,
      wrong: -0.666,
    },
    totalQuestions: 100,
  },
  {
    id: 'cuet-2023',
    title: 'CUET (UG) 2023 - General Test',
    category: 'cuet',
    year: 2023,
    duration: 60,
    marking: {
      correct: 4,
      wrong: -1,
    },
    totalQuestions: 75,
  },
  {
    id: 'ssc-cgl-2023',
    title: 'SSC CGL Tier 1 2023',
    category: 'ssc',
    year: 2023,
    duration: 60,
    marking: {
      correct: 2,
      wrong: -0.5,
    },
    totalQuestions: 100,
  },
  {
    id: 'neet-2023',
    title: 'NEET UG 2023',
    category: 'neet',
    year: 2023,
    duration: 180,
    marking: {
      correct: 4,
      wrong: -1,
    },
    totalQuestions: 180,
  },
];

export const getExamConfig = (examId: string): ExamConfig | undefined => {
  return examRegistry.find((exam) => exam.id === examId);
};

export const getExamsByCategory = (category: string) => {
  return examRegistry.filter((exam) => exam.category === category);
};

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    upsc: 'UPSC Civil Services',
    cuet: 'CUET (UG)',
    ssc: 'SSC Exams',
    neet: 'NEET',
  };
  return labels[category] || category;
};
