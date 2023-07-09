import "./UserCartPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart, selectCart } from "../../slices/cartSlice";
import { useParams } from "react-router-dom";
import CartItem from "./CartItem";
import { motion, AnimatePresence } from "framer-motion";

function UserCartPage() {
  const [isQuantityUpdated, setIsQuantityUpdated] = useState(false);
  const [itemUpdate, setItemUpdate] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(selectCart)?.cartData;

  const cartTotal = data.reduce(
    (total, item) => total + parseFloat(item.total_price),
    0
  );

  useEffect(() => {
    dispatch(fetchUserCart(id));
    if (isQuantityUpdated) {
      setItemUpdate(true);
      setTimeout(() => {
        setItemUpdate(false);
      }, 2000);
    }
    setIsQuantityUpdated(false);
  }, [dispatch, id, isQuantityUpdated]);

  return (
    <>
      <div className="user-cart-page-container">
        <div className="user-cart-page-div">
          <div className="user-cart-page-div-header">
            <span></span>
            <p className="header-item">item name</p>
            <p className="header-quantity">quantity</p>
          </div>
          {data &&
            data.map((item) => {
              return (
                <CartItem
                  item={item}
                  key={item.id}
                  onQuantityUpdate={() => setIsQuantityUpdated(true)}
                />
              );
            })}
          <div className="user-cart-page-footer">
            <AnimatePresence>
              {itemUpdate && (
                <motion.div
                  className="item-update-response"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.p
                    className="item-update"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Item Updated successfully
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="cart-total">
              <p>Cart Total : ${cartTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="check-out-button-div">
          <button className="check-out-button">Check-Out</button>
        </div>
      </div>
    </>
  );
}

export default UserCartPage;
