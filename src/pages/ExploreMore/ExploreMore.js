import "./ExploreMore.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCategories, selectProducts } from "../../slices/productsSlice";
import CategoryCard from "./CategoryCard";

function ExploreMore() {
  const dispatch = useDispatch();
  const data = useSelector(selectProducts).categoriesData.slice(0, 3);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <div className="explore-more-div">
      {data &&
        data.map((category) => {
          return <CategoryCard category={category} key={category.id} />;
        })}
      <div className="category-card">
        <h3>MORE</h3>
      </div>
    </div>
  );
}

export default ExploreMore;
