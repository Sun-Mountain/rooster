'use client';

import { ReactNode, useState } from "react";
import { Drawer as DrawerUI } from "@mui/material";
import { Menu, Close, KeyboardDoubleArrowUp } from "@mui/icons-material";
import Button from "@/components/.ui/Button";

interface DrawerProps {
  children: ReactNode;
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  btnClassName?: string;
  drawerContentClassName?: string;
}

const Drawer = ({
  children,
  anchor = 'right',
  btnClassName,
  drawerContentClassName = '',
}: DrawerProps) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


  return (
    <>
      <Button className={btnClassName} onClick={toggleDrawer(true)}>
        <Menu />
      </Button>
      <DrawerUI onClose={toggleDrawer(false)} open={open} anchor={anchor}>
        <div className={`drawer-content ${anchor} ${drawerContentClassName}`}>
          {/* <div className="drawer-header">
            <Button className="icon" onClick={toggleDrawer(false)}>
              <Close />
            </Button>
          </div> */}
          {children}
          <div className="drawer-footer">
            {anchor === 'top' && (
              <Button className="icon main-nav-btn" onClick={toggleDrawer(false)}>
                <KeyboardDoubleArrowUp />
              </Button>
            )}
          </div>
        </div>
      </DrawerUI>
    </>
  );
};

export default Drawer;