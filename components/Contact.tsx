"use client";

import { useRef, useEffect, useState } from "react";

// Simple email format check
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const links = [
  {
    label: "Email",
    href: "mailto:hello@malaika.dev",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/malaika-rizwan-a47b3a3ab?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/malaika-rizwan",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // Inline validation errors (shown under each field after submit attempt)
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /**
   * Frontend validation before sending.
   * Name: required, min 2 chars. Email: required, valid format. Message: required, min 10 chars.
   */
  function validate(): boolean {
    const next: { name?: string; email?: string; message?: string } = {};
    const n = name.trim();
    const e = email.trim();
    const m = message.trim();

    if (!n) next.name = "Name is required.";
    else if (n.length < 2) next.name = "Name must be at least 2 characters.";

    if (!e) next.email = "Email is required.";
    else if (!EMAIL_REGEX.test(e)) next.email = "Please enter a valid email address.";

    if (!m) next.message = "Message is required.";
    else if (m.length < 10) next.message = "Message must be at least 10 characters.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  /**
   * On "Send Message": prevent default, validate all fields, then POST to /api/contact.
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError("");
    setSent(false);

    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSent(true);
        setName("");
        setEmail("");
        setMessage("");
        setErrors({});
      } else {
        setSubmitError((data.error as string) || "Failed to send message");
      }
    } catch {
      setSubmitError("Failed to send message");
    } finally {
      setStatus("idle");
    }
  }

  // Ensure button click always triggers form submit (avoids issues with scroll/capture)
  function onSendClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    formRef.current?.requestSubmit();
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-secondary/30 bg-[linear-gradient(0deg,rgba(239,136,173,0.12)_0%,transparent_40%)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Contact
        </h2>
        <p
          className={`text-accent-light text-sm uppercase tracking-widest mb-12 transition-all duration-700 delay-100 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          Get in touch
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div
            className={`space-y-6 transition-all duration-700 delay-150 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-gray-400">
              Reach out via email or socials, or use the form for a quick
              message.
            </p>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-3 text-accent-light hover:text-white font-medium transition-colors"
                  >
                    <span className="w-10 h-10 rounded-lg bg-secondary/60 border border-accent/30 flex items-center justify-center text-accent-light">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form
            ref={formRef}
            className={`rounded-2xl bg-primary/80 border border-secondary/50 p-6 shadow-soft transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="space-y-4">
              {/* Success message after send */}
              {sent && (
                <p className="text-green-400 text-sm font-medium">
                  Message sent successfully. I&apos;ll get back to you soon.
                </p>
              )}
              {/* API/submit error */}
              {submitError && (
                <p className="text-red-400 text-sm font-medium">{submitError}</p>
              )}

              {/* Name: required, min 2 characters */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="mt-1 text-red-400 text-xs font-medium">{errors.name}</p>
                )}
              </div>

              {/* Email: required, valid format */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1 text-red-400 text-xs font-medium">{errors.email}</p>
                )}
              </div>

              {/* Message: required, min 10 characters */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  rows={4}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-accent/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-red-400 text-xs font-medium">{errors.message}</p>
                )}
              </div>

              {/* Submit: disabled while sending, shows "Sending..." — click triggers form submit */}
              <button
                type="button"
                disabled={status === "sending"}
                onClick={onSendClick}
                className="w-full py-3 rounded-xl bg-accent hover:bg-accent-light text-white font-semibold transition-colors shadow-soft hover:shadow-soft-hover disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
