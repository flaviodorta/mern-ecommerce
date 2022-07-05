import { Schema, model, SchemaDefinitionProperty } from 'mongoose';

export interface IsAdressSchema {
  firstName: string;
  lastName: string;
  streetAdress: string;
  residenceDetails: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface IsUserSchema {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  orderHistory?: SchemaDefinitionProperty<[]>;
  subscriptions?: SchemaDefinitionProperty<[]>;
  billingAdress?: IsAdressSchema;
  primaryShippingAdress?: IsAdressSchema;
  secretKey?: string;
}

const adressSchema = new Schema<IsAdressSchema>({
  firstName: {
    type: String,
    required: false,
    maxlength: 32,
  },

  lastName: {
    type: String,
    required: false,
    maxlength: 32,
  },

  streetAdress: {
    type: String,
    required: true,
  },

  residenceDetails: String,

  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  postalCode: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<IsUserSchema>(
  {
    firstName: {
      type: String,
      required: false,
      maxlength: 32,
    },

    lastName: {
      type: String,
      required: false,
      maxlength: 32,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },

    password: {
      type: String,
      required: true,
    },

    orderHistory: {
      type: Array,
      default: [],
    },

    subscriptions: {
      type: Array,
      default: [],
    },

    billingAdress: adressSchema,

    primaryShippingAdress: adressSchema,

    secretKey: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const userModel = model<IsUserSchema>('users', userSchema);
