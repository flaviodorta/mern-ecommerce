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

  @prop({ default: 0 })
  public userRole: Number;
}

export const userModel = getModelForClass(User);

// const adressSchema = new Schema<IsAdressSchema>({
//   firstName: {
//     type: String,
//     required: false,
//     maxlength: 32,
//   },

//   lastName: {
//     type: String,
//     required: false,
//     maxlength: 32,
//   },

//   streetAdress: {
//     type: String,
//     required: true,
//   },

//   residenceDetails: String,

//   city: {
//     type: String,
//     required: true,
//   },

//   state: {
//     type: String,
//     required: true,
//   },

//   country: {
//     type: String,
//     required: true,
//   },

//   postalCode: {
//     type: String,
//     required: true,
//   },
// });

// const userSchema = new Schema<IsUserSchema>(
//   {
//     firstName: {
//       type: String,
//       required: false,
//       maxlength: 32,
//     },

//     lastName: {
//       type: String,
//       required: false,
//       maxlength: 32,
//     },

//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       index: { unique: true },
//       match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     orderHistory: {
//       type: Array,
//       default: [],
//     },

//     subscriptions: {
//       type: Array,
//       default: [],
//     },

//     billingAdress: adressSchema,

//     primaryShippingAdress: adressSchema,

//     secretKey: {
//       type: String,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// export const userModel = model<IsUserSchema>('users', userSchema);
