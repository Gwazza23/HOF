import React from "react";
import "./ExploreMore.css";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'

function CategoryCard({ category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.id}`);
  };

  return (
    <motion.div whileHover={{outline: '1.5px solid black'}} onClick={handleClick} className="category-card">
      <h3>{category.category_name}</h3>
    </motion.div>
  );
}

export default CategoryCard;
