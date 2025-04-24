import { Controller, Get, Query, Res } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Response } from 'express';

@Controller('api/recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getRecipes(
    @Query('ingredients') ingredients: string,
    @Query('restrictions') restrictions: string,
    @Res() res: Response,
  ) {
    console.log(ingredients);
    try {
      const recipes = await this.recipesService.getRecipes(
        ingredients,
        restrictions,
      );
      console.log('Result:', recipes);
      res.json(recipes);
    } catch (error) {
      console.error('❌ Error fetching recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  }

  @Get('random')
  async getRandomRecipe() {
    return this.recipesService.getRandomRecipe();
  }
}
