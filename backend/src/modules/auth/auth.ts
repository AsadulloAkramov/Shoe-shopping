import { Request, Response } from "express";
import { BaseController } from "../../core/BaseController";
import { Validate } from "../../validations/services/ValidationService";
import { ILogin } from "./interfaces/auth";
import { UserRepository } from "./repository/UserRepository";
import AuthSchema from './dto/auth';

export class AuthController extends BaseController {
  private userRepo = new UserRepository();

  @Validate(AuthSchema.login)
  async login(req: Request, res: Response) {
    try{
      const loginParams: ILogin = req.body;
      const user = await this.userRepo.login(loginParams);
      
      if(!user) {
       return this.notFound(res, 'Password or login incorrect');
      }
      return this.ok(res, user);
    }
    catch(err) {
      return this.fail(res, err);
    }
  }
}