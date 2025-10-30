import { MouseEvent, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  defaultDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, className, defaultDisabled, onClick, type = "button"}: ButtonProps) => {
  return (
    <button
      className={className}
      disabled={defaultDisabled}
      type={type}
      onClick={onClick}>
        {children}
    </button>
  );
}