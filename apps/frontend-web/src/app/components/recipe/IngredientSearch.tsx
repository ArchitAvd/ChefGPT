"use client";
import { useState, useEffect, useRef } from "react";

interface IngredientSearchProps {
  allIngredients: string[];
  selectedIngredients: string[];
  onSelectIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
}

const IngredientSearch = ({
  allIngredients,
  selectedIngredients,
  onSelectIngredient,
  onRemoveIngredient,
}: IngredientSearchProps) => {
  const [query, setQuery] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredIngredients([]);
      setIsDropdownVisible(false);
      return;
    }

    const filtered = allIngredients.filter((ing) =>
      ing.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredIngredients(filtered);
    setIsDropdownVisible(filtered.length > 0);
  }, [query, allIngredients]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectIngredient = (ingredient: string) => {
    onSelectIngredient(ingredient);
    setQuery("");
    setIsDropdownVisible(false);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        id="ingredientSearch"
        className="search-input"
        placeholder="Search ingredients..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsDropdownVisible(filteredIngredients.length > 0)}
      />

      {isDropdownVisible && (
        <ul ref={dropdownRef} className="dropdown">
          {filteredIngredients.map((ingredient) => (
            <li
              key={ingredient}
              onClick={() => handleSelectIngredient(ingredient)}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      )}

      <div className="selected-ingredients">
        {selectedIngredients.map((ingredient) => (
          <div key={ingredient} className="ingredient-tag">
            {ingredient}
            <button onClick={() => onRemoveIngredient(ingredient)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientSearch;
