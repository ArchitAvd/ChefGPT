"use client";
import { useState } from "react";
import IngredientSearch from "@/src/app/components/recipe/IngredientSearch";

const ingredients = [
  "Tomato",
  "Onion",
  "Garlic",
  "Potato",
  "Carrot",
  "Pepper",
  "Salt",
  "Sugar",
  "Ginger",
  "Coriander",
  "Rice",
  "Pasta",
  "Olive Oil",
  "Lemon",
  "Chicken",
  "Beef",
  "Fish",
  "Eggs",
  "Milk",
  "Cheese",
  "Bread",
  "Butter",
  "Basil",
  "Mushroom",
  "Bell Pepper",
  "Spinach",
  "Cucumber",
  "Lettuce",
  "Avocado",
];

const AddRecipeSection = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");
  const [calories, setCalories] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [prepTime, setPrepTime] = useState("");
  const [servings, setServings] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSelectIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient));
  };

  const handleRestrictionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setDietaryRestrictions([...dietaryRestrictions, value]);
    } else {
      setDietaryRestrictions(dietaryRestrictions.filter((r) => r !== value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Form validation
    if (selectedIngredients.length === 0) {
      setSubmitMessage({
        type: "error",
        text: "Please add at least one ingredient.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const recipeData = {
        title: recipeTitle,
        ingredients: selectedIngredients,
        instructions,
        calories_per_serving: parseInt(calories),
        difficulty,
        prep_time: prepTime,
        servings: parseInt(servings),
        dietary_restrictions: dietaryRestrictions,
        image_url: imageUrl,
        user_email: userEmail,
      };

      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }

      // Reset form
      setRecipeTitle("");
      setSelectedIngredients([]);
      setInstructions("");
      setCalories("");
      setDifficulty("easy");
      setPrepTime("");
      setServings("");
      setImageUrl("");
      setDietaryRestrictions([]);

      setSubmitMessage({ type: "success", text: "Recipe added successfully!" });
    } catch (error) {
      console.error("Error adding recipe:", error);
      setSubmitMessage({
        type: "error",
        text: "An error occurred while adding the recipe. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="add-section" className="section">
      <div className="search-container">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          <i className="fas fa-plus-circle text-rose-500"></i> Add Your Recipe
        </h2>

        {submitMessage && (
          <div
            className={`p-4 mb-4 rounded-lg ${
              submitMessage.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitMessage.text}
          </div>
        )}

        <form
          id="addRecipeForm"
          className="recipe-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="recipeTitle">Recipe Title</label>
            <input
              type="text"
              id="recipeTitle"
              required
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <IngredientSearch
              allIngredients={ingredients}
              selectedIngredients={selectedIngredients}
              onSelectIngredient={handleSelectIngredient}
              onRemoveIngredient={handleRemoveIngredient}
            />
          </div>

          <div className="form-group">
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              required
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={5}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="calories">Calories per Serving</label>
            <input
              type="number"
              id="calories"
              required
              min="0"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">Difficulty Level</label>
            <select
              id="difficulty"
              required
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="prepTime">Preparation Time</label>
            <input
              type="text"
              id="prepTime"
              required
              placeholder="e.g., 30 mins"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="servings">Number of Servings</label>
            <input
              type="number"
              id="servings"
              required
              min="1"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Dietary Restrictions</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="dietary_restrictions"
                  value="vegetarian"
                  checked={dietaryRestrictions.includes("vegetarian")}
                  onChange={handleRestrictionChange}
                />{" "}
                Vegetarian
              </label>
              <label>
                <input
                  type="checkbox"
                  name="dietary_restrictions"
                  value="vegan"
                  checked={dietaryRestrictions.includes("vegan")}
                  onChange={handleRestrictionChange}
                />{" "}
                Vegan
              </label>
              <label>
                <input
                  type="checkbox"
                  name="dietary_restrictions"
                  value="gluten-free"
                  checked={dietaryRestrictions.includes("gluten-free")}
                  onChange={handleRestrictionChange}
                />{" "}
                Gluten-Free
              </label>
              <label>
                <input
                  type="checkbox"
                  name="dietary_restrictions"
                  value="healthy"
                  checked={dietaryRestrictions.includes("healthy")}
                  onChange={handleRestrictionChange}
                />{" "}
                Healthy
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="userEmail">Your Email</label>
            <input
              type="email"
              id="userEmail"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>

          <div className="submit-button-container">
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              <i className="fas fa-plus-circle"></i>
              <span>{isSubmitting ? "Adding..." : "Add Recipe"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeSection;
