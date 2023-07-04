import "./CategoryPage.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { wrapperVariants } from "../../util/transitionVariants";
import { fetchCategory, selectProducts } from "../../slices/productsSlice";
import ItemCard from '../../util/ItemCard'
import LoadingPage from '../../util/LoadingPage'

function CategoryPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const status = useSelector(selectProducts).status;
  const data = useSelector(selectProducts).categoryData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, id]);


  if(status === 'idle' || status === 'Loading') {
    return <LoadingPage />
  }

  return (
    <div className="category-page-container">
      <motion.div variants={wrapperVariants} initial='initial' animate='animate' exit='exit' className="category-page-div">
          <div className="category-page-header">
            <h3>{data&&data[0]&&data[0].category_name}</h3>
          </div>
          <div className="category-page-items-div">
            { data && data.map((item) => {
              return ( <ItemCard item={item} key={item.id}/> )
            })}
          </div>
      </motion.div>
    </div>
  );
}

export default CategoryPage;
