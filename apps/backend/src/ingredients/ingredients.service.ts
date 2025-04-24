import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeDocument } from '../recipes/schemas/recipe.schema';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class IngredientsService implements OnModuleInit {
  private ingredientsCache: string[] = [];

  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {}

  // This method will run when the server starts
  async onModuleInit() {
    await this.updateIngredientsList();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async updateIngredientsList() {
    const recipes = await this.recipeModel.find({}, 'ingredients');
    const ingredientsSet = new Set<string>();

    recipes.forEach((recipe) => {
      if (Array.isArray(recipe.ingredients)) {
        // Iterate through ingredients, which are now typed as Ingredient[]
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient && ingredient.name) {
            ingredientsSet.add(ingredient.name);
          }
        });
      }
    });

    this.ingredientsCache = Array.from(ingredientsSet);
  }

  getAllIngredients(): string[] {
    return this.ingredientsCache;
  }
}
