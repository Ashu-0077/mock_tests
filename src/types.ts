export type QuestionStatus = 'not-visited' | 'answered' | 'not-answered' | 'marked-review';

export type Topic = 'Polity' | 'History' | 'Economy' | 'Geography' | 'Science' | 'Environment';

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
  currentQuestionIndex: number;
  responses: UserResponse[];
  timeRemaining: number;
  isSubmitted: boolean;
  startTime: number;
}

export interface Result {
  totalScore: number;
  accuracy: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  topicWise: {
    topic: Topic;
    correct: number;
    incorrect: number;
    unattempted: number;
    total: number;
  }[];
}
