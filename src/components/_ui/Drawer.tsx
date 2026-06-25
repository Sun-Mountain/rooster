'use client';

import { useState } from "react";
import { Drawer as DrawerUI } from "@mui/material";
import { ReactNode } from "react";
import { Button } from "@/components/_ui/Button";
import { Menu, Close } from "@mui/icons-material";

interface DrawerProps {
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  transparent?: boolean;
  children: ReactNode;
}

export const Drawer = ({ children, anchor = 'right', transparent = false }: DrawerProps) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


  return (
    <>
      <Button className={`icon drawer-btn ${transparent ? "transparent" : ""}`} onClick={toggleDrawer(true)}>
        <Menu />
      </Button>
      <DrawerUI onClose={toggleDrawer(false)} open={open} anchor={anchor}>
        <div className="drawer-content">
        <div className="drawer-header">
          <Button className="icon" onClick={toggleDrawer(false)}>
            <Close />
          </Button>
        </div>
          {children}
        </div>
      </DrawerUI>
    </>
  );
};