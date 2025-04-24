import { Controller, Get } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('api/ingredients')
export class IngredientsController {
  constructor(private readonly recipeService: IngredientsService) {}

  @Get()
  getIngredients() {
    return this.recipeService.getAllIngredients();
  }
}
