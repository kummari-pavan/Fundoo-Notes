import Note from '../models/notes.model';
import { INote } from '../interfaces/notes.interface';

import mongoose from 'mongoose';

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

  //get note by Note Id
  public getNoteById = async (noteId: string): Promise<INote | null> => {
    return await Note.findById(noteId); 
  };


  // Get all notes for a user
  public getNotes = async (userId: string): Promise<INote[]> => {
    return await Note.find({ createdBy: userId });
  };

  //Update Notes Data Using Note Id
  public updateNote = async (
    noteId: string,
    updateData: Partial<INote>
  ): Promise<INote | null> => {
    return await Note.findByIdAndUpdate(noteId, updateData, { new: true });
  };

  public trashNote = async (noteId: string): Promise<INote | null> => {
    const doc:INote = await Note.findOne({_id:noteId});
    if(!doc.isTrash){
      return await Note.findByIdAndUpdate(noteId,{isTrash: true},{ new: true });
    }
    else{
      return await Note.findByIdAndUpdate(noteId,{isTrash: false},{ new: true });
    }
    
  };

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
