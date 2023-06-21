import "./ItemCard.css";
import { useState } from "react";
import { motion } from "framer-motion";

function ItemCard({ item }) {
  const [mouseOn, SetMouseOn] = useState(false);

  const handleMouseEnter = () => {
    SetMouseOn(!mouseOn);
  };
  const divVariant = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1,
    },
  };

  const pVariant = {
    initial: {
      marginLeft: "auto",
    },
    hover: {
      marginLeft: 0,
    },
  };

  const buyNowVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };
  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseEnter}
      variants={divVariant}
      whileHover={"hover"}
      initial={"initial"}
      className="item-card-div"
    >
      <img src={item.img_url} alt={item.name} />
      <motion.p variants={pVariant}>{item.name}</motion.p>
      <motion.p variants={pVariant} className="item-price">
        {item.price}
      </motion.p>
      <motion.p className="buy-now" variants={buyNowVariant} initial='initial' animate={mouseOn? 'visible' : 'hidden'}>In-Stock:{item.quantity}</motion.p>
    </motion.div>
  );
}

export default ItemCard;
