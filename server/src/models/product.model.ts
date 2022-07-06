import { prop, getModelForClass } from '@typegoose/typegoose';

export class ProductModel {
  @prop()
  public name: string;

  @prop()
  public description: string;

  @prop()
  public image: string[];

  @prop({ type: () => [String] })
  public reviews: string[];

  @prop()
  public packQuantity: number;

  @prop({ type: () => [String] })
  public flavors: string[];
}

export const productModel = getModelForClass(ProductModel);
