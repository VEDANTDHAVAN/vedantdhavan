import { lazy, Suspense, useState } from "react";
import { counterItems, words } from "../constants";
import { SYSTEM_LAYERS } from "../systems/taxonomy";
import { layersWithSupport } from "../systems/projects";
import { PROFILE } from "../systems/resume";

/**
 * The 3D room from the original design is preserved, but loaded on demand so the
 * ~1.1 MB three.js chunk is not on the critical rendering path.
 */
const HeroExperience = lazy(() => import("../components/HeroModels/HeroExperience"));

const Hero = () => {
  const [show3d, setShow3d] = useState(false);
  const layerCounts = layersWithSupport();

  return (
    <section id="hero" className="hero">
      <div className="shell hero-grid">
        <div>
          <p className="eyebrow">Engineering portfolio</p>

          <h1 className="h1 hero-title">
            I build systems.
            <br />
            I <em>solve</em> problems.
          </h1>

          <p className="lede hero-lede">
            {PROFILE.lede} Currently shaping{" "}
            <span className="rotator" aria-hidden="true">
              <span className="wrapper">
                {words.map((word) => (
                  // The list repeats to make the marquee loop seamless, so the text is
                  // not unique — `index` is the only stable identity here.
                  <span key={word.index}>
                    <img src={word.imgPath} alt="" loading="lazy" width="18" height="18" />
                    {word.text}
                  </span>
                ))}
              </span>
            </span>{" "}
            <span className="sr-only">ideas, concepts, designs and code into working systems.</span>
          </p>

          <div className="hero-actions">
            <a className="btn btn--primary" href="#systems">
              Explore Systems
            </a>
            <a
              className="btn btn--ghost"
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="btn btn--ghost"
              href={PROFILE.resumeFile}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </div>

          <dl className="hero-stats">
            {counterItems.map((item) => (
              <div className="stat" key={item.label}>
                <dd className="stat-value" style={{ margin: 0 }}>
                  {item.value}
                </dd>
                <dt className="stat-label">{item.label}</dt>
              </div>
            ))}
          </dl>

          <div className="hero-meta">
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              github.com/VEDANTDHAVAN
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <span>{PROFILE.location}</span>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Capability stack">
          <div className="hero-panel-head">
            <img
                            className="portrait"
                            src="/images/pic.jpg"
                            alt="Vedant Dhavan"
                            loading="eager"
                            fetchpriority="high"
                            decoding="async"
                            width="1748"
                            height="1304"
              style={{
                width: "clamp(96px, 16vw, 168px)",
                height: "clamp(96px, 16vw, 168px)",
                objectFit: "cover",
                objectPosition: "42% 22%",
                borderRadius: "50%",
                border: "1px solid var(--line)",
                flexShrink: 0,
              }}
            />
            <div>
              <h2 className="h3">System layers</h2>
              <span className="mono muted">in this portfolio</span>
            </div>
          </div>

          <div className="hero-stack">
            {SYSTEM_LAYERS.map((layer) => {
              const count = layerCounts.get(layer.key) ?? 0;
              return (
                <a className="hero-stack-row" key={layer.key} href="#systems">
                  <span>{layer.label}</span>
                  <span className="mono">
                    {count} system{count === 1 ? "" : "s"}
                  </span>
                </a>
              );
            })}
          </div>

          <button
            type="button"
            className="btn btn--ghost btn--sm"
            style={{ marginTop: "1rem" }}
            aria-pressed={show3d}
            onClick={() => setShow3d((value) => !value)}
          >
            {show3d ? "Hide 3D room" : "Show 3D room"}
          </button>

          {show3d ? (
            <div className="hero-3d">
              <Suspense fallback={<div className="hero-3d-fallback">Loading 3D scene…</div>}>
                <div className="hero-3d-canvas">
                  <HeroExperience />
                </div>
              </Suspense>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
};

export default Hero;