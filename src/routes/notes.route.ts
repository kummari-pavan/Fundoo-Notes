import express from 'express';
import NotesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';
import NotesValidator from '../validators/notes.validator';

class NotesRoutes {
  private NotesController = new NotesController();
  private router = express.Router();
  private notesValidator = new NotesValidator();

  constructor() {
    this.routes();
  }

  public routes = () => {
    // Create a new note 
    this.router.post(
      '/create',
      this.notesValidator.createNoteSchema,
      userAuth,
      this.NotesController.createNote
    );

    // Getting all User Notes Data With User Id
    this.router.get(
      '/get/:userId',
      userAuth,
      this.NotesController.getNotes
    );

    // update Note Data with Note ID
    this.router.put(
      '/update/:noteId',
      this.notesValidator.updateNoteSchema,
      userAuth,
      this.NotesController.updateNote
    );

    // Delete a note by note ID 
    this.router.delete(
      '/delete/:noteId',
      userAuth,
      this.NotesController.deleteNote
    );
  };

  public getRoutes = () => {
    return this.router;
  };
}

export default NotesRoutes;
