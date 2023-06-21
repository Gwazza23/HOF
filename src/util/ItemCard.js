import "./ItemCard.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function ItemCard({ item }) {
  const [mouseOn, setMouseOn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsAnimationEnabled(windowWidth >= 430);
  }, [windowWidth]);

  const handleMouseEnter = () => {
    setMouseOn(!mouseOn);
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
      whileHover={isAnimationEnabled ? "hover" : ""}
      whileFocus={isAnimationEnabled ? "hover" : ""}
      initial={isAnimationEnabled ? "initial" : ""}
      className="item-card-div"
    >
      <img src={item.img_url} alt={item.name} />
      <motion.p variants={pVariant}>{item.name}</motion.p>
      <motion.p variants={pVariant} className="item-price">
        {item.price}
      </motion.p>
      {windowWidth >= 430 && (
        <motion.p
          className="buy-now"
          variants={buyNowVariant}
          initial={isAnimationEnabled ? "initial" : ""}
          animate={isAnimationEnabled ? (mouseOn ? "visible" : "hidden") : ""}
        >
          In-Stock: {item.quantity}
        </motion.p>
      )}
    </motion.div>
  );
}

export default ItemCard;
