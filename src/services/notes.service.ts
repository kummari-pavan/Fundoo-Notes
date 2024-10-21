import Note from '../models/notes.model';
import { INote } from '../interfaces/notes.interface';

class NotesService {

  // Create a new note
  public createNote = async (
    title: string,
    description: string,
    color: string | undefined,
    createdBy: string
  ): Promise<INote> => {
    const newNote = new Note({
      title,
      description,
      color,
      createdBy,
      
    });
    return await newNote.save();
  };

  // Get all notes for a user
  public getNotes = async (userId: string): Promise<INote[]> => {
    return await Note.find({ createdBy: userId });
  };

  // Update a note by note ID
  public updateNote = async (
    noteId: string,
    updateData: Partial<INote>
  ): Promise<INote | null> => {
    return await Note.findByIdAndUpdate(noteId, updateData, { new: true });
  };

  // Delete a note by note ID
  public deleteNote = async (noteId: string): Promise<void> => {
    await Note.findByIdAndDelete(noteId);
  };
}

export default NotesService;
