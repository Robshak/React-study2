import styles from "./CompositionList.module.css";

function CompositionList({ list }: { list: string[] }) {
    let cnt = 0;

    return <ul className={styles["composition-list"]}>
        {list.map(i => {
            return <li key={cnt++} className={styles["list-item"]}>{i}</li>;
        })}
    </ul>;
}

export default CompositionList;