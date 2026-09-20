import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Arrow, Reveal, SectionLabel, SocialLinks } from "./Shared";

export default function Contact() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const service = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const template = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !publicKey) {
      setStatus({
        error: true,
        message:
          "Email service is unavailable. Please email me directly at arslansaleem622@gmail.com.",
      });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await emailjs.sendForm(service, template, formRef.current, { publicKey });
      formRef.current.reset();
      setStatus({
        error: false,
        message:
          "Message sent. Thanks for reaching out — I’ll get back to you soon.",
      });
    } catch {
      setStatus({
        error: true,
        message:
          "Your message could not be sent. Please try again or email arslansaleem622@gmail.com directly.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="contact section-pad">
      <SectionLabel number="04">LET’S MAKE SOMETHING MATTER</SectionLabel>
      <div className="contact-grid">
        <Reveal className="contact-copy">
          <span className="eyebrow">
            <span className="status-dot" /> OPEN TO OPPORTUNITIES
          </span>
          <h2>
            Your next idea.
            <br />
            <span className="serif">Let’s build it.</span>
          </h2>
          <p>
            Looking for a Senior Software Engineer who ships full-stack products
            end-to-end? I’d love to hear what you have in mind.
          </p>
          <a className="contact-email" href="mailto:arslansaleem622@gmail.com">
            arslansaleem622@gmail.com <Arrow />
          </a>
          <span className="location">
            Lahore, Pakistan · Open to remote opportunities
          </span>
          <SocialLinks prefix="contact" />
        </Reveal>
        <Reveal className="contact-form-wrap" delay={120}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            aria-label="Contact Muhammad Arslan"
            aria-busy={loading}
          >
            <div className="form-row">
              <label htmlFor="contact-name">
                YOUR NAME <span>*</span>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="How should I call you?"
                  required
                  maxLength={120}
                />
              </label>
              <label htmlFor="contact-email">
                EMAIL ADDRESS <span>*</span>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                  maxLength={254}
                />
              </label>
            </div>
            <label htmlFor="contact-subject">
              SUBJECT
              <input
                id="contact-subject"
                name="subject"
                placeholder="What are you working on?"
                maxLength={200}
              />
            </label>
            <label htmlFor="contact-message">
              YOUR MESSAGE <span>*</span>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                placeholder="A little about your idea, team, or opportunity…"
                required
                maxLength={6000}
              />
            </label>
            <div className="form-bottom">
              <span>
                Good things start with
                <br />a conversation.
              </span>
              <button
                id="contact-submit"
                className="button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send message"}
                <Arrow />
              </button>
            </div>
            {status && (
              <p
                className={`form-status ${status.error ? "error" : ""}`}
                role={status.error ? "alert" : "status"}
              >
                {status.message}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
