import { prop, getModelForClass } from '@typegoose/typegoose';

export class Review {
  @prop({ required: true })
  userName: string;

  @prop({ required: true })
  rating: number;

  @prop({ required: true })
  description: string;
}
