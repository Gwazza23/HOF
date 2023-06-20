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

import { menuVariants } from "./NavBarVariants";
import { fetchUserData, resetAuth, selectUser } from "../../slices/userSlice";

function NavBar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const data = useSelector(selectUser).data[0];
  const user_id = Cookies.get("user_id");

  const handleLogOutClick = async(event) => {
    event.preventDefault();
    try{
      await axios.get("https://houseoffashion-weerawarnagayan.b4a.run/users/logout");
      Cookies.remove("user_id");
      dispatch(resetAuth());
    }catch(error){
      throw error;
    }
  }

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
          className={`nav-links ${open ? "open" : ""}`}
          variants={menuVariants}
          initial={"closed"}
          animate={open ? "open" : "closed"}
          transition={{ stiffness: 100, duration: 0.4 }}
        >
          {!user_id ? (
            <Link className="link" to={"/login"}>
              <li>Log in</li>
            </Link>
          ) : (
            <Link className="link" to={`/profile/${user_id}`}><li>Profile - {data?.firstname}</li></Link>
          )}
          <li>New arrivals</li>
          <li>Mens</li>
          <li>Womens</li>
          <li>Kids</li>
          {!user_id ? ( null ) : ( <li onClick={handleLogOutClick}>Log Out</li>)}
        </motion.ul>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
