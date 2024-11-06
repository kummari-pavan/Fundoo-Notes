import Note from '../models/notes.model';
import { INote } from '../interfaces/notes.interface';
import { Types } from 'mongoose';
import mongoose from 'mongoose';

class NotesService {

  // Create a new note
  public createNote = async (body: INote, userId: string): Promise<INote> => {
    const noteData = {
      ...body,
      createdBy: userId
    };
    const note = await Note.create(noteData);
    return note;
  };

  //get note by Note Id
  public getNoteById = async (noteId: string,userId:string): Promise<INote | null> => {
    const note=await Note.findOne({_id:noteId,createdBy:userId}); 
    return note;
  };


  // Get all notes for a user
  public getNotes = async (userId: string): Promise<INote[]> => {
    const allNotes= await Note.find({ createdBy: userId });
    return allNotes
  };

  //Update Notes Data Using Note Id
  public updateNote = async (
    noteId: string,
    updateData: Partial<INote>
  ): Promise<INote | null> => {
    return await Note.findByIdAndUpdate(noteId, updateData, { new: true });
  };

   //View the Trash Notes
   public viewTrash=async(body:INote):Promise<INote[]> =>{
    return await Note.find({$and:[{createdBy:new Types.ObjectId(body.createdBy)},{isTrash:true}]})
  }

  //View the Trash Notes by Nites Id
  public trashNote = async (noteId: string): Promise<INote | null> => {
    const doc:INote = await Note.findOne({_id:noteId});
    if(!doc.isTrash){
      return await Note.findByIdAndUpdate(noteId,{isTrash: true},{ new: true });
    }
    else{
      return await Note.findByIdAndUpdate(noteId,{isTrash: false},{ new: true });
    }
    
  };
 
  //view the Archive note
  public viewArchive=async(body:INote):Promise<INote[]> =>
    {
      return await Note.find({$and:[{createdBy:new Types.ObjectId(body.createdBy)},{isArchive:true}]})
    }
  
  //view the Archive By Note Id
  public archiveNote= async (noteId:string) : Promise<INote | null> =>{
    const doc:INote= await Note.findOne({_id:noteId});
    if(doc.isArchive === false){
      return await Note.findByIdAndUpdate(noteId,{isArchive: true},{new: true});
    }
    else{
      return await Note.findByIdAndUpdate(noteId,{isArchive: false},{new: true})
    }
  }

  public deleteNote = async (noteId: string) => {
    try{
      const doc:INote = await Note.findOne({_id:noteId, isTrash:true});
      if(doc){
        await Note.findByIdAndDelete(noteId);
      }
      else{
        throw new Error("Nothing in Trash With Given Id")
      }
    }catch(error){
      throw new Error("Cannot find by id and Delete: "+ error)
    }   
    
  };
  
}

export default NotesService;
