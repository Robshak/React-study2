import Header from "../../components/Header/Header";
import styles from "./Error.module.css";

export function MyError() {
    return <Header className={styles["error"]}>Page is not found</Header>;
}