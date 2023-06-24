import "./CategoryPage.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { wrapperVariants } from "../../util/transitionVariants";

function CategoryPage() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      variants={wrapperVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="test"
    >
      CategoryPage {id}
    </motion.div>
  );
}

export default CategoryPage;
