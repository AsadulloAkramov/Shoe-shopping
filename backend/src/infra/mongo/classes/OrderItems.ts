import { prop, getModelForClass, ReturnModelType, Ref } from '@typegoose/typegoose';
import { Product } from '../models/Product';

export class OrderItems {
  constructor(params?: OrderItems){
    if(params){
      this.name = params.name;
      this.quantity = params.quantity;
      this.image = params.image;
      this.price = params.price;
    }
  }

  @prop({required: true})
  name!: string;

  @prop({required: true})
  quantity!: number;

  @prop({required: true})
  image?: string;

  @prop({required: true})
  price?: number;

  @prop({required: true, ref: "Product"})
  productId!: Ref<Product>
}