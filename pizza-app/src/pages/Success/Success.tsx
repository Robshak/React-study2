import { useNavigate } from "react-router-dom";
import styles from "./Success.module.css";
import Button from "../../components/Button/Button";

function Success() {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/");
    };

    return <div className={styles["success-page"]}>
        <img className={styles["img"]} src="/big-pizza.svg" alt="" />
        <div className={styles["text"]}>Your order has been successfully completed!</div>
        <Button className={styles["button"]} sizeType="big" onClick={onClick}>to main page</Button>
    </div>;
}

export default Success;