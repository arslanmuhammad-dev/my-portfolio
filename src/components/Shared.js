import React, { useEffect, useRef } from "react";

export const socials = [
  { label: "GitHub", href: "https://github.com/arslanmuhammad-dev" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/muhammad-arslan-0624971b5",
  },
  { label: "Email", href: "mailto:arslansaleem622@gmail.com" },
];
export const navLinks = ["About", "Projects", "Experience", "Contact"];
export function Arrow({ direction = "up", ...props }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
      style={{
        transform:
          direction === "down"
            ? "rotate(135deg)"
            : direction === "right"
              ? "rotate(45deg)"
              : undefined,
      }}
    >
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function Reveal({ children, className = "", delay = 0, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (
      typeof window === "undefined" ||
      !el ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal-pending");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--delay": `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}
export function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span className="tiny-cross">+</span>
      <span>{children}</span>
      <span className="section-number">/{number}</span>
    </div>
  );
}
export function SocialLinks({ prefix }) {
  return (
    <div className="social-links">
      {socials.map((s) => (
        <a
          key={s.label}
          id={`${prefix}-social-${s.label.toLowerCase()}`}
          href={s.href}
          target={s.label === "Email" ? undefined : "_blank"}
          rel={s.label === "Email" ? undefined : "me noopener noreferrer"}
        >
          {s.label}
          <Arrow />
        </a>
      ))}
    </div>
  );
}
