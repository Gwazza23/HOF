import "./ExploreMore.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCategories, selectProducts } from "../../slices/productsSlice";
import CategoryCard from "./CategoryCard";

function ExploreMore() {
  const dispatch = useDispatch();
  const data = useSelector(selectProducts).categoriesData.slice(0, 4);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <div className="explore-more-div">
      {data &&
        data.map((category) => {
          return <CategoryCard category={category} key={category.id} />;
        })}
    </div>
  );
}

export default ExploreMore;
