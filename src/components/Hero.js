import React, { useEffect, useRef, useState } from "react";
import { site } from "../data/site";
import { Arrow, SocialLinks } from "./Shared";

const canUseDOM = typeof window !== "undefined";

export function Intro() {
  const [visible, setVisible] = useState(
    () =>
      canUseDOM &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !window.location.hash,
  );
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(timer);
  }, []);
  return visible ? (
    <div className="intro" aria-hidden="true">
      <div className="intro-panel" />
      <div className="intro-panel" />
      <div className="intro-panel" />
      <span className="intro-name">
        Muhammad Arslan<span>ENGINEERING THE DETAILS.</span>
      </span>
    </div>
  ) : null;
}
export default function Hero() {
  const art = useRef(null);
  const frame = useRef(null);
  useEffect(() => {
    const element = art.current;
    if (!element || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      element.classList.toggle("motion-paused", !entry.isIntersecting);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, []);
  const move = (e) => {
    if (
      !canUseDOM ||
      window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)")
        .matches
    )
      return;
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (art.current)
        art.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };
  return (
    <section id="hero" className="hero" onPointerMove={move}>
      <div ref={art} className="hero-art" aria-hidden="true">
        <div className="orbital">
          <div className="orbital-core" />
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} style={{ "--i": i }} />
          ))}
        </div>
        <span className="art-coordinate coordinate-top">
          01 / IDEAS INTO SYSTEMS
        </span>
        <span className="art-coordinate coordinate-bottom">
          DESIGNED TO SCALE ↗
        </span>
      </div>
      <div className="hero-content">
        <div className="eyebrow hero-enter">
          <span className="status-dot" /> OPEN TO NEW OPPORTUNITIES
        </div>
        <h1>
          <span className="line-mask">
            <span>{site.name}</span>
          </span>
          <span className="line-mask">
            <span className="serif"> {site.role}</span>
          </span>
        </h1>
        <div className="hero-description hero-enter">
          <span className="hero-intro">
            I’m Muhammad Arslan.
            <br />
            <strong>Senior Software Engineer & Full Stack Developer.</strong>
          </span>
          <p>
            I turn complex ideas into clean, scalable web applications — from
            the first interface to the last API.
          </p>
        </div>
        <div className="hero-actions hero-enter">
          <a id="hero-view-projects" href="#projects" className="button">
            Explore my work <Arrow direction="down" />
          </a>
          <a id="hero-contact" href="#contact" className="text-link">
            Let’s build something <Arrow />
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <span>
          BASED IN LAHORE, PAKISTAN
          <br />
          <span className="muted">AVAILABLE WORLDWIDE</span>
        </span>
        <SocialLinks prefix="hero" />
        <a id="hero-scroll-down" href="#about" className="scroll-cue">
          SCROLL TO EXPLORE <Arrow direction="down" />
        </a>
      </div>
    </section>
  );
}
