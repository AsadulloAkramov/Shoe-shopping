import { prop, getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { Token } from '../classes/Token';

export class User {
  constructor(params?: User){
    if(params){
      this.firstName = params.firstName;
      this.lastName = params.lastName;
      this.middleName = params.middleName;
      this.email = params.email;
      this.password = params.password;
      this.salt = params.salt;
      this.token = params.token
    }
  }

  @prop({ required: true })
  firstName!: string;

  @prop({ required: true })
  lastName!: string;

  @prop({ default: null })
  middleName?: string;

  @prop({ required: true })
  salt!: string;

  @prop({ required: true , unique: true})
  email!: string;

  @prop({ required: true })
  password!: string;

  @prop({ default: {}, _id: false })
  token: Token;
}

export const UserModel: ReturnModelType<typeof User> = getModelForClass(User,{
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})