import React, { useEffect, useRef, useState } from "react";
import { Arrow, navLinks, SocialLinks } from "./Shared";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const toggle = useRef(null);
  const progress = useRef(null);
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const total =
          document.documentElement.scrollHeight - window.innerHeight;
        progress.current.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  const close = () => {
    dialog.current.close();
    setOpen(false);
    toggle.current?.focus();
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="scroll-progress" ref={progress} />
        <a className="wordmark" href="#hero" aria-label="Muhammad Arslan, home">
          ma<span aria-hidden="true">✳</span>
        </a>
        <span className="header-caption">
          MUHAMMAD ARSLAN
          <br />
          <span>SOFTWARE ENGINEER</span>
        </span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              id={`nav-${link.toLowerCase()}`}
              key={link}
              href={`#${link.toLowerCase()}`}
            >
              {link}
            </a>
          ))}
        </nav>
        <a
          id="nav-hire-me"
          className="button button-small header-cta"
          href="mailto:arslansaleem622@gmail.com"
        >
          Let’s talk <Arrow />
        </a>
        <button
          ref={toggle}
          id="mobile-menu-toggle"
          className="menu-toggle"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="navigation-dialog"
        >
          Menu{" "}
          <span className="menu-lines">
            <i />
            <i />
          </span>
        </button>
      </header>
      <dialog
        ref={dialog}
        id="navigation-dialog"
        className="menu-dialog"
        aria-label="Site navigation"
        onCancel={close}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="menu-top">
          <a className="wordmark" href="#hero" onClick={close}>
            ma<span aria-hidden="true">✳</span>
          </a>
          <button
            id="mobile-menu-close"
            onClick={close}
            className="menu-toggle"
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="menu-content">
          <span className="eyebrow">A LOOK AROUND</span>
          <nav aria-label="Expanded navigation">
            {navLinks.map((link, i) => (
              <a
                style={{ "--i": i }}
                id={`mobile-nav-${link.toLowerCase()}`}
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={close}
              >
                <sup>0{i + 1}</sup>
                {link}
                <Arrow />
              </a>
            ))}
          </nav>
          <div className="menu-bottom">
            <a id="mobile-nav-hire-me" href="mailto:arslansaleem622@gmail.com">
              arslansaleem622@gmail.com
            </a>
            <SocialLinks prefix="menu" />
          </div>
        </div>
      </dialog>
    </>
  );
}
