'use client';

import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { Menu } from "@mui/icons-material";
import { useWindowSize } from "@/helpers/useWindowSize";

export const NavigationAdmin = () => {
  const { width } = useWindowSize();


  return (
    <div className="navigation-admin-container">
      <div>
        {width && width <= 768 ? (
          <Button>
            <Menu />
          </Button>
        ) : (
          <Link href="/admin">Dashboard</Link>
        )}
      </div>
    </div>
  );
};
