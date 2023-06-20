import "./NavBar.css";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import { menuVariants, listVariant } from "./NavBarVariants";
import { fetchUserData, resetAuth, selectUser } from "../../slices/userSlice";

function NavBar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const data = useSelector(selectUser).data[0];
  const user_id = Cookies.get("user_id");

  const handleLogOutClick = async (event) => {
    event.preventDefault();
    try {
      await axios.get(
        "https://houseoffashion-weerawarnagayan.b4a.run/users/logout"
      );
      Cookies.remove("user_id");
      dispatch(resetAuth());
    } catch (error) {
      throw error;
    }
  };

  const handleHamburgerClick = () => {
    const menu = document.querySelector(".nav-links");
    menu.classList.toggle("open");
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchUserData(user_id));
  }, [user_id, dispatch]);

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
            <h1>{isMobile ? "H . O . F" : "House Of Fashion"}</h1>
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
              <motion.li variants={listVariant}>Log in</motion.li>
            </Link>
          ) : (
            <Link className="link" to={`/profile/${user_id}`}>
              <motion.li variants={listVariant}>Profile - {data?.firstname}</motion.li>
            </Link>
          )}
          <motion.li variants={listVariant}>New arrivals</motion.li>
          <motion.li variants={listVariant}>Mens</motion.li>
          <motion.li variants={listVariant}>Womens</motion.li>
          <motion.li variants={listVariant}>Kids</motion.li>
          {!user_id ? null : <motion.li variants={listVariant} onClick={handleLogOutClick}>Log Out</motion.li>}
        </motion.ul>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
