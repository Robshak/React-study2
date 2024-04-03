import styles from "./Header.module.css";
import { HeaderProps } from "./Header.props";
import cn from "classnames";

function Header({ children, className, ...props }: HeaderProps) {
    return (
        <h1 className={cn(styles["header"], className)} {...props}>
            {children}
        </h1>
    );
}

export default Header;