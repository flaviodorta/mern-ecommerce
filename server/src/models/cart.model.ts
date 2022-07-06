import { prop, getModelForClass } from '@typegoose/typegoose';
import { ProductModel } from './product.model';

class ProductCart {
  @prop()
  public quantity: number;

  @prop()
  public product: ProductModel;
}

export class CartModel {
  @prop({ type: () => [ProductCart] })
  public productsCart: ProductCart[];

  @prop({ default: 0 })
  public subtotal: number;
}

export const cartModel = getModelForClass(CartModel);
