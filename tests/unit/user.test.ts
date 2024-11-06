// import { expect } from 'chai';
// import UserService from '../../src/services/user.service';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { IUser } from '../../src/interfaces/user.interface';

// dotenv.config();

// describe('User', () => {
//   before((done) => {
//     const clearCollections = () => {
//       for (const collection in mongoose.connection.collections) {
//         mongoose.connection.collections[collection].deleteOne(() => {});
//       }
//     };

//     const mongooseConnect = async () => {
//       await mongoose.connect(process.env.DATABASE_TEST || 'Testing Purposes');
//       clearCollections();
//     };

//     if (mongoose.connection.readyState === 0) {
//       mongooseConnect();
//     } else {
//       clearCollections();
//     }

//     done();
//   });

//   describe('Register User', () => {
//     it('should throw an error if the email already exists', async () => {
//       const userService = new UserService();
//       const name = 'Pavan';
//       const email = 'kpavan@gmail.com';
//       const username = 'pavan180185';
//       const password = 'pavan180185';

//       // First, create a user with the mock email
//       const result = await userService.registerUser(name, email, username, password);

//       // Cast result to IUser by calling `toObject()`
//       const user = result.toObject() as IUser;

//       expect(user).to.be.an('object');
//       expect(user.email).to.equal(email);

//       // Attempt to register the same user again to trigger the "email already exists" error
//       try {
//         await userService.registerUser(name, email, username, password);
//       } catch (error: any) {
//         expect(error.message).to.equal('User with this email or username already exists');
//       }
//     });
//   });
// });
