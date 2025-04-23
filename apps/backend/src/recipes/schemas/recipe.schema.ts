import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
  @Prop([String])
  ingredients: string[];

  @Prop()
  name: string;

  @Prop()
  image_url: string;

  @Prop()
  prep_time: string;

  @Prop()
  servings: number;

  @Prop()
  calories_per_serving: number;

  @Prop()
  dietaryRestrictions: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
