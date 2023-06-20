import "./NavBar.css";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { menuVariants } from "./NavBarVariants";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
          <Link className="link" to={"/login"}>
            <li>Log in</li>
          </Link>
          <li>New arrivals</li>
          <li>Mens</li>
          <li>Womens</li>
          <li>Kids</li>
        </motion.ul>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
