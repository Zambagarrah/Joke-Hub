import React from 'react';

type CategorySelectorProps = {
  selected: string; // Current selected category
  onSelect: (category: string) => void; // Callback to update selection
};

// List of joke categories
const categories = ['Dark', 'Dad', 'Pun', 'Programming', 'Misc'];

const CategorySelector: React.FC<CategorySelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="mb-4">
      {/* Heading */}
      <h4>Choose Your Joke Category:</h4>

      {/* Render category buttons */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn btn-outline-primary ${
              selected === category ? 'active' : ''
            }`}
            onClick={() => onSelect(category)} // Update selected category
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
