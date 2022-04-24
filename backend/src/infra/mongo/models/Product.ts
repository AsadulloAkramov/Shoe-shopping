import { prop, getModelForClass, ReturnModelType, Ref } from '@typegoose/typegoose';
import { Review } from '../classes/Review';

export class Product {
  constructor(params?: Product){
    if(params){
      this.name = params.name;
      this.image = params.image;
      this.description = params.description;
      this.rating = params.rating;
      this.numReviews = params.numReviews;
      this.price = params.price;
      this.countInStock = params.countInStock;
    }
  }

  @prop({required: true})
  name!: string;

  @prop({required: true})
  image!: string;

  @prop({required: true})
  description!: string;

  @prop({required: true})
  rating!: number;

  @prop({default: []})
  reviews?: Array<Review>

  @prop({required: true})
  numReviews!: number;

  @prop({required: true})
  price!: number;

  @prop({required: true})
  countInStock!: number;
}

export const ProductModel: ReturnModelType<typeof Product> = getModelForClass(Product, {
  schemaOptions: {
    collection: 'products',
    timestamps: true
  }
})