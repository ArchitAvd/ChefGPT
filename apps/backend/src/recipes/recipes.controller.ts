import { Controller, Get, Param, Query, Res } from '@nestjs/common';
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
    try {
      const recipes = await this.recipesService.getRecipes(
        ingredients,
        restrictions,
      );
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

  @Get(':id')
  async getRecipeById(@Param('id') id: string, @Res() res: Response) {
    try {
      const recipe = await this.recipesService.getRecipeById(id);

      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      return res.json(recipe);
    } catch (error) {
      console.error('❌ Error fetching recipe by ID:', error);
      res.status(500).json({ error: 'Failed to fetch recipe' });
    }
  }
}
