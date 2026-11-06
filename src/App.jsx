import { lazy, Suspense, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./sections/Hero";
import RoleSelector from "./components/RoleSelector";
import Footer from "./sections/Footer";
import { SLUG_TO_ROLE } from "./systems/roles";

// Lazy-load everything below the fold. The hero and role selector are small and
// render eagerly so the first paint is instant. Everything else (the systems map,
// featured work, engineering notes, about, contact) is split into its own chunk
// and only fetched when the browser has idle time after the initial render.
const FeaturedWork = lazy(() => import("./components/FeaturedWork"));
const SystemsSection = lazy(() => import("./sections/SystemsSection"));
const EngineeringNotes = lazy(() => import("./sections/EngineeringNotes"));
const AboutSection = lazy(() => import("./sections/AboutSection"));
const Contact = lazy(() => import("./sections/Contact"));
const RolePage = lazy(() => import("./sections/RolePage"));
const ProjectIndex = lazy(() => import("./components/ProjectIndex"));

const ROLE_PATH_RE = /^\/roles\/([^/]+)\/?$/;
const PROJECTS_PATH_RE = /^\/projects\/?$/;

function readRoute() {
  const match = window.location.pathname.match(ROLE_PATH_RE);
  if (match) {
    const slug = decodeURIComponent(match[1]);
    const roleKey = SLUG_TO_ROLE[slug];
    if (roleKey) return { kind: "role", roleKey };
  }
  if (PROJECTS_PATH_RE.test(window.location.pathname)) return { kind: "projects" };
  return { kind: "home" };
}

const FALLBACK = (
  <div className="section">
    <div className="shell">
      <div className="skeleton" style={{ height: "1.5rem", width: "40%" }} />
      <div className="skeleton" style={{ height: "6rem", width: "100%", marginTop: "1rem" }} />
    </div>
  </div>
);

const App = () => {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onPop = () => setRoute(readRoute());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
    setRoute(readRoute());
  };

  const goHome = () => navigate("/");

  if (route.kind === "role") {
    return (
      <>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <NavBar />
        <Suspense fallback={FALLBACK}>
          <RolePage roleKey={route.roleKey} onBack={goHome} />
        </Suspense>
        <Footer />
      </>
    );
  }

  if (route.kind === "projects") {
    return (
      <>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <NavBar />
        <Suspense fallback={FALLBACK}>
          <ProjectIndex />
        </Suspense>
        <Footer />
      </>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />
      <main id="main">
        <Hero />
        <RoleSelector />
        <Suspense fallback={FALLBACK}>
          <FeaturedWork />
        </Suspense>
        <Suspense fallback={FALLBACK}>
          <SystemsSection />
        </Suspense>
        <Suspense fallback={FALLBACK}>
          <EngineeringNotes />
        </Suspense>
        <Suspense fallback={FALLBACK}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={FALLBACK}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default App;