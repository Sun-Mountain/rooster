'use client';

import Link from "next/link";
import { Circle as CircleIcon } from "@mui/icons-material";
import { Drawer } from "@/components/_ui/Drawer";
import { useWindowSize } from "@/helpers/useWindowSize";

import navLinks from "@/content/NavMainLinks.json";

export const NavMain = () => {
  const size = useWindowSize();
  const isMobile = (size.width ?? 0) < 768;

  const links = () => navLinks.map((link) => (
    <li key={link.href}>
      <Link href={link.href}>{link.label}</Link>
    </li>
  ));

  return (
    <nav>
      <div className="navigation-content">
        <div className="logo-and-title">
          <div className="logo-container">
            <CircleIcon />
          </div>
          {!isMobile && <Link className="title" href="/">In The Dark Circus Arts</Link>}
        </div>
        <ul>
          {isMobile ? (
            <Drawer>
              <ul className="drawer-links">{links()}</ul>
            </Drawer>
          ) : (
            <ul>{links()}</ul>
          )}
        </ul>
      </div>
    </nav>
  );
}