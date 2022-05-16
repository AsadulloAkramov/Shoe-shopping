import  * as crypto from 'crypto';
import * as _ from "lodash";
import { ISignIn, ISignInBody } from '../interfaces/signIn';

export default class PasswordService {
  
  private characters: string  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  private saltLength: number = 10;

  async checkPassword(hash: string, salt: string, password: string) {
    return hash == await this.generatePassword(password + salt);
  }
  async generateSalt() {
    let salt: string = "";
    for(let i = 0; i< this.saltLength; i++) {
      salt+= this.characters.charAt(_.random(0, this.characters.length));
    }
    return salt;
  }
  async generateRefreshToken(length: number): Promise<string> {
    let refreshToken: string = "";
    for(let i =0 ; i< length; i++) {
      refreshToken+= this.characters.charAt(_.random(0, this.characters.length));
    }
    return refreshToken;
  }
  async generatePassword(input: string) {
    return crypto.createHash("md5").update(input).digest("hex");
  }
  async readyData(doc: ISignInBody): Promise<ISignIn> {
    const randomSalt = {
      salt: await this.generateSalt()
    }
    const data: ISignIn = {
      ...doc,
      ...randomSalt
    }
    data.password = await this.generatePassword(data.password + data.salt);
    return data;
  }

}