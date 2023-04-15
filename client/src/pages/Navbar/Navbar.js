import { Link } from "react-router-dom";

import styles from "./Styles/navbar.module.css";

import BasicMenu from "./components/dropdown";
import Person2Icon from "@mui/icons-material/Person2";
import logo from "./Images/logo.png";
import leaf from "./Images/leaf.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navItems}>
        <Link to="/">
          <img src={logo} alt="Image not found" className={styles.logo} />
        </Link>
        <Link to="/book-appointment">BOOK APPOINTMENT</Link>
        <Link to="/view-appointments">VIEW APPOINTMENTS</Link>
        <Link to="/contact-us">CONTACT US</Link>
        <Link to="/donate">DONATE</Link>
        {/* <div><Person2Icon /></div> */}
        <BasicMenu />
        {/* 
          <select value={<Person2Icon />}>
            <option value="1">Hello</option>
          </select> */}
          <img src={leaf} alt="leaf image" className={styles.leafimg}></img>
      </div>
    </nav>
  );
}

export default Navbar;
