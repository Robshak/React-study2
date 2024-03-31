import Button from "../../components/Button/Button";
import styles from "./Menu.module.css";
import { Link, Outlet } from "react-router-dom";

export function Layout() {
    return <div className={styles["layout"]}>
        <div className={styles["left-menu"]}>
            <img className={styles["user-avatar"]} src="/avatar.svg" alt="" />
            <div className={styles["user-info"]}>
                <div className={styles["user-name"]}>Robshak</div>
                <div className={styles["user-email"]}>alaricode@ya.ru</div>
            </div>
            <div className={styles["urls-block"]}>
                <Link to="/">
                    <img src="/Menu.svg" alt="" />
                    <div>Menu</div>
                </Link>
                <Link to="/cart">
                    <img src="/Cart.svg" alt="" />
                    <div>Cart</div>
                </Link>
            </div>
            <Button sizeType="small">
                <img src="/Exit.svg" alt="" />
                <div>Exit</div>
            </Button>
        </div>
        <div>
            <Outlet></Outlet>
        </div>
    </div>;
}