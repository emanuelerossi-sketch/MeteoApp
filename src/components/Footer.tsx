import "../css/Footer.css";
import { FaGithub } from "react-icons/fa";

export function Footer() {
  const annoCorrente = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {annoCorrente} Emanuele Rossi - MeteoApp</p>

        <div className="footer-links">
          <a href="https://github.com/emanuelerossi-sketch/MeteoApp" target="_blank" rel="noreferrer">
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}