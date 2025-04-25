"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Recipe } from "../types";

export default function GeneratedRecipePage() {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("generatedRecipe")) {
      const storedRecipe = sessionStorage.getItem("generatedRecipe");
      setRecipe(storedRecipe ? (JSON.parse(storedRecipe) as Recipe) : null);
    } else {
      router.push("/"); // redirect if accessed directly
    }
  }, [router]);

  const goBack = () => {
    router.back();
  };

  if (!recipe) return <div>Loading or no recipe...</div>;

  const {
    title,
    name,
    image_url,
    prep_time,
    calories,
    calories_per_serving,
    servings,
    instructions,
    dietary_restrictions,
    dietaryRestrictions,
    difficulty,
  } = recipe;

  // Use the appropriate property based on what's available
  const displayTitle = title || name;
  const displayCalories = calories || calories_per_serving;
  const displayRestrictions = dietary_restrictions || dietaryRestrictions || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={goBack}
          className="mb-4 flex items-center text-gray-600 hover:text-rose-500 transition"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to recipes
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {image_url && (
            <div className="relative w-full h-80">
              <Image
                src={
                  "https://www.occstrategy.com/wp-content/uploads/2024/11/iStock-852068056.jpg"
                }
                alt={displayTitle}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {displayTitle}
            </h1>

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center text-gray-600">
                <i className="fas fa-clock mr-2 text-rose-500"></i>
                <span>{prep_time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <i className="fas fa-fire mr-2 text-rose-500"></i>
                <span>{displayCalories} cal per serving</span>
              </div>
              <div className="flex items-center text-gray-600">
                <i className="fas fa-utensils mr-2 text-rose-500"></i>
                <span>{servings} servings</span>
              </div>
              {difficulty && (
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-chart-line mr-2 text-rose-500"></i>
                  <span>Difficulty: {difficulty}</span>
                </div>
              )}
            </div>

            {displayRestrictions.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Dietary Information
                </h2>
                <div className="flex flex-wrap gap-2">
                  {displayRestrictions.map((restriction) => (
                    <span
                      key={restriction}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {restriction}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Instructions
              </h2>

              {Array.isArray(instructions) ? (
                <ol className="list-decimal list-inside text-gray-600 space-y-2">
                  {instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-600 whitespace-pre-line">
                  {instructions}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={goBack}
                className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-6 py-2 rounded-lg transition"
              >
                Back to recipes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
