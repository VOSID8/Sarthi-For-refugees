import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./Styles/root.module.css"

function Root() {
  return (
    <>
        <Navbar />
        <main className={styles.main}>
            <Outlet />
        </main>
    </>
  )
}

export default Root
