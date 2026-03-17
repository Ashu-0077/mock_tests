import { Question, UserResponse, Result, Topic } from '../types';

export const calculateResults = (questions: Question[], responses: UserResponse[]): Result => {
  let totalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const topicWiseMap = new Map<Topic, { correct: number; incorrect: number; unattempted: number; total: number }>();

  questions.forEach((question) => {
    if (!topicWiseMap.has(question.topic)) {
      topicWiseMap.set(question.topic, { correct: 0, incorrect: 0, unattempted: 0, total: 0 });
    }
    const topicData = topicWiseMap.get(question.topic)!;
    topicData.total++;

    const response = responses.find(r => r.questionId === question.id);

    if (question.isDropped) {
      return;
    }

    if (!response?.selectedAnswer) {
      unattemptedCount++;
      topicData.unattempted++;
    } else if (response.selectedAnswer === question.correctAnswer) {
      totalScore += 2.0;
      correctCount++;
      topicData.correct++;
    } else {
      totalScore -= 0.666;
      incorrectCount++;
      topicData.incorrect++;
    }
  });

  const attemptedCount = correctCount + incorrectCount;
  const accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0;

  const topicWise = Array.from(topicWiseMap.entries()).map(([topic, data]) => ({
    topic,
    ...data,
  }));

  return {
    examId: '',
    totalScore: Math.round(totalScore * 100) / 100,
    accuracy: Math.round(accuracy * 100) / 100,
    correctCount,
    incorrectCount,
    unattemptedCount,
    topicWise,
    completedAt: Date.now(),
  };
};

export const getQuestionStatus = (response: UserResponse): 'not-visited' | 'answered' | 'not-answered' | 'marked-review' => {
  if (!response.isVisited) return 'not-visited';
  if (response.isMarkedForReview) return 'marked-review';
  if (response.selectedAnswer) return 'answered';
  return 'not-answered';
};
