import { forwardRef } from "react";
import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";
import cn from "classnames";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({ id, ...props }, ref) {
    return (
        <div className={styles["search-panel"]}>
            <label className={styles["label"]} htmlFor={id}><img src="/search.svg" alt="" /></label>
            <input className={cn(styles["input"])} ref={ref} id={id} {...props} />
        </div>
    );
});

export default Search;