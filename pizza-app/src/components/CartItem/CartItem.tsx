import { useDispatch } from "react-redux";
import { CartItemProps } from "./CartItem.props";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import styles from "./CartItem.module.css";

function CartItem(props: CartItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const increase = () => {
        dispatch(cartActions.add(props.id));
    };

    const descrease = () => {
        dispatch(cartActions.remove(props.id));
    };

    const remove = () => {
        dispatch(cartActions.delete(props.id));
    };

    return <div className={styles["card"]}>
        <div className={styles["left-part"]}>
            <div className={styles["img-box"]}>
                <img className={styles["img"]} src={props.image} alt="" />
            </div>
            <div className={styles["product-info"]}>
                <div className={styles["card-name"]}>{props.name}</div>
                <div className={styles["card-price"]}>{props.price} ₽</div>
            </div>
        </div>
        <div className={styles["count-info"]}>
            <button onClick={descrease} className={styles["descrease"]}>
                <img src="/descrease.svg" alt="" />
            </button>
            <div className={styles["count"]}>
                {props.count}
            </div>
            <button onClick={increase} className={styles["increase"]}>
                <img src="/increase.svg" alt="" />
            </button>
            <button onClick={remove} className={styles["remove"]}>
                <img src="/remove.svg" alt="" />
            </button>
        </div>
    </div>;
}

export default CartItem;