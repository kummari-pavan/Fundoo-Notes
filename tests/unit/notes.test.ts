// import { expect } from 'chai';
// import NotesService from '../../src/services/notes.service';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { INote } from '../../src/interfaces/notes.interface';

// dotenv.config();

// describe('Notes', () => {
//   let notesService: NotesService;
//   let createdNoteId: string;

//   before(async () => {
//     if (!process.env.DATABASE_TEST) {
//       throw new Error("DATABASE_TEST environment variable is not defined.");
//     }

//     const mongooseConnect = async () => {
//       await mongoose.connect(process.env.DATABASE_TEST || "Testing Purpose");
//       await clearCollections();
//     };

//     const clearCollections = async () => {
//       const collections = mongoose.connection.collections;
//       for (const collection in collections) {
//         await collections[collection].deleteMany({});
//       }
//     };

//     if (mongoose.connection.readyState === 0) {
//       await mongooseConnect();
//     } else {
//       await clearCollections();
//     }

//     notesService = new NotesService();
//   });

//   after(async () => {
//     await mongoose.disconnect();
//   });

//   describe('Create Note', () => {
//     it('should create a note successfully', async () => {
//       const mockNote: Partial<INote> = {
//         title: 'Test Note',
//         description: 'This is a test note description.',
//         color: '#FFFFFF', // Example color
//         //createdBy: new mongoose.Types.ObjectId().toString() // `createdBy` as a string ID
//       };

//       const createdNote = await notesService.createNote(
//         mockNote.title!,
//         mockNote.description!,
//         mockNote.color,
//         mockNote.createdBy!.toString()
//       );
//       expect(createdNote).to.be.an('object');
//       expect(createdNote.title).to.equal(mockNote.title);
//       expect(createdNote.description).to.equal(mockNote.description);
//       expect(createdNote).to.have.property('_id');
//       createdNoteId = createdNote._id.toString();
//     });
//   });

//   describe('Get All Notes', () => {
//     it('should retrieve all notes for the user', async () => {
//       const notes = await notesService.getNotes(createdNoteId);
//       expect(notes).to.be.an('array');
//     });
//   });

//   describe('Get Note by ID', () => {
//     it('should retrieve a note by ID', async () => {
//       const note = await notesService.getNoteById(createdNoteId);
//       expect(note).to.be.an('object');
//     });

//     it('should return null for non-existent note', async () => {
//       const nonExistentId = new mongoose.Types.ObjectId();
//       const note = await notesService.getNoteById(nonExistentId.toString());
//       expect(note).to.be.null;
//     });
//   });

//   describe('Update Note', () => {
//     it('should update a note successfully', async () => {
//       const updatedData: Partial<INote> = {
//         title: 'Updated Test Note',
//         description: 'This is the updated description.',
//       };
//       const updatedNote = await notesService.updateNote(createdNoteId, updatedData);
//       expect(updatedNote).to.be.an('object');
//       //expect(updatedNote.title).to.equal(updatedData.title);
//     });

//     it('should throw an error for a non-existent note ID', async () => {
//       const nonExistentId = new mongoose.Types.ObjectId();
//       try {
//         await notesService.updateNote(nonExistentId.toString(), { title: 'New Title' });
//       } catch (error: any) {
//         expect(error.message).to.equal('Note not found');
//       }
//     });
//   });

//   describe('Delete Note', () => {
//     it('should delete a note successfully', async () => {
//       const deletedNote = await notesService.deleteNote(createdNoteId);
//       expect(deletedNote).to.be.an('object');
//       //expect(deletedNote.isTrash).to.be.true; // Assuming deleteNote moves the note to trash
//     });

//     it('should throw an error for a non-existent note ID', async () => {
//       const nonExistentId = new mongoose.Types.ObjectId();
//       try {
//         await notesService.deleteNote(nonExistentId.toString());
//       } catch (error: any) {
//         expect(error.message).to.equal('Note not found');
//       }
//     });
//   });

//   describe('Trash Note', () => {
//     it('should trash a note successfully', async () => {
//       const trashedNote = await notesService.trashNote(createdNoteId);
//       expect(trashedNote).to.be.an('object');
//     });

//     it('should throw an error for a non-existent note ID during trash', async () => {
//       const nonExistentId = new mongoose.Types.ObjectId();
//       try {
//         await notesService.trashNote(nonExistentId.toString());
//       } catch (error: any) {
//         expect(error.message).to.equal('Note not found');
//       }
//     });
//   });

//   describe('Archive Note', () => {
//     it('should archive a note successfully', async () => {
//       const archivedNote = await notesService.archiveNote(createdNoteId);
//       expect(archivedNote).to.be.an('object');
//       //expect(archiveNote.isArchive).to.be.true;
//     });

//     it('should throw an error for a non-existent note ID during archive', async () => {
//       const nonExistentId = new mongoose.Types.ObjectId();
//       try {
//         await notesService.archiveNote(nonExistentId.toString());
//       } catch (error: any) {
//         expect(error.message).to.equal('Note not found');
//       }
//     });
//   });

// });
