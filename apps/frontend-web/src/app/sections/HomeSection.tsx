"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Recipe } from "@/src/app/types";
import IngredientSearch from "@/src/app/components/recipe/IngredientSearch";
import RecipeFilter from "@/src/app/components/recipe/RecipeFilter";
import RecipeCard from "@/src/app/components/recipe/RecipeCard";
import Loading from "@/src/app/components/ui/Loading";

const HomeSection = () => {
  const router = useRouter();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      const res = await fetch("/api/ingredients");
      const data = await res.json();
      setIngredients(data);
    };
    fetchIngredients();
  }, []);

  const handleSelectIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient));
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const searchRecipes = async () => {
    // Validate if there are selected ingredients
    if (selectedIngredients.length === 0) {
      setError("Please select at least one ingredient to find recipes.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const ingredientsParam = selectedIngredients.join(",");
      const restrictionsParam = activeFilter === "all" ? "" : activeFilter;

      const response = await fetch(
        `/api/recipes?ingredients=${encodeURIComponent(ingredientsParam)}&restrictions=${encodeURIComponent(restrictionsParam)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status}`);
      }

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("An error occurred while fetching recipes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRandomRecipe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/recipes/random");

      if (!response.ok) {
        throw new Error(`Failed to fetch a random recipe: ${response.status}`);
      }

      const data = await response.json();
      setRecipes([data]); // Replace current recipes with the random one
    } catch (error) {
      console.error("Error fetching random recipe:", error);
      setError(
        "An error occurred while fetching a random recipe. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeClick = (recipeId: string) => {
    router.push(`/recipe/${recipeId}`);
  };

  return (
    <div id="home-section" className="section">
      <div className="container">
        <div className="main-logo">
          <h1>
            <i className="fas fa-utensils"></i> ChefGPT
          </h1>
          <p>
            Discover delicious recipes based on your available ingredients! Just
            type and select ingredients below.
          </p>
        </div>

        <div className="search-container">
          <IngredientSearch
            allIngredients={ingredients}
            selectedIngredients={selectedIngredients}
            onSelectIngredient={handleSelectIngredient}
            onRemoveIngredient={handleRemoveIngredient}
          />

          <div className="filter-container">
            <RecipeFilter
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="search-actions">
            <button className="apply-button" onClick={searchRecipes}>
              <i className="fas fa-search"></i> Find Recipes
            </button>

            <button
              className="apply-button random-recipe"
              onClick={getRandomRecipe}
            >
              <i className="fas fa-random"></i> Surprise Me!
            </button>
          </div>
        </div>

        <Loading isLoading={isLoading} />

        {error && <p className="text-center text-gray-500 mt-4">{error}</p>}

        <div id="recipe-cards" className="recipe-list">
          {!isLoading &&
            recipes.length === 0 &&
            !error &&
            selectedIngredients.length > 0 && (
              <p className="text-center text-gray-500 col-span-full">
                No recipes found. Try adjusting your filters.
              </p>
            )}

          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
