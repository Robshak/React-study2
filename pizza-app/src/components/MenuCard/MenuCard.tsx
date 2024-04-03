import { Link } from "react-router-dom";
import styles from "./MenuCard.module.css";
import { MenuCardProps } from "./menuCard.props";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

function MenuCard({ name, price, imgSrc, rate, composition, id }: MenuCardProps) {
    const dispatch = useDispatch<AppDispatch>();

    const toCart = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(cartActions.add(id));
    };

    return <div className={styles["card"]}>
        <div className={styles["price-block"]}>
            <div className={styles["card-price"]}>
                <span className={styles["price-value"]}>{price}</span>
                <span className={styles["rub"]}>{" ₽"}</span>
            </div>
        </div>
        <div className={styles["rate-block"]}>
            <div className={styles["card-rate"]}>{rate}</div>
            <img className={styles["rate-img"]} src="/star.svg" alt="" />
        </div>
        <button onClick={toCart} className={styles["toCart-button"]}>
            <img className={styles["toCart-img"]} src="/toCart.svg" alt="" />
        </button>
        <Link to={`/product/${id}`}>
            <img className={styles["card-img"]} src={imgSrc} alt="" />
        </Link>
        <div className={styles["card-body"]}>
            <div className={styles["card-name"]}>{name}</div>
            <div className={styles["card-composition"]}>{composition}</div>
        </div>
    </div>;
}

export default MenuCard;