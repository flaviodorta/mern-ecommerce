import { SchemaDefinitionProperty } from 'mongoose';

import { getModelForClass, prop } from '@typegoose/typegoose';

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

export class User {
  @prop({ required: false })
  public firstName?: string;

  @prop({ required: false })
  public lastName?: string;

  @prop({ required: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ default: [], required: false })
  public orderHistory?: SchemaDefinitionProperty<[]>;

  @prop({ required: false })
  public subscriptions?: SchemaDefinitionProperty<[]>;

  @prop({ required: false })
  public billingAdress?: Adress;

  @prop({ required: false })
  public primaryShippingAdress?: Adress;

  @prop({ default: null, required: false })
  public secretKey?: string;

  @prop({ default: 10 })
  public userRole: Number;
}

export const userModel = getModelForClass(User);
