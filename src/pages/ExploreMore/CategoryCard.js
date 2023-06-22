import React from 'react';
import './ExploreMore.css';

function CategoryCard({ category }) {
    
  return (
    <div className="category-card">
      <h3>{category.category_name}</h3>
    </div>
  );
}

export default CategoryCard;
