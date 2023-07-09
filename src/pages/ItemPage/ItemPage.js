import "./ItemPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct, selectProducts } from "../../slices/productsSlice";
import { motion } from "framer-motion";
import LoadingPage from "../../util/LoadingPage";
import axios from "axios";

function ItemPage() {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const { id } = useParams();
  const status = useSelector(selectProducts)?.status;
  const data = useSelector(selectProducts)?.itemData[0];
  const price = parseFloat(data?.price.replace("$", ""));

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!quantity) {
      setErrorMessage("Please select a quantity");
    }
    try {
      const response = await axios.post(
        `https://house-of-fashion.onrender.com/cart/`,
        {
          product_id: id,
          quantity,
          price,
        },
        {
          withCredentials: true,
        }
      );
      setErrorMessage(false);
      setSuccessMessage(response?.data);
    } catch (error) {
      setSuccessMessage(false);
      setErrorMessage(error.response?.data);
    }
  };

  const handleArrowClick = () => {
    setOpen(!open);
  };

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    setOpen(window.innerWidth >= 430);
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [id, dispatch]);

  useEffect(() => {
    setOpen(windowWidth >= 430);
  }, [windowWidth]);

  if (status === "idle" || status === "Loading") {
    return <LoadingPage />
  }

  return (
    data && (
      <>
        <div className="item-page-container">
          <div className="item-page-div">
            <div className="item-page-header">
              <h2>{data?.name}</h2>
            </div>
            <div className="wide-view-container">
              <div className="item-page-image">
                <link rel="preload" as="image" href={data?.img_url} />
                <img src={data?.img_url} alt="Item" />
              </div>
              <div className="item-page-description">
                <div className="item-page-description-header">
                  <h3>Item description</h3>{" "}
                  {windowWidth < 430 ? (
                    open ? (
                      <span onClick={handleArrowClick} className="up arrow">
                        &#8963;
                      </span>
                    ) : (
                      <span onClick={handleArrowClick} className="down arrow">
                        &#8964;
                      </span>
                    )
                  ) : null}
                </div>
                <motion.p
                  className={`item-description ${
                    windowWidth < 430 || open ? "open" : ""
                  }`}
                  initial={false}
                  animate={{ height: open ? "auto" : 0, overflow: "hidden" }}
                  transition={{ duration: 0.3 }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </motion.p>
              </div>
            </div>
            <div className="item-page-price">
              <h3>Price: {data?.price}</h3>
            </div>
          </div>
          <div className="item-page-buy-out">
            <div className="item-page-quantity">
              <h3>Select Amount - {data?.quantity} in stock</h3>
              <p>
                quantity:{" "}
                <input
                  min={"1"}
                  max={data?.quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  type="number"
                />
              </p>
              <p>Total = ${quantity * price}</p>
            </div>
            <div className="item-page-button">
              <button onClick={handleAddToCart}>Add To Cart</button>
            </div>
            {successMessage ? (
              <p className="response">{successMessage}</p>
            ) : null}
            {errorMessage ? <p className="error">{errorMessage}</p> : null}
          </div>
        </div>
      </>
    )
  );
}

export default ItemPage;
