export interface Question {
  id: number;
  topic: 'water_cycle' | 'ai_ethics';
  topicName: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, or 3
  explanation: string;
}

export interface UserAnswer {
  questionId: number;
  questionText: string;
  selectedOptionIndex: number;
  selectedOptionText: string;
  correctOptionIndex: number;
  correctOptionText: string;
  isCorrect: boolean;
  explanation: string;
}

export interface GameResultPayload {
  timestamp: string;
  name: string;
  className: string;
  correct: number;
  total: number;
  score: number; // Max 10 points
  wrongList: string; // Formatted or JSON string of wrong questions
  needSupport: boolean;
  comment: string;
}

export interface StoredResult extends GameResultPayload {
  id: string;
}

export type GameScreen = 'START' | 'PLAYING' | 'RESULT';
