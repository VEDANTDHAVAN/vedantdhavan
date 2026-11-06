import { socialImgs } from "../constants";
import { PROFILE } from "../systems/resume";

/**
 * Footer — preserves the original resume-repo link, all four social destinations
 * (github, instagram, x, linkedin) and the copyright line.
 */
const Footer = () => (
  <footer className="footer">
    <div className="shell footer-inner">
      <div className="footer-brand">
        <span className="footer-name">Vedant Atul Dhavan</span>
        <p className="footer-note">
          Full-Stack &amp; AI/ML engineer building systems across product interfaces, backend
          infrastructure, agents and machine learning.
        </p>
        <div className="footer-socials">
          {socialImgs.map((img) => (
            <a
              className="footer-social"
              key={img.url}
              href={img.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={img.name}
            >
              <img src={img.imgPath} alt="" loading="lazy" width="16" height="16" />
              {img.name}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-brand" style={{ justifyItems: "end" }}>
        <a
          className="btn btn--ghost btn--sm"
          href={PROFILE.resumeFile}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume ↗
        </a>
        <a
          className="btn btn--quiet btn--sm"
          href={`mailto:${PROFILE.email}`}
        >
          Contact
        </a>
      </div>

      <div className="footer-legal">
        <span>* {new Date().getFullYear()} Vedant Atul Dhavan. All Rights Reserved.</span>
        <span>Designed as a systems map — not a card grid.</span>
      </div>
    </div>
  </footer>
);

export default Footer;