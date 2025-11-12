import { MouseEvent, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (() => void);
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, ariaLabel, className, type = "button", onClick, handleClick, disabled = false }: ButtonProps) => {
  const handleOnClick = (event?: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick();
    if (handleClick && event) handleClick(event);
  }

  return (
    <button aria-label={ariaLabel} className={className} type={type} onClick={handleOnClick} disabled={disabled}>
      {children}
    </button>
  );
}