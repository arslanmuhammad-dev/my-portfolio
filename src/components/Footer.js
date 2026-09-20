import React from "react";
import { Arrow, navLinks, SocialLinks } from "./Shared";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="#hero" className="wordmark" aria-label="Muhammad Arslan, home">
          ma<span aria-hidden="true">✳</span>
        </a>
        <p>
          Senior Software Engineer.
          <br />
          Full stack. Thoughtfully built.
        </p>
        <nav aria-label="Footer navigation">
          {navLinks.map((link) => (
            <a
              id={`footer-link-${link.toLowerCase()}`}
              key={link}
              href={`#${link.toLowerCase()}`}
            >
              {link}
            </a>
          ))}
        </nav>
        <SocialLinks prefix="footer" />
      </div>
      <div className="footer-name">
        MUHAMMAD
        <br />
        <span>ARSLAN</span>
        <a id="footer-scroll-top" href="#hero" aria-label="Back to top">
          <Arrow />
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Muhammad Arslan. All rights reserved.
        </span>
        <span>BUILT WITH REACT & MUI</span>
        <a href="#hero">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
