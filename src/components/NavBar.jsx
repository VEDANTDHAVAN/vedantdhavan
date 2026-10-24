import { useEffect, useState } from "react";
import { navLinks } from "../constants";
import { PROFILE } from "../systems/resume";

/**
 * Compact persistent navigation.
 *
 * - Desktop: brand, primary links, GitHub + Resume actions.
 * - Mobile: a disclosure menu (aria-expanded / aria-controls) with the same destinations.
 * - The active section is tracked with an IntersectionObserver and exposed via aria-current.
 */
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.link.slice(1)))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="shell nav-inner">
        <a className="nav-brand" href="#hero" onClick={close}>
          <span className="nav-brand-mark" aria-hidden="true" />
          <span>{PROFILE.name}</span>
          <span className="nav-brand-sub">Systems, not projects</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.link}
              className="nav-link"
              href={link.link}
              aria-current={active === link.link ? "true" : undefined}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a
            className="btn btn--ghost btn--sm"
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn btn--primary btn--sm"
            href={PROFILE.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav-toggle-bars" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`nav-mobile ${open ? "is-open" : ""}`}>
        <div className="shell">
          <ul>
            {navLinks.map((link) => (
              <li key={link.link}>
                <a href={link.link} onClick={close}>
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" onClick={close}>
                GitHub ↗
              </a>
            </li>
            <li>
              <a href={PROFILE.resumeFile} target="_blank" rel="noopener noreferrer" onClick={close}>
                Resume ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default NavBar;