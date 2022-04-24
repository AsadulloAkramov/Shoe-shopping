import { prop, getModelForClass, ReturnModelType, Ref } from '@typegoose/typegoose';

export class ShippingAddress {
  constructor(params?: ShippingAddress){
    if(params){
      this.address = params.address;
      this.country = params.country;
      this.city = params.city;
      this.postalCode = params.postalCode;
    }
  }

  @prop({required: true})
  address!: string;

  @prop({required: true})
  country!: string;
  
  @prop({required: true})
  city!: string;

  @prop({required: true})
  postalCode!: string;
}