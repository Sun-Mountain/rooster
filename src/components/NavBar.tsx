'use client';

import { useSession } from "@/lib/auth-client";
import { useWindowSize } from "@/helpers/useWindowSize";
import { Drawer } from "@/components/_ui/Drawer";
import { MainNavLinks } from "./content/MainNavLinks";

const NavBar = () => {
  const { width } = useWindowSize();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav>
      <div id="nav-container">
        <div>
          <h1 className="nav-logo">Rooster</h1>
        </div>
        <div className="nav-links">
          {width && width < 768 ? (
            <Drawer anchor="right">
              <MainNavLinks user={user} inDrawer />
            </Drawer>
          ) : (
            <MainNavLinks user={user} />
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;