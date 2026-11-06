import { ROLE_ORDER, ROLE_VIEWS } from "../systems/roles";

const RoleSelector = () => (
  <section id="roles" className="section">
    <div className="shell">
      <div className="section-head">
        <p className="eyebrow">Role focus</p>
        <h2 className="h2">Explore by role.</h2>
        <p className="lede">
          Tailored views for the roles I am targeting. Each page highlights the most relevant
          projects, strengths and engineering evidence.
        </p>
      </div>
      <div className="role-grid">
        {ROLE_ORDER.map((key) => {
          const view = ROLE_VIEWS[key];
          const slug = key === "fullstack" ? "full-stack" : key;
          return (
            <a
              key={key}
              className="role-tile"
              href={`/roles/${slug}`}
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, "", `/roles/${slug}`);
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
            >
              <span className="role-tile-short">{view.short}</span>
              <span className="role-tile-title">{view.title}</span>
              <span className="role-tile-intro">{view.intro.slice(0, 110)}…</span>
            </a>
          );
        })}
      </div>
    </div>
  </section>
);

export default RoleSelector;
