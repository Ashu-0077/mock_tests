export type QuestionStatus = 'not-visited' | 'answered' | 'not-answered' | 'marked-review';

export type Topic = 'Polity' | 'History' | 'Economy' | 'Geography' | 'Science' | 'Environment';

export type ExamCategory = 'upsc' | 'cuet' | 'ssc' | 'neet';

export interface Question {
  id: number;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  topic: Topic;
  explanation: string;
  isDropped?: boolean;
}

export interface UserResponse {
  questionId: number;
  selectedAnswer?: 'A' | 'B' | 'C' | 'D';
  isMarkedForReview: boolean;
  isVisited: boolean;
}

export interface ExamState {
  examId: string;
  currentQuestionIndex: number;
  responses: UserResponse[];
  timeRemaining: number;
  isSubmitted: boolean;
  startTime: number;
}

export interface ExamConfig {
  id: string;
  title: string;
  category: ExamCategory;
  year: number;
  duration: number;
  marking: {
    correct: number;
    wrong: number;
  };
  totalQuestions: number;
}

export interface Result {
  examId: string;
  totalScore: number;
  accuracy: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  percentile?: number;
  topicWise: {
    topic: Topic;
    correct: number;
    incorrect: number;
    unattempted: number;
    total: number;
  }[];
  completedAt: number;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  accuracy: number;
  attemptedAt: number;
}
