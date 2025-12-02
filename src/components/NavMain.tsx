import Link from "next/link";
import { Circle as CircleIcon } from "@mui/icons-material";

export const NavMain = () => {
  return (
    <nav>
      <div className="navigation-content">
        <div>
          <div className="logo-container">
            <CircleIcon />
          </div>
        </div>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}