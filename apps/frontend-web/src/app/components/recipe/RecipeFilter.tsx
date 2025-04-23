"use client";

interface RecipeFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const RecipeFilter = ({ activeFilter, onFilterChange }: RecipeFilterProps) => {
  return (
    <div className="filter-section">
      <button
        className={`filter-button ${activeFilter === "all" ? "active" : ""}`}
        onClick={() => onFilterChange("all")}
      >
        <i className="fas fa-utensils"></i> All Recipes
      </button>
      <button
        className={`filter-button ${activeFilter === "vegetarian" ? "active" : ""}`}
        onClick={() => onFilterChange("vegetarian")}
      >
        <i className="fas fa-leaf"></i> Vegetarian
      </button>
      <button
        className={`filter-button ${activeFilter === "non-vegetarian" ? "active" : ""}`}
        onClick={() => onFilterChange("non-vegetarian")}
      >
        <i className="fas fa-drumstick-bite"></i> Non-Vegetarian
      </button>
      <button
        className={`filter-button ${activeFilter === "healthy" ? "active" : ""}`}
        onClick={() => onFilterChange("healthy")}
      >
        <i className="fas fa-heart"></i> Healthy
      </button>
      <button
        className={`filter-button ${activeFilter === "vegan" ? "active" : ""}`}
        onClick={() => onFilterChange("vegan")}
      >
        <i className="fas fa-seedling"></i> Vegan
      </button>
      <button
        className={`filter-button ${activeFilter === "gluten-free" ? "active" : ""}`}
        onClick={() => onFilterChange("gluten-free")}
      >
        <i className="fas fa-bread-slice"></i> Gluten-Free
      </button>
    </div>
  );
};

export default RecipeFilter;
