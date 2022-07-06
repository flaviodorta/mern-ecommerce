import { prop, getModelForClass } from '@typegoose/typegoose';

export class ReviewModel {
  @prop({ required: true })
  userName: string;

  @prop({ required: true })
  rating: number;

  @prop({ required: true })
  description: string;
}

export const reviewModel = getModelForClass(ReviewModel);
