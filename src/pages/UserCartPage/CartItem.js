import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../slices/cartSlice";

function CartItem({ item, onQuantityUpdate }) {
  const dispatch = useDispatch();
  let initialQuantity = item.quantity;
  let [quantity, setQuantity] = useState(item.quantity);

  const handleRemoveItem = async () => {
    try {
      await axios.delete(`https://house-of-fashion.onrender.com/cart/${item.id}`, {
        withCredentials: true,
      });
      dispatch(removeItemFromCart(item.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQuantity = async () => {
    if (quantity === 0) {
      handleRemoveItem();
    }
    try {
      await axios.put(
        `https://house-of-fashion.onrender.com/cart`,
        {
          product_id: item.id,
          quantity: quantity,
        },
        {
          withCredentials: true,
        }
      );
      onQuantityUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = () => {
    let newQuantity = quantity + 1;
    if (newQuantity > item.max_quantity) {
      setQuantity(quantity);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    let newQuantity = quantity - 1;
    if (newQuantity < 0) {
      setQuantity(0);
    } else {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="user-cart-page-item-div">
      <link rel="preload" as="image" href={item.img_url} />
      <img src={item.img_url} alt={item.name} />
      <h4>{item.name}</h4>
      <div className="user-cart-page-item-quantity-div">
        <span className="increase-quanitity" onClick={increaseQuantity}>
          <FontAwesomeIcon icon={faAngleUp} />
        </span>
        <p>{quantity}</p>
        <span className="decrease-quantity" onClick={decreaseQuantity}>
          <FontAwesomeIcon icon={faAngleDown} />
        </span>
        {initialQuantity !== quantity ? (
          <button className="quantity-button" onClick={handleUpdateQuantity}>
            {" "}
            update
          </button>
        ) : null}
      </div>
      <button onClick={handleRemoveItem} className="remove-item">
        x
      </button>
    </div>
  );
}

export default CartItem;
