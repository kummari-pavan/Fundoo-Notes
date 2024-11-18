import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import NotesService from '../services/notes.service';
import { redisClient } from '../config/redisClient';

class NotesController {
  public NotesService = new NotesService();
   /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */

    // Controller to create a new note
    public createNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const userId = res.locals.user;  // Get the user ID from the JWT
        const noteId = req.params.noteId;
        const data = await this.NotesService.createNote(req.body, userId);

        // Clear cache after note update
        await redisClient.del(`user_notes_${userId}`);
        await redisClient.del(`user_${userId}_note_${noteId}`);

        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data,
          message: 'Note created successfully'
        });
      } catch (error) {
        next(error);
      }
    };  

    //This Is For Getting All User Notes With UserId
    public getNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const userId = res.locals.user;
        const data = await this.NotesService.getNotes(userId);
        console.log(data.length)
        // Set cache if notes data is not already cached
        await redisClient.set(`user_notes_${userId}`, JSON.stringify(data));
        if (data.length === 0) {  // Check if the notes array is empty
          console.log(0);
          res.status(HttpStatus.NOT_FOUND).json({
            code: HttpStatus.NOT_FOUND,
            message: 'No notes present for the user'
          });
        } 
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data,
          message: 'Notes fetched successfully'
        });
      } catch (error) {
        next(error);
      }
    };

    //This Is For get note by note Id
    public getNoteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const noteId = req.params.noteId;
        const userId = res.locals.user; // Get the user ID from the JWT
        const data = await this.NotesService.getNoteById(noteId, userId);
        if (!data) {
          res.status(404).json({
            code: HttpStatus.NOT_FOUND,
            message: `${userId}  ${noteId} Note not found`
          });
          return;
        }
        await redisClient.set(`user_${userId}_note_${noteId}`, JSON.stringify(data));
        res.status(200).json({
          code: HttpStatus.OK,
          data,
          message: 'Note fetched successfully'
        });
      } catch (error) {
        next(error);
      }
    };

    // Controller to Update Notes Data Using Note Id
    public updateNote = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const noteId = req.params.noteId;
        const userId = res.locals.user;
        const updatedNote = await this.NotesService.updateNote(noteId, req.body);

      // Clear cache after note update
      await redisClient.del(`user_notes_${userId}`);
      await redisClient.del(`user_${userId}_note_${noteId}`);
      const updatedNotes = await this.NotesService.getNotes(userId);
      await redisClient.set(`user_notes_${userId}`, JSON.stringify(updatedNotes));
        res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      }
    };
    
    // Controller to Delete Notes By Note ID
    public deleteNote = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const noteId = req.params.noteId;
        const userId = res.locals.user;
        const cacheKey = `user_${userId}_note_${noteId}`;
        await this.NotesService.deleteNote(noteId);
        res.status(200).json({ message: 'Note deleted permanently' });

      // Clear cache
      await redisClient.del(`user_notes_${userId}`);
      await redisClient.del(`user_${userId}_note_${noteId}`);
       
      } 
      catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      }
      
    };

    //view all Trash Notes
    public  viewTrash=async(req:Request,res:Response):Promise<any>=>{
      try{
        const userId = res.locals.user;
        const notes = await this.NotesService.viewTrash(req.body,userId);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: notes,
          });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`});
      }
      }
 
    //Controller to Trash a Note 
      public trashNote = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const noteId = req.params.noteId;
          const userId = res.locals.user;
          await this.NotesService.trashNote(noteId);
           // Clear cache
          await redisClient.del(`user_notes_${userId}`);
          await redisClient.del(`user_${userId}_note_${noteId}`);
          res.status(200).json({ message: 'Note moved to trash successfully' });
        } catch (error) {
          res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
      };
      //view all archive notes
      public  viewArchive=async(req:Request,res:Response):Promise<any>=>{
        try{
          const noteId = req.params.noteId;
          const userId = res.locals.user;
          const notes = await this.NotesService.viewArchive(req.body,userId);
           // Clear cache
           await redisClient.del(`user_notes_${userId}`);
           await redisClient.del(`user_${userId}_note_${noteId}`);
          res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: notes,
            });
        } catch (error) {
          res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`});
        }
        }

      //view notes by note Id
      public archiveNote = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const noteId = req.params.noteId;
          const userId = res.locals.user;
          await this.NotesService.archiveNote(noteId);
           // Clear cache
          await redisClient.del(`user_notes_${userId}`);
          await redisClient.del(`user_${userId}_note_${noteId}`);
          res.status(200).json({ message: 'Note archive successfully' });
        } catch (error) {
          res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
      };

   
};




export default NotesController;
