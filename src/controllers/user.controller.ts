/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';

import { Request, Response, NextFunction } from 'express';

import User from '../models/user.model';
import { registerUser, loginUser } from '../services/user.service';

class UserController {
  public UserService = new userService();

//My Logic

// Controller for registering a new user
 register = async (req: Request, res: Response) => {
  try {
    //const userData = req.body;
    //const newUser = await registerUser(userData); // Call the service
    const { name, email, username, password, confirmPassword } = req.body;
    const newUser = await registerUser(name, email, username,  password, confirmPassword); 
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for logging in a user
 login = async (req: Request, res: Response) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await loginUser(usernameOrEmail, password); // Call the service
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
 
}

export default UserController;


