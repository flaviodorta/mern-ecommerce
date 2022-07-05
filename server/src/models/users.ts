import { SchemaDefinitionProperty } from 'mongoose';

import { getModelForClass, prop } from '@typegoose/typegoose';

export class Adress {
  @prop()
  public firstName: string;

  @prop()
  public lastName: string;

  @prop()
  public streetAdress: string;

  @prop()
  public residenceDetails: string;

  @prop()
  public city: string;

  @prop()
  public state: string;

  @prop()
  public country: string;

  @prop()
  public postalCode: string;
}

export class User {
  @prop()
  public firstName?: string;

  @prop()
  public lastName?: string;

  @prop()
  public email: string;

  @prop()
  public password: string;

  @prop()
  public orderHistory?: SchemaDefinitionProperty<[]>;

  @prop()
  public subscriptions?: SchemaDefinitionProperty<[]>;

  @prop()
  public billingAdress?: Adress;

  @prop()
  public primaryShippingAdress?: Adress;

  @prop()
  public secretKey?: string;
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
