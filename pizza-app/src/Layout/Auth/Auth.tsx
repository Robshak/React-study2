import { Outlet } from "react-router-dom";
import styles from "./Auth.module.css";
// import cn from "classnames";

function Auth() {
    return <div className={styles["layout"]}>
        <div className={styles["logo"]}>
            <img className={styles["logo-img"]} src="/logo.svg" alt="" />
        </div>
        <div className={styles["body"]}>
            <Outlet></Outlet>
        </div>
    </div>;
}

export default Auth;