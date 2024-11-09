import express from 'express';
import NotesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';
import NotesValidator from '../validators/notes.validator';
import { cacheNoteById, cacheAllNotes } from '../middlewares/redisMiddleware';

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

    // Getting User Notes Data 
    this.router.get('/',userAuth,cacheAllNotes, this.NotesController.getNotes); //All
    this.router.get('/get/:noteId',userAuth,cacheNoteById, this.NotesController.getNoteById); //ByNoteId
    this.router.put('/update/:noteId',this.notesValidator.updateNoteSchema,userAuth,this.NotesController.updateNote); //UpdateByNoteId
    this.router.delete('/delete/:noteId',userAuth,this.NotesController.deleteNote); //DeleteByNoteId
    this.router.get('/trash',userAuth,this.NotesController.viewTrash); //AllTrash
    this.router.put('/trash/:noteId',userAuth,this.NotesController.trashNote); //TrashNoteById
    this.router.get('/archive',userAuth,this.NotesController.viewArchive); //AllArchive
    this.router.put('/archive/:noteId',userAuth,this.NotesController.archiveNote); //ArchiveByNoteId
};

  public getRoutes = () => {
    return this.router;
  };
}

export default NotesRoutes;
