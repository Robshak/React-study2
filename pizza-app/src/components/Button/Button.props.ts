import { ButtonHTMLAttributes, ReactNode } from "react";

type buttonSize = "small" | "big";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    sizeType: buttonSize;
}