import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    isValid?: boolean;
    labelText: string | undefined;
}