import { useState } from "react";
import { socialImgs } from "../constants";
import { PROFILE } from "../systems/resume";

const EMPTY = { name: "", email: "", message: "", company: "" };

/** Mirrors the server-side caps in `api/contact.js` so limits are enforced before sending. */
const LIMITS = { name: 100, email: 254, message: 3000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form) {
  const errors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep this under ${LIMITS.name} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email))
    errors.email = "That does not look like a valid email address.";
  else if (email.length > LIMITS.email) errors.email = "This email address is too long.";

  if (!message) errors.message = "Please enter a message.";
  else if (message.length > LIMITS.message)
    errors.message = `Keep this under ${LIMITS.message} characters.`;

  return errors;
}

const DESTINATIONS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "GitHub", value: "github.com/VEDANTDHAVAN", href: PROFILE.github },
  { label: "LinkedIn", value: "linkedin.com/in/vedant-dhavan", href: PROFILE.linkedin },
  { label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}` },
  { label: "Website", value: "vedantdhavan.vercel.app", href: PROFILE.site },
];

/**
 * Contact — the existing integration is preserved exactly.
 *
 * The form still POSTs { name, email, message, company } to /api/contact, including the
 * hidden `company` honeypot that the server rejects with a 400. The only change is that the
 * REAL response is now surfaced: a success message appears only on an actual 2xx, and an
 * error message reports the real status. Nothing is simulated.
 */
const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { kind: "ok" | "error", message }
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setStatus(null);
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const found = validate(form);
    if (Object.keys(found).length) {
      setErrors(found);
      setStatus({
        kind: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      return;
    }

    setErrors({});
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setForm(EMPTY);
        setStatus({
          kind: "ok",
          message: "Message sent. Thanks for reaching out — I'll reply soon.",
        });
      } else {
        const detail = await response.text().catch(() => "");
        setStatus({
          kind: "error",
          message:
            response.status === 429
              ? "Too many messages from this connection. Please try again in a minute."
              : response.status === 400
                ? "The message was rejected by the server. Please check the fields and try again."
                : "The message could not be sent. Please email me directly instead.",
          ...(detail ? { detail } : {}),
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Network error — the message was not sent. Please email me directly instead.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Contact</p>
          <h2 className="h2">Let&apos;s connect.</h2>
          <p className="lede">
            Whether you&apos;re hiring, reviewing a system, or just want to compare notes on an
            engineering problem — the form below reaches me directly.
          </p>
        </div>

        <div className="contact-grid">
          <div>
            <div className="contact-links">
              {DESTINATIONS.map((item) => (
                <a
                  className="contact-link"
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto:") || item.href.startsWith("tel:") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto:") || item.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                >
                  <span className="contact-link-label">{item.label}</span>
                  <span>{item.value}</span>
                </a>
              ))}
            </div>

            <div className="subsection" style={{ marginTop: "2rem" }}>
              <div className="cluster">
                {socialImgs.map((social) => (
                  <a
                    className="footer-social"
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <img src={social.imgPath} alt="" loading="lazy" width="16" height="16" />
                    <span style={{ textTransform: "capitalize" }}>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="field-label" htmlFor="contact-name">
                Your name
              </label>
              <input
                className="field-input"
                type="text"
                id="contact-name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                maxLength={LIMITS.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                required
              />
              {errors.name ? (
                <span className="field-error" id="contact-name-error">
                  {errors.name}
                </span>
              ) : null}
            </div>

            <div className="field">
              <label className="field-label" htmlFor="contact-email">
                Email
              </label>
              <input
                className="field-input"
                type="email"
                id="contact-email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                maxLength={LIMITS.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                required
              />
              {errors.email ? (
                <span className="field-error" id="contact-email-error">
                  {errors.email}
                </span>
              ) : null}
            </div>

            <div className="field">
              <label className="field-label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                className="field-textarea"
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What are you working on?"
                rows={5}
                maxLength={LIMITS.message}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                required
              />
              {errors.message ? (
                <span className="field-error" id="contact-message-error">
                  {errors.message}
                </span>
              ) : null}
            </div>

            {/* Honeypot — unchanged from the original form; the server rejects it with a 400. */}
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="contact-company">Company</label>
              <input
                type="text"
                id="contact-company"
                name="company"
                value={form.company}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div
              className={`form-status ${status ? `form-status--${status.kind === "ok" ? "ok" : "err"}` : ""}`}
              role="status"
              aria-live="polite"
              hidden={!status}
            >
              {status?.message}
            </div>

            <div className="form-foot">
              <button className="btn btn--primary" type="submit" disabled={loading}>
                {loading ? "Sending…" : "Send message"}
              </button>
              <span className="form-note">
                Sent through the site&apos;s own API — nothing is stored in the browser.
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;