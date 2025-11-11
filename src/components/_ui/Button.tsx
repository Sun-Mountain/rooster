import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const Button = ({ children, type = "button", onClick, disabled = false }: ButtonProps) => {
  const handleOnClick = () => {
    if (onClick) onClick();
  }

  return (
    <button type={type} onClick={handleOnClick} disabled={disabled}>
      {children}
    </button>
  );
}