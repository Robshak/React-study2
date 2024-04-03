import { Await, useLoaderData, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";
import { Loading } from "../../Layout/Loading/Loading";
import styles from "./Product.module.css";
import Button from "../../components/Button/Button";
import CompositionList from "./CompositionList/ComposotionList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

function ProductPage() {
    const data = useLoaderData() as { data: Product };
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const backToMenu = () => {
        navigate("/");
    };

    return <div>
        <Suspense fallback={<Loading></Loading>}>
            <div className={styles["product-page"]}>
                <div className={styles["head"]}>
                    <button onClick={backToMenu} className={styles["back-button"]}>
                        <img src="/arrow.svg" alt="" />
                    </button>
                    <Await resolve={data.data}>
                        {({ data }: { data: Product }) => (
                            <Header className={styles["header"]}>{data.name}</Header>
                        )}
                    </Await>
                    <Await resolve={data.data}>
                        {({ data }: { data: Product }) => (
                            <Button onClick={() => { dispatch(cartActions.add(data.id)); }} sizeType="small" className={styles["add-button"]}>
                                <img src="/white-cart.svg" alt="" />
                                <div className={styles["button-text"]}>To cart</div>
                            </Button>
                        )}
                    </Await>
                </div>
                <div className={styles["body"]}>
                    <Await resolve={data.data}>
                        {({ data }: { data: Product }) => (
                            <div className={styles["img-box"]}>
                                <img className={styles["img"]} src={data.image} alt="" />
                            </div>
                        )}
                    </Await>
                    <div className={styles["info"]}>
                        <div className={styles["block"]}>
                            <div className={styles["block-text"]}> Price </div>
                            <Await resolve={data.data}>
                                {({ data }: { data: Product }) => (
                                    <div className={styles["price"]}>{data.price} <span className={styles["rub"]}>₽</span></div>
                                )}
                            </Await>
                        </div>
                        <hr />
                        <div className={styles["block"]}>
                            <div className={styles["block-text"]}>Rating</div>
                            <div className={styles["rate-box"]}>
                                <Await resolve={data.data}>
                                    {({ data }: { data: Product }) => (
                                        <div className={styles["rate"]}>{data.rating}</div>
                                    )}
                                </Await>
                                <img src="/star.svg" alt="" />
                            </div>
                        </div>
                        <div className={styles["composition"]}>
                            <div className={styles["composition-title"]}>Ingredients:</div>
                            <Await resolve={data.data}>
                                {({ data }: { data: Product }) => (
                                    <CompositionList list={data.ingredients}></CompositionList>
                                )}
                            </Await>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    </div>;
}

export default ProductPage;