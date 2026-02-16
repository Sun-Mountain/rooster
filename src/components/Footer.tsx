import { FooterLinks } from "./content/FooterLinks";

const Footer = () => {
  return (
    <footer>
      <div id="footer-container" data-testid="footer-content">
        <FooterLinks />
        <div className="copyright">
          <p>Rooster &copy; 2025 Electric Sheep Cooperative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;