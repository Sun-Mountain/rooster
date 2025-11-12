'use client';

import { useState } from "react";
import { Drawer as DrawerUI } from "@mui/material";
import { ReactNode } from "react";
import { Button } from "@/components/_ui/Button";
import { Menu } from "@mui/icons-material";

interface DrawerProps {
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  children: ReactNode;
}

export const Drawer = ({ children, anchor = 'right' }: DrawerProps) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


  return (
    <>
      <Button className="icon transparent" onClick={toggleDrawer(true)}>
        <Menu />
      </Button>
      <DrawerUI onClose={toggleDrawer(false)} open={open} anchor={anchor}>
        <div className="drawer-content">
          {children}
        </div>
      </DrawerUI>
    </>
  );
};