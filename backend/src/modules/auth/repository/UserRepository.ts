import { JwtService } from "../../jwt/JwtService";
import { User, UserModel } from "../../../infra/mongo/models/User";
import { ILogin } from "../interfaces/auth";
import { ISignIn } from "../interfaces/signIn";
import PasswordService from "../services/PasswordService";
import { Types } from "mongoose";

export class UserRepository {

  private passwordService = new PasswordService();

  async register(data: ISignIn)  {
    try{
      const user = await UserModel.create(data);
      return user;
    }
    catch(err) {
      console.log(err);
    }
  }

  async login(loginParams: ILogin) {
   try{
    const user: any = await this.getUserByEmail(loginParams.email);
    if(!user) return;
   
    const validPassword:boolean = await this.passwordService.checkPassword(user.password, user.salt, loginParams.password);
    if(!validPassword) return;

    user.token = {
      accessToken: await  new JwtService().sign({id: user._id, email: user.email, firstName: user.firstName}),
      refreshToken: await this.passwordService.generateRefreshToken(64),
      expires: new Date(
        new Date().setFullYear(new Date().getFullYear() + 20)
        ).getTime() 
    }
    await this.update(user.id, user);
    return user;
   }
   catch(err) {
    throw new Error(err.stack);
   }
  }

  async getUserByEmail(email: string) {
    try{
      return (
        await UserModel.aggregate([
          {$match: { email }},
          {
            $project: {
              _id: 0,
              id: "$_id",
              firstName: 1,
              lastName: 1,
              middleName: 1,
              salt: 1,
              createdAt: 1,
              email: 1,
              password: 1,
              token: 1
            }
          }
        ])
      )[0];
    }
    catch(err) {
      console.log(err);
    }
  }

  async update(id: Types.ObjectId, params: any) {
    return await UserModel.updateMany({_id: id }, {$set: params});
  }
}