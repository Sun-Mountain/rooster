'use client';

import { useWindowSize } from "@/helpers/useWindowSize";
import { Drawer } from "@/components/UI/Drawer";
import { AdminDashLinks } from "./Links/AdminDash";

export const NavigationAdmin = () => {
  const { width } = useWindowSize();

  return (
    <>
      <div className="navigation-admin-container">
        <div>
          {width && width <= 768 ? (
            <Drawer anchor="left">
              <AdminDashLinks />
            </Drawer>
          ) : (
            <AdminDashLinks />
          )}
        </div>
      </div>
    </>
  );
};
