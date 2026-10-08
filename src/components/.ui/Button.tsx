import { MouseEvent, MouseEventHandler, ReactNode, SubmitEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (() => void);
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  handleSubmit?: (event: SubmitEvent<HTMLFormElement>) => void;
}

export const Button = ({
  children,
  ariaLabel,
  className,
  type = "button", onClick, handleClick, handleSubmit, disabled = false }: ButtonProps) => {
  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick();
    if (handleClick) handleClick(event);
    if (handleSubmit) handleSubmit(event as unknown as SubmitEvent<HTMLFormElement>);
  }

  return (
    <button aria-label={ariaLabel} className={className} type={type} onClick={handleOnClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;