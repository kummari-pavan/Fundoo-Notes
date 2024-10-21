import { Document, Types } from 'mongoose';

export interface INote extends Document {
  _id: Types.ObjectId; // or string, depending on how you want to handle the ID
  title: string;
  description: string;
  color?: string; // Optional
  isArchive: boolean;
  isTrash: boolean;
  createdBy: Types.ObjectId; // Reference to User model (make sure it's an ObjectId)
}
