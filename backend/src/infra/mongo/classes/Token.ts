import { prop } from '@typegoose/typegoose';

export class Token {
  constructor(params?: Token){
    if(params) {
      this.accessToken = params.accessToken;
      this.refreshToken = params.refreshToken;
      this.expires = params.expires
    }
  }

  @prop({ default: null })
  accessToken?: string

  @prop({ default: null})
  refreshToken?: string

  @prop({ default: 0 })
  expires?: number
}