export interface Poll {
  _id?: string;
  _rev?: string;
  type: 'poll';
  title: string;
  description?: string;
  createdBy: string; // User._id
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
