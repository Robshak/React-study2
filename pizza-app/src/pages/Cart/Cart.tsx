import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Product } from "../../interfaces/product.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import CartItem from "../../components/CartItem/CartItem";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";
import styles from "./Cart.module.css";

const DELIVERY_FEE = 160;

export default function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((s: RootState) => s.cart.items);
    const navigate = useNavigate();

    const total = items.map(i => {
        const product = cartProducts.find(p => p.id == i.id);
        if (!product) {
            return 0;
        }
        return i.count * product.price;
    }).reduce((acc, i) => acc += i, 0);

    useEffect(() => {
        loadAllItems();
    }, [items]);

    const getItem = async (id: number) => {
        const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCartProducts(res);
    };

    const checkout = () => {
        if (items.length > 0) {
            dispatch(cartActions.clear());
            navigate("/success");
        }
    };

    return <div className={styles["cart"]}>
        <Header className={styles["page-header"]}>Cart</Header>
        <div className={styles["product-list"]}>
            {items.map(i => {
                const product = cartProducts.find(p => p.id == i.id);
                if (!product) {
                    return;
                }
                return <CartItem key={product.id} count={i.count} {...product}></CartItem>;
            })}
        </div>
        <div className={styles["checkout-info"]}>
            <div className={styles["checkout-block"]}>
                <div className={styles["checkout-header"]}>Sum</div>
                <div className={styles["checkout-price"]}>{total}<span className={styles["rub"]}> ₽</span></div>
            </div>
            <hr className={styles["separator"]} />
            <div className={styles["checkout-block"]}>
                <div className={styles["checkout-header"]}>Delivery</div>
                <div className={styles["checkout-price"]}>{DELIVERY_FEE} <span className={styles["rub"]}> ₽</span></div>
            </div>
            <hr className={styles["separator"]} />
            <div className={styles["checkout-block"]}>
                <div className={styles["checkout-header"]}>Total <span className={styles["products-count"]}>{`(${items.length})`}</span></div>
                <div className={styles["checkout-price"]}>{total + DELIVERY_FEE}<span className={styles["rub"]}> ₽</span></div>
            </div>
        </div>
        <Button className={styles["checkout-button"]} sizeType="big" onClick={checkout}>checkout</Button>
    </div>;
}