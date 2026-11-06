import { useEffect, useRef } from "react";
import { LAYER_BY_KEY } from "../systems/taxonomy";

/**
 * A case study is presented as a native <dialog>, which gives focus trapping, Escape-to-close,
 * inert background content and correct screen-reader semantics for free.
 *
 * Sections that the source material cannot support are rendered as an explicit
 * "not documented" note rather than being filled with plausible-sounding text.
 */
const Section = ({ title, children }) => (
  <section className="case-section">
    <h3 className="case-section-title">{title}</h3>
    {children}
  </section>
);

const NotDocumented = ({ what }) => (
  <p className="case-text muted">Not documented — {what}.</p>
);

const CaseStudyPanel = ({ system, open, onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };
    node.addEventListener("cancel", handleCancel);
    return () => node.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  if (!system) return null;

  const cs = system.caseStudy ?? {};
  const layers = system.systemIds.map((id) => LAYER_BY_KEY[id]).filter(Boolean);
  const isUnverified = system.stage === "unverified";

  return (
    <dialog
      className="case-dialog"
      ref={ref}
      aria-labelledby="case-title"
      onClick={(event) => {
        // Clicking the backdrop (outside the panel) closes the dialog.
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="case-panel">
        <header className="case-head">
          <div className="case-head-top">
            <div>
              <h2 className="case-title" id="case-title">
                {system.title}
              </h2>
              <p className="case-sub">
                {system.domain} · {system.category}
              </p>
            </div>
            <button type="button" className="case-close" onClick={onClose} aria-label="Close case study">
              ✕
            </button>
          </div>

          {system.summary ? <p className="case-text">{system.summary}</p> : null}

          {layers.length ? (
            <div className="layer-tags">
              {layers.map((layer) => (
                <span className="layer-tag" key={layer.key}>
                  {layer.label}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div className="case-body">
          {isUnverified ? (
            <div className="case-note">
              <strong>This system could not be verified.</strong>
              <span>
                It is kept in the portfolio with its original description, but no architecture claim
                is made because the repository is unreachable.
              </span>
            </div>
          ) : null}

          <Section title="Problem">
            {cs.problem ? (
              <p className="case-text">{cs.problem}</p>
            ) : (
              <NotDocumented what="no problem statement is available in the source material" />
            )}
          </Section>

          <Section title="My contribution">
            {cs.contribution ? (
              <p className="case-text">{cs.contribution}</p>
            ) : (
              <NotDocumented what="the repository does not state what was built individually" />
            )}
          </Section>

          <Section title="System design">
            {cs.design ? <p className="case-text">{cs.design}</p> : null}
            {layers.length ? (
              <ul className="case-list">
                {layers.map((layer) => (
                  <li key={layer.key}>
                    <strong>{layer.label}.</strong> {layer.blurb}
                  </li>
                ))}
              </ul>
            ) : null}
          </Section>

          {cs.decisions?.length ? (
            <Section title="Engineering decisions">
              <ul className="case-list">
                {cs.decisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          {cs.challenges ? (
            <Section title="Challenges">
              <p className="case-text">{cs.challenges}</p>
            </Section>
          ) : null}

          <Section title="Evidence">
            <ul className="case-evidence">
              {system.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
              {cs.evidence?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Section>

          {system.unverified?.length ? (
            <div className="case-note">
              <strong>Not verifiable</strong>
              <ul className="case-list">
                {system.unverified.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <Section title="Technology">
            <div className="case-tech">
              {cs.tech?.map((item) => (
                <span className="layer-tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Links">
            <div className="case-links">
              {cs.links?.map((link) => (
                <a
                  key={link.href}
                  className="btn btn--ghost btn--sm"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={link.unavailable ? "true" : undefined}
                  tabIndex={link.unavailable ? -1 : undefined}
                >
                  {link.label} ↗
                  {link.unavailable ? " (unavailable)" : ""}
                </a>
              ))}
            </div>
          </Section>

          <Section title="Original description (preserved)">
            <p className="case-text muted">{system.description}</p>
          </Section>
        </div>
      </div>
    </dialog>
  );
};

export default CaseStudyPanel;