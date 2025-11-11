import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const Button = ({ children, type = "button", onClick }: ButtonProps) => {
  const handleOnClick = () => {
    if (onClick) onClick();
  }

  return (
    <button type={type} onClick={handleOnClick}>
      {children}
    </button>
  );
}