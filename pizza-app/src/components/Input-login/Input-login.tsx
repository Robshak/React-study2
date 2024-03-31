import { forwardRef } from "react";
import styles from "./Input-login.module.css";
import cn from "classnames";
import { InputProps } from "./Input-login.props";

const InputLogin = forwardRef<HTMLInputElement, InputProps>(function Input({ labelText, isValid = true, id, ...props }, ref) {
    return (
        <div ref={ref} className={styles["input-block"]}>
            <label className={styles["label"]} htmlFor={id}>{labelText}</label>
            <input className={cn(styles["input"], {
                [styles["invalid"]]: isValid
            })} id={id}
                {...props} />
        </div>
    );
});

export default InputLogin;