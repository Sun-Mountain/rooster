import { Drawer as DrawerUI } from "@mui/material";
import { ReactNode } from "react";

interface DrawerProps {
  children: ReactNode;
  anchor?: 'left' | 'top' | 'right' | 'bottom';
}

export const Drawer = ({ children, anchor = 'right' }: DrawerProps) => {
  return (
    <DrawerUI anchor={anchor}>
      {children}
    </DrawerUI>
  );
};