import { getModelForClass, prop } from '@typegoose/typegoose';
import { ProductModel } from './product.model';

export class Adress {
  @prop({ required: true })
  public firstName: string;

  @prop({ required: true })
  public lastName: string;

  @prop({ required: true })
  public streetAdress: string;

  @prop({ required: true })
  public residenceDetails: string;

  @prop({ required: true })
  public city: string;

  @prop({ required: true })
  public state: string;

  @prop({ required: true })
  public country: string;

  @prop({ required: true })
  public postalCode: string;
}

export class UserModel {
  @prop()
  public id: string;

  @prop({ required: false })
  public firstName?: string;

  @prop({ required: false })
  public lastName?: string;

  @prop({ required: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ default: [], type: () => [ProductModel] })
  public productsCart: ProductModel[];

  @prop({ default: [], required: false, type: () => [ProductModel] })
  public orderHistory?: ProductModel[];

  @prop({ required: false, type: () => [ProductModel] })
  public subscriptions?: ProductModel[];

  @prop({ required: false })
  public billingAdress?: Adress;

  @prop({ required: false })
  public primaryShippingAdress?: Adress;

  @prop({ default: null, required: false })
  public secretKey?: string;

  @prop({ default: 'user' })
  public userRole: string;
}

export const userModel = getModelForClass(UserModel);
