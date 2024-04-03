import Header from "../../components/Header/Header";
import styles from "./Register.module.css";
import InputLogin from "../../components/Input-login/Input-login";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { FormEvent, useEffect } from "react";
import { register, userActions } from "../../store/user.slice";

export type RegisterForm = {
    email: {
        value: string
    },
    password: {
        value: string
    },
    userName: {
        value: string
    }
}

export function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate("/");
        }
    }, [jwt, navigate]);

    const sendRegister = async (email: string, password: string, userName: string) => {
        dispatch(register({ email, password, userName }));
    };

    const submit = async (e: FormEvent) => {
        dispatch(userActions.clearRegisterError());
        e.preventDefault();
        const target = e.target as typeof e.target & RegisterForm;
        const { email, password, userName } = target;
        await sendRegister(email.value, password.value, userName.value);
    };

    return <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["body"]}>
            <Header className={styles["header"]}>Register</Header>
            {registerErrorMessage && <div className={styles["error"]}>{registerErrorMessage}</div>}
            <InputLogin labelText="Your Email" id="email" name="email" type="email" placeholder="Email"></InputLogin>
            <InputLogin labelText="Your password" id="password" name="password" type="password" placeholder="Password"></InputLogin>
            <InputLogin labelText="Your name" id="userName" name="userName" type="text" placeholder="Name"></InputLogin>
        </div>
        <div className={styles["footer"]}>
            <Button className={styles["button"]} sizeType="big">Register</Button>
            <div className={styles["footer-text"]}>Have account?</div>
            <Link to={"/auth/login"} className={styles["footer-url"]}>Log in</Link>
        </div>
    </form>;
}