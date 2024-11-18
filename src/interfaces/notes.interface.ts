import { Document, Types } from 'mongoose';

export interface INote extends Document {
  _id: Types.ObjectId; 
  title: string;
  description: string;
  color?: string; 
  isArchive: boolean;
  isTrash: boolean;
  createdBy: Types.ObjectId; 
}
