import { Recipe } from "@/src/app/types";
import Image from "next/image";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
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
  } = recipe;

  // Use the appropriate property based on what's available
  const displayTitle = title || name;
  const displayCalories = calories || calories_per_serving;
  const displayRestrictions = dietary_restrictions || dietaryRestrictions || [];

  return (
    <div className="recipe-card" onClick={onClick}>
      {image_url && (
        <div className="relative w-full h-48">
          <Image
            src={image_url}
            alt={displayTitle}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="recipe-content">
        <h3 className="recipe-title">{displayTitle}</h3>
        <div className="recipe-meta">
          <span>
            <i className="fas fa-clock"></i> {prep_time}
          </span>
          <span>
            <i className="fas fa-fire"></i> {displayCalories} cal
          </span>
          <span>
            <i className="fas fa-utensils"></i> {servings} servings
          </span>
        </div>
        {instructions && (
          <p className="recipe-description">
            {instructions.substring(0, 150)}...
          </p>
        )}
        {displayRestrictions.length > 0 && (
          <div className="recipe-tags">
            {displayRestrictions.map((restriction) => (
              <span key={restriction} className="tag">
                {restriction}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
