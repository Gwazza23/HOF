import "./NavBar.css";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

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
            <h1>{isMobile? "H . O . F" : "House Of Fashion"}</h1>
          </div>
        </div>
        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li>Log in</li>
          <li>New arrivals</li>
          <li>Mens</li>
          <li>Womens</li>
          <li>Kids</li>
        </ul>
      </nav>
      {!open ? <Outlet /> : ""}
    </>
  );
}

export default NavBar;
