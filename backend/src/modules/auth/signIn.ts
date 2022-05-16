import { Request, Response } from "express";
import { BaseController } from "../../core/BaseController";
import { ISignInBody, ISignIn } from "./interfaces/signIn";
import { UserRepository } from "./repository/UserRepository";
import PasswordService from "./services/PasswordService";
import { Validate } from "../../validations/services/ValidationService";
import SignInSchema from './dto/sign-in';

export default class SignIn extends BaseController {
  private userRepo = new UserRepository();
  private passwordService = new PasswordService();

  @Validate(SignInSchema.signIn)
  async register(req: Request, res: Response) {
    try{
      const doc: ISignInBody = req.body;
      const data = await this.passwordService.readyData(doc);
      const isUserExist = await this.userRepo.getUserByEmail(data.email);
      console.log(`user: ${isUserExist}`)
      if(isUserExist != undefined) {
        return this.alreadyExist(res);
      }

      const user = await this.userRepo.register(data);      
      console.log(`=== User Sign in successfully completed ===`);
      return this.created(res, user);
    }
    catch(err) {
      return this.fail(res, err);
    }
  }
}