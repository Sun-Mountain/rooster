import { MouseEvent, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (() => void);
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, type = "button", onClick, handleClick, disabled = false }: ButtonProps) => {
  const handleOnClick = (event?: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick();
    if (handleClick && event) handleClick(event);
  }

  return (
    <button type={type} onClick={handleOnClick} disabled={disabled}>
      {children}
    </button>
  );
}