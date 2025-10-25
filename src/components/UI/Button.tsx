import { MouseEvent, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  defaultDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, defaultDisabled, onClick, type = "button"}: ButtonProps) => {
  return (
    <button
      disabled={defaultDisabled}
      type={type}
      onClick={onClick}>
        {children}
    </button>
  );
}