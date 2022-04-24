import { prop, getModelForClass, ReturnModelType, Ref } from '@typegoose/typegoose';
import { OrderItems } from '../classes/OrderItems';
import { ShippingAddress } from '../classes/ShippingAddress';
import { User } from './User';

export class Order {
  constructor(params?: Order){
    if(params) {

    }
  }

  @prop({required: true, ref: "User"})
  user!: Ref<User>

  @prop({required: true})
  orderItems?: Array<OrderItems>

  @prop({required: true})
  shippingAddress?: ShippingAddress

  @prop({required: true, default:"Paypal"})
  paymentMethod!: string

  @prop({required: true, default: 0})
  taxPrice?: number

  @prop({required: true, default: 0})
  shippingPrice?: number

  @prop({required: true, default: 0})
  totalPrice: number

  @prop({default:false, required: true})
  isPaid?: boolean

  @prop({required: true, default: null})
  paidAt?: Date

  @prop({default:false, required: true})
  isDelivered?: boolean

  @prop({required: true, default: null})
  deliveredAt?: Date

}

export const OrderModel: ReturnModelType<typeof Order> = getModelForClass(Order, {
  schemaOptions: {
    collection: 'orders',
    timestamps: true
  }
})