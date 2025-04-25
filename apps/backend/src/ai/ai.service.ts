import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {
  private readonly ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async generateRecipe(
    userIngredients: string[],
    dietaryRestrictions: string[],
  ): Promise<any> {
    const prompt = `
Create a recipe in the following strict JSON format. Only return JSON. 
Use the user-provided ingredients and dietary restrictions where possible.

{
  "name": "<recipe name>",
  "instructions": ["<step1>", "<step2>", "..."],
  "calories_per_serving": <number>,
  "difficulty_level": "<Easy|Medium|Hard>",
  "prep_time": "<time in minutes with 'mins'>",
  "servings": <number>,
  "dietaryRestrictions": ["<e.g. vegetarian, gluten-free, etc.>"],
  "image_url": "<realistic image URL>",
  "video_url": null,
  "ingredients": [
    {
      "name": "<ingredient name>",
      "quantity": <number>,
      "unit": "<g|pieces|cups|tbsp|...>"
    }
    // add more ingredients here
  ]
}

User ingredients: ${userIngredients.join(', ')}
User dietary restrictions: ${dietaryRestrictions.join(', ')}

Generate a recipe that fits these constraints.
`;

    const result = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    let rawText = result.text;

    // Remove ```json or ``` if present
    rawText = rawText ? rawText.trim() : '';
    if (rawText.startsWith('```')) {
      rawText = rawText.replace(/^```json\n?|```[\s\n]?$/g, '').trim();
    }

    const jsonText = rawText;

    try {
      if (!jsonText) {
        throw new Error('AI response is undefined or empty.');
      }
      console.log(jsonText);
      return JSON.parse(jsonText);
    } catch (err) {
      throw new Error('Failed to parse AI response into JSON.');
    }
  }
}
