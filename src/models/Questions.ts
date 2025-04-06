export interface Question {
  _id?: string;
  _rev?: string;
  type: 'question';
  pollId: string; // Poll._id
  questionText: string;
  questionType: 'single_choice' | 'multiple_choice' | 'text';
  order: number;
  createdAt: string;
  updatedAt: string;
}