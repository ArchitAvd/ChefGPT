// ingredient.schema.ts
import { Prop } from '@nestjs/mongoose';

export class Ingredient {
  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  unit: string;
}
