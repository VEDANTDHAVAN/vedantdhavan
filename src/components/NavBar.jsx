import { useEffect, useState } from "react";
import { navLinks } from "../constants";
import { PROFILE } from "../systems/resume";
import { ROLE_ORDER, ROLE_VIEWS } from "../systems/roles";

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

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
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.getAttribute("data-theme") || "light";
  });

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  };

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
          <span className="nav-brand-sub">Engineering portfolio</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.link}
              className="nav-link"
              href={link.link}
              aria-current={active === link.link ? "true" : undefined}
              onClick={(e) => {
                if (link.link.startsWith("/")) {
                  e.preventDefault();
                  window.history.pushState(null, "", link.link);
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }
              }}
            >
              {link.name}
            </a>
          ))}
          {ROLE_ORDER.map((key) => {
            const view = ROLE_VIEWS[key];
            const slug = key === "fullstack" ? "full-stack" : key;
            return (
              <a
                key={key}
                className="nav-link"
                href={`/roles/${slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, "", `/roles/${slug}`);
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
              >
                {view.short}
              </a>
            );
          })}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="btn btn--ghost btn--sm theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
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
            {ROLE_ORDER.map((key) => {
              const view = ROLE_VIEWS[key];
              const slug = key === "fullstack" ? "full-stack" : key;
              return (
                <li key={key}>
                  <a
                    href={`/roles/${slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      close();
                      window.history.pushState(null, "", `/roles/${slug}`);
                      window.dispatchEvent(new PopStateEvent("popstate"));
                    }}
                  >
                    {view.title}
                  </a>
                </li>
              );
            })}
            <li>
              <button
                type="button"
                className="nav-mobile-theme"
                onClick={() => {
                  toggleTheme();
                  close();
                }}
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
              </button>
            </li>
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