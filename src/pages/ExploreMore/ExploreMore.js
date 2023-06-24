import "./ExploreMore.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCategories, selectProducts } from "../../slices/productsSlice";
import CategoryCard from "./CategoryCard";
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function ExploreMore() {
  const dispatch = useDispatch();
  const data = useSelector(selectProducts).categoriesData.slice(0, 3);
  const navigate = useNavigate();

  const handleClick= () => {
    navigate('/category')
  }

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <div className="explore-more-div">
      {data &&
        data.map((category) => {
          return <CategoryCard category={category} key={category.id} />;
        })}
      <motion.div whileHover={{outline: '1.5px solid black'}} onClick={handleClick} className="category-card more">
        <h3>MORE</h3>
      </motion.div>
    </div>
  );
}

export default ExploreMore;
