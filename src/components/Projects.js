import React, { useEffect, useRef, useState } from "react";
import { projects } from "../data/portfolio";
import { Arrow, Reveal, SectionLabel } from "./Shared";
const categories = [
  "All",
  "Education",
  "AI / Tech",
  "Healthcare",
  "Marketplace",
];

function ProjectArtwork({ project, index }) {
  return (
    <div className={`project-art project-art-${index}`} aria-hidden="true">
      <div className="project-art-grid" />
      <span className="art-topline">
        {project.category} / {String(index + 1).padStart(2, "0")}
      </span>
      <div className="project-sculpture">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} style={{ "--i": i }} />
        ))}
      </div>
      <span className="art-project-name">
        {project.title === "Personal Project" ? "Tasks × AI" : project.title}
      </span>
      <span className="art-bottomline">
        {project.tags.slice(0, 3).join(" / ")}
      </span>
      <span className="art-plus">+</span>
    </div>
  );
}
export default function Projects() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(0);
  const track = useRef(null);
  const cards = useRef([]);
  const filtered = projects.filter(
    (p) => category === "All" || p.category === category,
  );
  useEffect(() => {
    const root = track.current;
    if (!root || typeof window === "undefined" || !("IntersectionObserver" in window))
      return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(Number(entry.target.dataset.index));
        });
      },
      { root, threshold: 0.65 },
    );
    cards.current.filter(Boolean).forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [category]);
  const select = (index) => {
    const card = cards.current[index];
    if (!card || !track.current || typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.current.scrollTo({
      left: card.offsetLeft,
      behavior: reduced ? "auto" : "smooth",
    });
    setActive(index);
  };
  const filter = (value) => {
    setCategory(value);
    setActive(0);
    track.current?.scrollTo({ left: 0, behavior: "auto" });
    cards.current = [];
  };
  return (
    <section id="projects" className="projects section-pad">
      <SectionLabel number="02">SELECTED WORK</SectionLabel>
      <Reveal className="projects-heading">
        <h2>
          Ideas made <span className="serif">real.</span>
        </h2>
        <p>
          A selection of platforms I’ve helped build.
          <br />
          From education to AI, end to end.
        </p>
      </Reveal>
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects"
      >
        {categories.map((cat) => (
          <button
            id={`projects-tab-${cat.toLowerCase().replace(/\s|\//g, "-")}`}
            aria-pressed={cat === category}
            className={cat === category ? "active" : ""}
            key={cat}
            onClick={() => filter(cat)}
          >
            {cat}
            <span>
              {cat === "All"
                ? String(projects.length).padStart(2, "0")
                : String(
                    projects.filter((p) => p.category === cat).length,
                  ).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      <div
        ref={track}
        className="project-track"
        role="region"
        tabIndex="0"
        aria-label="Project gallery; use left and right arrow keys to browse"
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            select(
              Math.min(
                filtered.length - 1,
                Math.max(0, active + (e.key === "ArrowRight" ? 1 : -1)),
              ),
            );
          }
        }}
      >
        {filtered.map((project, i) => (
          <article
            ref={(el) => (cards.current[i] = el)}
            data-index={i}
            key={project.id}
            id={project.id}
            className="project-card"
          >
            <ProjectArtwork
              project={project}
              index={projects.indexOf(project)}
            />
            <div className="project-info">
              <div className="project-title-row">
                <h3>{project.title}</h3>
                <span className="project-index">
                  /{String(projects.indexOf(project) + 1).padStart(2, "0")}
                </span>
              </div>
              <span className="project-role">{project.role}</span>
              <p>{project.description}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                {project.liveUrl ? (
                  <a
                    id={`${project.id}-live`}
                    className="text-link"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live demo <Arrow />
                  </a>
                ) : (
                  <a
                    id={`${project.id}-details`}
                    href="#contact"
                    className="text-link"
                  >
                    Let’s talk about this project <Arrow />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    id={`${project.id}-github`}
                    className="text-link"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View code <Arrow />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="project-controls">
        <span className="eyebrow" aria-live="polite">
          {String(active + 1).padStart(2, "0")}{" "}
          <span className="muted">
            / {String(filtered.length).padStart(2, "0")}
          </span>
        </span>
        <div className="project-dots">
          {filtered.map((p, i) => (
            <button
              key={p.id}
              aria-label={`Go to ${p.title}`}
              aria-current={active === i ? "true" : undefined}
              onClick={() => select(i)}
            />
          ))}
        </div>
        <div className="project-arrows">
          <button
            className="circle-button"
            aria-label="Previous project"
            disabled={active === 0}
            onClick={() => select(active - 1)}
          >
            ←
          </button>
          <button
            className="circle-button"
            aria-label="Next project"
            disabled={active === filtered.length - 1}
            onClick={() => select(active + 1)}
          >
            →
          </button>
        </div>
      </div>
      <a
        id="projects-view-github"
        className="text-link github-link"
        href="https://github.com/arslanmuhammad-dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        More on GitHub <Arrow />
      </a>
    </section>
  );
}
