/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import NotesService from '../services/notes.service';

class NotesController {
  public NotesService = new NotesService();

 // Controller to create a new note
public createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, color, createdBy } = req.body; // Removed isArchive and isTrash as they're not needed for creation
      const newNote = await this.NotesService.createNote(
        title,         
        description,   
        color,         
        createdBy      
      );
      res.status(HttpStatus.CREATED).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  };
  

  //This Is For Getting All User Notes With UserId
  public getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const notes = await this.NotesService.getNotes(userId);
      res.status(HttpStatus.OK).json({ message: 'Notes fetched successfully', notes });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  };


  // Controller to Update Notes Data Using Note Id
  public updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteId = req.params.noteId;
      const updatedNote = await this.NotesService.updateNote(noteId, req.body);
      res.status(HttpStatus.OK).json({ message: 'Note updated successfully', note: updatedNote });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  };



  // Controller to delete a note by note ID
  public deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteId = req.params.noteId;
      await this.NotesService.deleteNote(noteId);
      res.status(HttpStatus.OK).json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  };
}

export default NotesController;
