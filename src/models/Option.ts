export interface Option {
  _id?: string;
  _rev?: string;
  type: 'option';
  questionId: string; // Question._id
  optionText: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}
