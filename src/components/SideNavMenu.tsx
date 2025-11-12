'use client';

import { ReactNode } from "react";
import { useWindowSize } from "@/helpers/useWindowSize";
import { Drawer } from "@/components/_ui/Drawer";

export const SideNavMenu = ({ children }: { children: ReactNode }) => {
  const { width } = useWindowSize();

  return (
    <>
      <div className="side-nav-container">
        <div>
          {width && width <= 768 ? (
            <Drawer anchor="left">
              {children}
            </Drawer>
          ) : (
            <>
              {children}
            </>
          )}
        </div>
      </div>
    </>
  );
};
