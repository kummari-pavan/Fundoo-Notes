import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

class UserService {

  //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await User.find();
    return data;
  };

  // //create new user
  // public newUser = async (body: IUser): Promise<IUser> => {
  //   const data = await User.create(body);
  //   return data;
  // };

  //update a user
  public updateUser = async (_id: string, body: IUser): Promise<IUser> => {
    const data = await User.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  //delete a user
  public deleteUser = async (_id: string): Promise<string> => {
    await User.findByIdAndDelete(_id);
    return '';
  };

  //get a single user
  public getUser = async (_id: string): Promise<IUser> => {
    const data = await User.findById(_id);
    return data;
  };
}

//---------------------------------------

// Define a function to register a new user
export const registerUser = async (userData: any) => {
  // Check if the username or email already exists
  const existingUser = await User.findOne({
    $or: [{ email: userData.email }, { username: userData.username }]
  });

  if (existingUser) {
    throw new Error('User with this email or username already exists');
  }

  // Create a new user with the given data
  const newUser = new User(userData);
  return await newUser.save();
};

// Define a function to log in a user
export const loginUser = async (usernameOrEmail: string, password: string) => {
  // Find the user by email or username
  const user = await User.findOne({
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if the password matches (this is just a direct comparison without hashing)
  if (user.password !== password) {
    throw new Error('Invalid credentials');
  }

  return user;
};


export default UserService;
