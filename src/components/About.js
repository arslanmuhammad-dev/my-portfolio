import React from "react";
import avatar from "../assets/avatar.png";
import { skillGroups, stats } from "../data/portfolio";
import { Reveal, SectionLabel, Arrow } from "./Shared";

export default function About() {
  return (
    <section id="about" className="about section-pad">
      <SectionLabel number="01">THE PERSON BEHIND THE CODE</SectionLabel>
      <Reveal className="about-statement">
        <h2>
          Big-picture thinking.
          <br />
          <span className="serif muted">Down-to-the-detail execution.</span>
        </h2>
      </Reveal>
      <div className="about-grid">
        <Reveal className="portrait-block">
          <div className="portrait-frame">
            <img
              src={avatar}
              alt="Muhammad Arslan"
              width="400"
              height="480"
              loading="lazy"
            />
            <span className="portrait-mark">ma.</span>
          </div>
          <div className="portrait-caption">
            <span>MUHAMMAD ARSLAN</span>
            <span>LAHORE, PK ↗</span>
          </div>
        </Reveal>
        <Reveal className="about-copy" delay={120}>
          <span className="eyebrow">FULL STACK. FULL PICTURE.</span>
          <p className="lead">
            I’m a Full Stack Developer with 6 years of hands-on experience
            building scalable web applications.
          </p>
          <p>
            I work across the stack — designing React & Next.js interfaces,
            building Node.js & Express APIs, modeling data in MongoDB and
            PostgreSQL, and shipping to AWS and Vercel.
          </p>
          <p>
            I’ve led and contributed to products across education, AI-driven
            platforms, healthcare, and marketplaces. Clean architecture,
            reusable components, and pixel-perfect UI are the common thread.
          </p>
          <p>
            Beyond writing code, I bring leadership, Agile collaboration, and a
            product-minded approach — building solutions that are easy to scale,
            maintain, and extend. Based in Lahore, Pakistan, open to remote
            opportunities worldwide.
          </p>
          <a href="#experience" className="text-link">
            A little more about my journey <Arrow />
          </a>
        </Reveal>
      </div>
      <Reveal className="stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <span className="stat-value">{stat.value}</span>
            <span className="eyebrow">{stat.label}</span>
          </div>
        ))}
      </Reveal>
      <div className="skills-heading">
        <span className="eyebrow">MY TOOLKIT</span>
        <h3>
          From interface <span className="serif">to infrastructure.</span>
        </h3>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.id}
            delay={i * 90}
            className="skill-card"
            id={`skill-group-${group.id}`}
          >
            <div className="skill-top">
              <span className="eyebrow">0{i + 1}</span>
              <span className="skill-symbol" aria-hidden="true">
                {["⌘", "⌁", "↗"][i]}
              </span>
            </div>
            <h4>{group.title}</h4>
            <div className="tags">
              {group.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
