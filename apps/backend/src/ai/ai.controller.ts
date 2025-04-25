import { Controller, Get, Query } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('generate')
  async generateRecipe(
    @Query('ingredients') ingredients: string,
    @Query('dietary') dietary: string,
  ) {
    const ingredientList = ingredients?.split(',') ?? [];
    const dietaryList = dietary?.split(',') ?? [];

    const recipe = await this.aiService.generateRecipe(
      ingredientList,
      dietaryList,
    );
    return recipe;
  }
}
