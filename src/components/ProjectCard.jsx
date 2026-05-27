const ProjectLink = ({ href, children, variant = "secondary" }) => {
  const variantClass =
    variant === "primary"
      ? "bg-[#00fcf8] text-black hover:bg-white"
      : "bg-[#2A2A2A] text-white hover:bg-white hover:text-black";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-link ${variantClass}`}
    >
      {children}
    </a>
  );
};

const ProjectCard = ({ project, featured = false }) => (
  <article className={`project-card showcase-card ${featured ? "featured" : ""}`}>
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-image ${project.imageClass}`}
      aria-label={`Open ${project.title} GitHub repository`}
    >
      <img
        src={project.image}
        alt={`${project.title} project preview`}
        loading="lazy"
        decoding="async"
      />
    </a>

    <div className="project-card-body">
      <div className="project-card-topline">
        <span className="project-category">{project.category}</span>
        <span className="project-domain">{project.domain}</span>
      </div>

      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <ul className="project-tech-list" aria-label={`${project.title} technology and domain tags`}>
        {project.tech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className="project-actions">
        <ProjectLink href={project.href}>GitHub</ProjectLink>
        {project.demoUrl && (
          <ProjectLink href={project.demoUrl} variant="primary">
            Live Demo
          </ProjectLink>
        )}
      </div>
    </div>
  </article>
);

export default ProjectCard;
