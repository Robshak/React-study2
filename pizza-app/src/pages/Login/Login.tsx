import Header from "../../components/Header/Header";
import styles from "./Login.module.css";
import InputLogin from "../../components/Input-login/Input-login";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect } from "react";
// import { LoginResponse } from "../../interfaces/auth.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";
// import axios from "axios";
// import { PREFIX } from "../../helpers/API";

export type LoginForm = {
    email: {
        value: string
    },
    password: {
        value: string
    }
}

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate("/");
        }
    }, [jwt, navigate]);

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }));
    };

    const submit = async (e: FormEvent) => {
        dispatch(userActions.clearLoginError());
        e.preventDefault();
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;
        await sendLogin(email.value, password.value);
    };

    return <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["body"]}>
            <Header className={styles["header"]}>Log in</Header>
            {loginErrorMessage && <div className={styles["error"]}>{loginErrorMessage}</div>}
            <InputLogin labelText="Your Email" id="email" placeholder="Email" type="email"></InputLogin>
            <InputLogin labelText="Your password" id="password" placeholder="Password" type="password"></InputLogin>
        </div>
        <div className={styles["footer"]}>
            <Button className={styles["button"]} sizeType="big">Log in</Button>
            <div className={styles["footer-text"]}>Haven't account?</div>
            <Link to={"/auth/register"} className={styles["footer-url"]}>Register</Link>
        </div>
    </form>;
}