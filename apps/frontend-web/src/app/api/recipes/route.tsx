import { NextRequest, NextResponse } from "next/server";
import { Recipe } from "@/app/types";

// Mock recipes data - in a real app, this would come from a database
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
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ingredients = searchParams.get("ingredients");
    const restrictions = searchParams.get("restrictions");

    // If no parameters are provided, return all recipes
    if (!ingredients && !restrictions) {
      return NextResponse.json(mockRecipes);
    }

    // Filter recipes based on ingredients and restrictions
    let filteredRecipes = [...mockRecipes];

    if (ingredients) {
      const ingredientList = ingredients.toLowerCase().split(",");
      // In a real app, we would use a more sophisticated matching algorithm
      // For now, we'll just check if any of the ingredients match
      filteredRecipes = filteredRecipes.filter((recipe) =>
        ingredientList.some(
          (ing) =>
            recipe.title.toLowerCase().includes(ing) ||
            recipe.instructions.toLowerCase().includes(ing)
        )
      );
    }

    if (restrictions && restrictions !== "all") {
      filteredRecipes = filteredRecipes.filter(
        (recipe) =>
          recipe.dietary_restrictions &&
          recipe.dietary_restrictions.includes(restrictions)
      );
    }

    return NextResponse.json(filteredRecipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const recipeData = await request.json();

    // In a real app, we would validate the data and save it to a database
    // For now, we'll just return a success message
    console.log("Received recipe data:", recipeData);

    // Simulate a successful save by returning a mock recipe with an ID
    const newRecipe = {
      _id: Date.now().toString(),
      ...recipeData,
    };

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error("Error adding recipe:", error);
    return NextResponse.json(
      { error: "Failed to add recipe" },
      { status: 500 }
    );
  }
}
