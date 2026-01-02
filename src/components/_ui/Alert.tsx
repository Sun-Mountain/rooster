import { ReactNode } from "react";
import {
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Warning as WarningIcon
} from "@mui/icons-material";

interface AlertProps {
  children: ReactNode;
  type: 'success' | 'error' | 'info' | 'warning';
  className?: string;
}

export interface AlertMsgProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export const Alert = ({ children, type, className }: AlertProps) => {

  const icon = () => {
    switch (type) {
      case 'success':
        return (<SuccessIcon />);
      case 'error':
        return (<ErrorIcon />);
      case 'info':
        return (<InfoIcon />);
      case 'warning':
        return (<WarningIcon />);
    }
  }

  return (
    <div className={`alert-container ${type} ${className || ''}`}>
      <div className="alert-icon">
        {icon()}
      </div>
      <div className="alert-text">
        {children}
      </div>
    </div>
  );
};