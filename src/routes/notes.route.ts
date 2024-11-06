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

  public routes = () => { this.router.post(
      '/create',
      this.notesValidator.createNoteSchema,
      userAuth,
      this.NotesController.createNote
    );

    // Getting all User Notes Data With User Id
    this.router.get('/',userAuth, this.NotesController.getNotes);
    this.router.get('/get/:noteId',userAuth, this.NotesController.getNoteById);
    this.router.put('/update/:noteId',this.notesValidator.updateNoteSchema,userAuth,this.NotesController.updateNote);
    this.router.delete('/delete/:noteId',userAuth,this.NotesController.deleteNote);
    this.router.get('/trash',userAuth,this.NotesController.viewTrash);
    this.router.put('/trash/:noteId',userAuth,this.NotesController.trashNote);
    this.router.get('/archive',userAuth,this.NotesController.viewArchive);
    this.router.put('/archive/:noteId',userAuth,this.NotesController.archiveNote);
};

    

  public getRoutes = () => {
    return this.router;
  };
}

export default NotesRoutes;
