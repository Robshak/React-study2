import Header from "../../components/Header/Header";
import styles from "./Loading.module.css";

export function Loading() {
    return <div className={styles["loading-page"]}>
        <Header className={styles["loading"]}>Loading</Header>
        <div className={styles["loader"]}></div>
    </div>;
}