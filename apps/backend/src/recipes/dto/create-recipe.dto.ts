import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ingredients: string[];
}
