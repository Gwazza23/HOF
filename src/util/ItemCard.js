import "./ItemCard.css";
import { motion } from "framer-motion";
import { cardVariant, pVariants, stockVariant } from "./ItemCardVariants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ItemCard({ item }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/item/${item.id}`)
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      variants={cardVariant}
      initial="initial"
      whileHover="hover"
      onClick={handleItemClick}
      className="item-card-div"
    >
      <img src={item.img_url} alt={item.name} />
      <motion.p variants={windowWidth >= 430 ? pVariants : null}>
        {item.name}
      </motion.p>
      <motion.p
        variants={windowWidth >= 430 ? pVariants : null}
        className="item-price"
      >
        {item.price}
      </motion.p>
      {windowWidth >= 430 ? (
        <motion.p variants={stockVariant} className="buy-now">
          In-Stock: {item.quantity}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

export default ItemCard;
