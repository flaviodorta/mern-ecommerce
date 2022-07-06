import { prop, getModelForClass } from '@typegoose/typegoose';

export class Product {
  @prop()
  image: string[];

  @prop()
  name: string;

  @prop()
  description: string;

  @prop()
  packQuantity: number;

  @prop()
  flavors: string[];
}

export const productModel = getModelForClass(Product);
