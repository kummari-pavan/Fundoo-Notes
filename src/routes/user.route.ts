import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import {passwordResetAuth} from '../middlewares/auth.middleware';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor(){
    this.routes()
  }
  
  private routes=()=>{
    this.router.post('', this.UserValidator.validateRegistration, this.UserController.register); //Register
    this.router.post('/login', this.UserValidator.validateLogin , this.UserController.login); //Login
    this.router.post('/forgot-password', this.UserController.forgotPassword); //ForgotPassword
    this.router.put('/reset-password/',passwordResetAuth, this.UserController.resetPassword); //ResetPassword
  }
  
  public getRoutes=()=>{
    return this.router
  };

}

export default UserRoutes;




