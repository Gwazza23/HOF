import "./NewReleases.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, selectProducts } from "../../slices/productsSlice";
import ItemCard from "../../util/ItemCard";

function NewReleases() {
  const dispatch = useDispatch();
  const data = useSelector(selectProducts).productData.slice(0, 3);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <div className="new-releases-div">
      <h2>New Releases</h2>
      <div className="new-releases-cards">
        {data &&
          data.map((item) => {
            return <ItemCard item={item} key={item.id} />;
          })}
      </div>
    </div>
  );
}

export default NewReleases;
