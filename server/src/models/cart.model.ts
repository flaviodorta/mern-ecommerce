import { prop, getModelForClass } from '@typegoose/typegoose';
import { Product } from './product.model';

class ProductCart {
  @prop()
  public quantity: number;

  @prop()
  public product: Product;
}

export class Cart {
  @prop({ type: () => [ProductCart] })
  public productsCart: ProductCart[];

  @prop({ default: 0 })
  public subtotal: number;
}

export const cartModel = getModelForClass(Cart);
