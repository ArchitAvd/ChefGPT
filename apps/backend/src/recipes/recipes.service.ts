import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe, RecipeDocument } from './schemas/recipe.schema';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {}

  async getRecipes(ingredientsQuery: string, restriction: string) {
    const ingredients = (ingredientsQuery || '')
      .split(',')
      .map((i) => i.trim().toLowerCase())
      .filter(Boolean);

    const filter: any = {};

    if (ingredients.length) {
      // Build an array of conditions for each ingredient
      filter.$and = ingredients.map((ingredient) => ({
        'ingredients.name': { $regex: new RegExp(`^${ingredient}$`, 'i') },
      }));
    }

    if (restriction && restriction.toLowerCase() !== 'all') {
      filter.dietaryRestrictions = {
        $regex: new RegExp(`^${restriction}$`, 'i'),
      };
    }

    return this.recipeModel
      .find(filter, {
        name: 1,
        image_url: 1,
        prep_time: 1,
        servings: 1,
        calories_per_serving: 1,
        dietaryRestrictions: 1,
      })
      .exec();
  }

  async getRandomRecipe() {
    const [randomRecipe] = await this.recipeModel
      .aggregate([
        { $sample: { size: 1 } },
        {
          $project: {
            name: 1,
            image_url: 1,
            prep_time: 1,
            servings: 1,
            calories_per_serving: 1,
            dietaryRestrictions: 1,
          },
        },
      ])
      .exec();

    return randomRecipe || null;
  }
}
