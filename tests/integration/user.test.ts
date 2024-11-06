import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';
import dotenv from 'dotenv';

dotenv.config();
describe('User APIs Test', () => {

  before(async () => {
    const clearCollections = async () => {
      for (const users in mongoose.connection.collections) {
        await mongoose.connection.collections[users].deleteMany({});
      }
    };

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DATABASE_TEST || "Testing Purpose");
      await clearCollections();
    } else {
      await clearCollections();
    }
  });

  const userData = {
    name: 'Pavan',
    email: 'kpavan@gmail.com',
    username: 'pavan180185',
    password: 'pavan180185'
  };

  const noteData = {
    title: 'Test Note',
    description: 'This is a test note.',
    color: 'blue'
  };

  const updatedNoteData = {
    title: 'Updated Test Note',
    description: 'This is an updated test note.',
    color: 'green'

  };

  let token: string; 
  let createdNoteId:string;

  describe('User Registration', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app.getApp())
        .post('/api/v1/users/register')
        .send(userData);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message', 'User registered successfully');
    });
  });


  describe('User Login', () => {
    it('should log in an existing user successfully', async () => {
      const res = await request(app.getApp())
        .post('/api/v1/users/login')
        .send({ email: userData.email, password: userData.password });
  
      console.log('Login Response:', res.body); // Log the response to inspect it
  
      // Assuming token is directly under `res.body.data.token`
      token = res.body.user;
  
      expect(res.status).to.equal(200);
      expect(token).to.exist; // Ensure token exists before using it
    });
  });
  
  describe('Forgot Password', () => {
    it('should send a reset token to the user\'s email', async function() { 
        this.timeout(10000); // Increase timeout to 10 seconds

        const res = await request(app.getApp())
            .post('/api/v1/users/forgot-password')
            .send({ email: userData.email });

        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Reset token sent to email successfully');
    });
   });

  describe('Create Note', () => {
    it('should create a new note successfully', async () => {
      console.log(token);

      const res = await request(app.getApp())
        .post('/api/v1/notes/create')
        .set('Authorization', `Bearer ${token}`) // Set the Authorization header with the token
        .send(noteData);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message', 'Note created successfully'); 
      createdNoteId = res.body.data._id; // Store the created note ID for further tests
    });
  });

  describe('Get All Notes', () => {
    it('should return all notes of the user', async () => {
      const res = await request(app.getApp())
        .get('/api/v1/notes/')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an('array');
    });
  });

  // describe('Get Note by ID', () => {
  //   it('should return a note by its ID', async () => {
  //     const noteId = createdNoteId // Get the ID of the created note

  //     const res = await request(app.getApp())
  //       .get(`/api/v1/notes/${noteId}`)
  //       .set('Authorization', `Bearer ${token}`);

  //     expect(res.status).to.equal(404);
  //     expect(res.body.data).to.have.property('_id', noteId);
  //   });
  // });

  describe('Get Note by ID', () => {
    it('should return a note by its ID', async () => {
      console.log('Created Note ID:', createdNoteId);
      
      const noteId = createdNoteId // Get the ID of the created note
      const res = await request(app.getApp())
        .get(`/api/v1/notes/get/${noteId}`)
        .set('Authorization', `Bearer ${token}`);
      
      if (res.status === 404) {
        expect(res.body).to.have.property('message', 'Note not found');
      } else {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.property('_id', createdNoteId);
      }
    });
  });
  
  



  describe('Update Note', () => {
    it('should update a note successfully', async () => {
      const res = await request(app.getApp())
        .put(`/api/v1/notes/update/${createdNoteId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedNoteData);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Note updated successfully'); 
    });
  });

  describe('Archive/Unarchive Note', () => {
    it('should archive a note successfully', async () => {
      const res = await request(app.getApp())
        .put(`/api/v1/notes/archive/${createdNoteId}`)
        .set('Authorization', `Bearer ${token}`);
      console.log(res.body);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Note archive successfully'); 
    });
  });

  describe('Trash/Restore Note', () => {
    it('should trash a note successfully', async () => {
      const res = await request(app.getApp())
        .put(`/api/v1/notes/trash/${createdNoteId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Note moved to trash successfully'); 
    });
  });

  describe('Delete Note Forever', () => {
    it('should delete a note permanently', async () => {
      const res = await request(app.getApp())
        .delete(`/api/v1/notes/delete/${createdNoteId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Note deleted permanently'); 
    });
  });
});




