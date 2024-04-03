import Button from "../../components/Button/Button";
import styles from "./Menu.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getUserData, userActions } from "../../store/user.slice";
import { useEffect } from "react";

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { profileData } = useSelector((s: RootState) => s.user);
    const items = useSelector((s: RootState) => s.cart.items);

    const onExit = () => {
        dispatch(userActions.logout());
        navigate("/auth/login");
    };

    useEffect(() => {
        dispatch(getUserData());
    });

    return <div className={styles["layout"]}>
        <div className={styles["left-menu"]}>
            <div className={styles["top-part"]}>
                <img className={styles["user-avatar"]} src="/avatar.svg" alt="" />
                <div className={styles["user-info"]}>
                    <div className={styles["user-name"]}>{profileData?.name}</div>
                    <div className={styles["user-email"]}>{profileData?.email}</div>
                </div>
                <div className={styles["urls-block"]}>
                    <NavLink className={({ isActive }) => cn(styles["link-block"], {
                        [styles["active"]]: isActive
                    })} to="/">
                        <img src="/Menu.svg" alt="" />
                        <div>Menu</div>
                    </NavLink>
                    <NavLink className={({ isActive }) => cn(styles["link-block"], {
                        [styles["active"]]: isActive
                    })} to="/cart">
                        <img src="/Cart.svg" alt="" />
                        <div>Cart</div>
                        <div className={styles["count-items"]}>{items.reduce((acc, item) => {
                            acc += item.count;
                            return acc;
                        }, 0)}</div>
                    </NavLink>
                </div>
            </div>
            <Button onClick={onExit} sizeType="small" className={styles["exit-button"]}>
                <img src="/Exit.svg" alt="" />
                <div>Exit</div>
            </Button>
        </div>
        <div className={styles["right-part"]}>
            <Outlet></Outlet>
        </div>
    </div>;
}