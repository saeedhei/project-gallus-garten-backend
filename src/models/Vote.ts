export interface Vote {
  _id?: string;
  _rev?: string;
  type: 'vote';
  pollId: string;
  userId?: string; 
  submittedAt: string;
}
