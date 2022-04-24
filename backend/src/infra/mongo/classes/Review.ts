import { prop, getModelForClass, ReturnModelType, Ref } from '@typegoose/typegoose';
import { User } from '../models/User';

export class  Review {
  constructor(params?: Review) {
    if(params) {
      this.name = params.name;
      this.rating = params.rating;
      this.comment = params.comment
    }
  }

  @prop({required: true})
  name!: string;

  @prop({required: true})
  rating?: number;

  @prop({required: true})
  comment?: string

  @prop({ref: "User", required: true})
  user!: Ref<User>
}