import React from "react";
import { experiences } from "../data/portfolio";
import { Reveal, SectionLabel } from "./Shared";

export default function Experience() {
  return (
    <section id="experience" className="experience section-pad">
      <SectionLabel number="03">EXPERIENCE & EDUCATION</SectionLabel>
      <div className="experience-layout">
        <Reveal className="experience-heading">
          <h2>
            A foundation
            <br />
            of <span className="serif">real work.</span>
          </h2>
          <p>
            Building products. Leading teams.
            <br />
            Learning with every release.
          </p>
          <div className="experience-emblem" aria-hidden="true">
            ✳
          </div>
        </Reveal>
        <div className="experience-list">
          {experiences.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 70}>
              <details
                className="experience-item"
                id={exp.id}
                open={exp.type === "work"}
              >
                <summary>
                  <div className="experience-meta">
                    <span className="eyebrow">{exp.period}</span>
                    {exp.current && (
                      <span className="current-tag">CURRENT</span>
                    )}
                    <span className="expand-icon" aria-hidden="true">
                      +
                    </span>
                  </div>
                  <h3>{exp.company}</h3>
                  <p>{exp.role}</p>
                  <span className="location">{exp.location}</span>
                </summary>
                <div className="experience-details">
                  <ul>
                    {exp.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="tags">
                    {exp.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
