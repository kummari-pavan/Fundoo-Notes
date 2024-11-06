/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import NotesService from '../services/notes.service';

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
        
        const data = await this.NotesService.createNote(req.body, userId);
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
        const updatedNote = await this.NotesService.updateNote(noteId, req.body);
        res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      }
    };



    // Controller to Delete Notes By Note ID
    public deleteNote = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const noteId = req.params.noteId;
        await this.NotesService.deleteNote(noteId);
        res.status(200).json({ message: 'Note deleted permanently' });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      }
    };
  
    //view all Trash Notes
    public  viewTrash=async(req:Request,res:Response):Promise<any>=>{
      try{
        const notes = await this.NotesService.viewTrash(req.body);
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
          await this.NotesService.trashNote(noteId);
          res.status(200).json({ message: 'Note moved to trash successfully' });
        } catch (error) {
          res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
      };
      //view archive
      public  viewArchive=async(req:Request,res:Response):Promise<any>=>{
        try{
          const notes = await this.NotesService.viewArchive(req.body);
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
          await this.NotesService.archiveNote(noteId);
          res.status(200).json({ message: 'Note archive successfully' });
        } catch (error) {
          res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
      };

   
};




export default NotesController;
