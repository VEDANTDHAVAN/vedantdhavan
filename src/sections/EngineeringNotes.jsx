import { NOTES } from "../systems/notes";

/**
 * Engineering Notes — editorial section.
 *
 * Every note is a summary of a decision evidenced in a specific repository; each carries the
 * source it came from. No article is fabricated and no unverified production claim is made.
 */
const EngineeringNotes = () => (
  <section id="notes" className="section">
    <div className="shell">
      <div className="section-head">
        <p className="eyebrow">Engineering notes</p>
        <h2 className="h2">Decisions worth writing down.</h2>
        <p className="lede">
          Short notes on engineering decisions, each traceable to a specific repository. These
          summarise what the code does — they are not invented case studies.
        </p>
      </div>

      <div className="notes-grid">
        {NOTES.map((note, index) => (
          <article className="note" key={note.id}>
            <span className="note-index">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="note-title">{note.title}</h3>
            <p className="note-body">{note.body}</p>
            <p className="note-source">Source: {note.source}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default EngineeringNotes;