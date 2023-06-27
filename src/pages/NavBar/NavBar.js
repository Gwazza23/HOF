import "./NavBar.css";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import { menuVariants, listVariant } from "./NavBarVariants";
import { fetchUserData, resetAuth, selectUser } from "../../slices/userSlice";
import { fetchAllCategories, selectProducts } from "../../slices/productsSlice";

function NavBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const data = useSelector(selectUser).data[0];
  const user_id = Cookies.get("user_id");
  const categories = useSelector(selectProducts).categoriesData;

  const handleLogOutClick = async (event) => {
    event.preventDefault();
    try {
      await axios.get(
        "https://house-of-fashion.onrender.com/users/logout"
      );
      Cookies.remove("user_id");
      dispatch(resetAuth());
    } catch (error) {
      throw error;
    }
  };

  const handleHamburgerClick = () => {
    const menu = document.querySelector(".nav-links");
    const body = document.querySelector("body");
    menu.classList.toggle("open");
    setOpen(!open);
    body.classList.toggle("scroll-lock");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 574);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchUserData(user_id));
    dispatch(fetchAllCategories());
  }, [user_id, dispatch]);

  useEffect(() => {
    setOpen(false);
    document.querySelector("body").classList.remove("scroll-lock");
  }, [location.pathname])


  return (
    <>
      <nav>
        <div className="nav-header-mobile">
          <div className="hamburger" onClick={handleHamburgerClick}>
            {!open ? (
              <FontAwesomeIcon icon={faBars} />
            ) : (
              <FontAwesomeIcon icon={faX} />
            )}
          </div>
          <div className="nav-logo">
            <Link className="link" to={"/"}>
              <h1>{isMobile ? "H . O . F" : "House Of Fashion"}</h1>
            </Link>
          </div>
        </div>
        <motion.ul
          className={`nav-links`}
          variants={menuVariants}
          initial={"closed"}
          animate={open ? "open" : "closed"}
        >
          {!user_id ? (
            <Link className="link" to={"/login"}>
              <motion.li className="bold" variants={listVariant}>
                Log in
              </motion.li>
            </Link>
          ) : (
            <Link className="link" to={`/profile/${user_id}`}>
              <motion.li className="bold" variants={listVariant}>
                Profile - {data?.firstname}
              </motion.li>
            </Link>
          )}
          {categories &&
            categories.map((category) => {
              return (
                <Link key={category.id} className="link" to={`/category/${category.id}`}>
                  <motion.li variants={listVariant}>
                    {category.category_name}
                  </motion.li>
                </Link>
              );
            })}
          {!user_id ? null : (
            <motion.li
              className="bold"
              variants={listVariant}
              onClick={handleLogOutClick}
            >
              Log Out
            </motion.li>
          )}
        </motion.ul>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
