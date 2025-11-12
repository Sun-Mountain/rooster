'use client';

import { useWindowSize } from "@/helpers/useWindowSize";
import { Drawer } from "@/components/_ui/Drawer";

export const SideNavMenu = () => {
  const { width } = useWindowSize();

  return (
    <>
      <div className="navigation-admin-container">
        <div>
          {width && width <= 768 ? (
            <Drawer anchor="left">
              Links
            </Drawer>
          ) : (
            <>
              Links
            </>
          )}
        </div>
      </div>
    </>
  );
};
