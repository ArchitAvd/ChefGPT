import { NextRequest, NextResponse } from "next/server";
import { Recipe } from "@/src/app/types";

const mockRecipes: Recipe[] = [
  {
    _id: "1",
    name: "Tomato Basil Pasta",
    title: "Tomato Basil Pasta",
    image_url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    prep_time: "30 mins",
    calories: 450,
    calories_per_serving: 450,
    servings: 4,
    dietary_restrictions: ["vegetarian"],
    instructions:
      "Cook pasta according to package instructions. In a separate pan, sauté garlic in olive oil. Add diced tomatoes and cook until softened. Add fresh basil, salt, and pepper. Toss with cooked pasta and serve with grated cheese.",
    difficulty: "easy",
  },
  {
    _id: "2",
    name: "Chicken Stir Fry",
    title: "Chicken Stir Fry",
    image_url: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    prep_time: "25 mins",
    calories: 380,
    calories_per_serving: 380,
    servings: 3,
    dietary_restrictions: ["healthy"],
    instructions:
      "Dice chicken breast and vegetables. Heat oil in a wok, add chicken and cook until no longer pink. Add vegetables and stir fry until tender-crisp. Mix soy sauce, ginger, and garlic in a separate bowl, then add to the wok. Serve hot with rice.",
    difficulty: "medium",
  },
  {
    _id: "3",
    name: "Vegetable Curry",
    title: "Vegetable Curry",
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
    prep_time: "45 mins",
    calories: 320,
    calories_per_serving: 320,
    servings: 4,
    dietary_restrictions: ["vegetarian", "vegan", "gluten-free"],
    instructions:
      "Sauté onions, garlic, and ginger in oil. Add curry powder and spices, cooking until fragrant. Add diced vegetables and coconut milk. Simmer until vegetables are tender and sauce thickens. Serve with rice or naan bread.",
    difficulty: "medium",
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const recipeId = params.id;
    const recipe = mockRecipes.find((r) => r._id === recipeId);

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}
