import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string | number;
  name: string;
  email: string;
  username: string;
  password: string;
}
