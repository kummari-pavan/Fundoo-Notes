import mongoose from 'mongoose';
import { INote } from '../interfaces/notes.interface';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String, // Optional field
  },
  isArchive: {
    type: Boolean,
    default: false,
  },
  isTrash: {
    type: Boolean,
    default: false,
  },
  
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
}, { timestamps: true });

// Using the interface with the model
const Note = mongoose.model<INote>('Note', noteSchema);

export default Note;