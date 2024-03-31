import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";
import cn from "classnames";

function Button({ children, className, sizeType, ...props }: ButtonProps) {
    return (
        <button className={cn(styles["button"], styles["accent"], className, {
            [styles["small"]]: sizeType === "small",
            [styles["big"]]: sizeType === "big"
        })}
            {...props}>{children}</button>
    );
}

export default Button;
