export interface Answer {
  _id?: string;
  _rev?: string;
  type: 'answer';
  voteId: string;
  questionId: string;
  optionId?: string; // null if it's a text answer
  textAnswer?: string;
  createdAt: string;
}