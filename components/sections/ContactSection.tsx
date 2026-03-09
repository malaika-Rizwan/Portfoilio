"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import SpinningImage from "@/components/SpinningImage";
import SectionCard from "./SectionCard";
import SectionHeading from "@/components/SectionHeading";
import StarBorder from "@/components/StarBorder";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(data: { name: string; email: string; message: string }) {
  const errors: Record<string, string> = {};
  if (!data.name || data.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  }
  if (!EMAIL_REGEX.test((data.email || "").trim())) {
    errors.email = "Enter a valid email";
  }
  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }
  return errors;
}

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitError(null);
      const data = { name: name.trim(), email: email.trim(), message: message.trim() };
      const nextErrors = validateForm(data);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;

      setLoading(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            website, // honeypot: should be empty
          }),
        });
        const json = (await res.json()) as { message?: string; error?: string };

        if (!res.ok) {
          setSubmitError(json.error || "Something went wrong");
          return;
        }
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
        setWebsite("");
        setErrors({});
      } catch {
        setSubmitError("Failed to send message. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [name, email, message, website]
  );

  return (
    <SectionCard id="contact" className="!max-w-[1400px] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-[10%] right-[12%] w-14 h-18 opacity-35" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", background: "#2d1b4e" }} />
        <div className="absolute bottom-[22%] left-[10%] w-10 h-14 opacity-30" style={{ clipPath: "polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)", background: "#2d1b4e" }} />
        <div className="absolute top-[38%] left-[6%] w-8 h-12 opacity-25" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", background: "#2d1b4e" }} />
        <div className="absolute bottom-[10%] right-[15%] w-12 h-16 opacity-30" style={{ clipPath: "polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)", background: "#2d1b4e" }} />
      </div>

      <SectionHeading id="contact" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 block">
        Contact
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mt-12 w-full">
        <div className="md:col-span-1 flex items-center justify-center order-2 md:order-1 cursor-pointer w-full min-h-[280px] md:min-h-[50vh] -mt-4 md:-mt-8">
          <SpinningImage
            spinDuration={20}
            onHover="speedUp"
            className="relative w-full aspect-square max-w-xl md:max-w-3xl min-h-[280px]"
          >
            <div className="relative w-full h-full">
              <Image
                src="/web_earth.png"
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </SpinningImage>
        </div>
        <div className="md:col-span-1 flex flex-col order-1 md:order-2 w-full min-w-0">
          {success ? (
            <div className="rounded-2xl bg-primary/80 border border-accent/30 p-6 text-center">
              <p className="text-accent-light font-medium text-lg">Message sent successfully</p>
              <p className="text-gray-400 text-sm mt-2">I&apos;ll get back to you soon.</p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-4 text-sm text-gray-400 hover:text-white underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              className="rounded-2xl bg-primary/80 border border-secondary/50 p-6 shadow-soft"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Honeypot - hidden from users, bots fill it */}
              <div className="absolute -left-[9999px] w-1 h-1 overflow-hidden" aria-hidden>
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-secondary/40 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors ${
                      errors.name ? "border-red-500/70" : "border-accent/20"
                    }`}
                    autoComplete="name"
                    disabled={loading}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-secondary/40 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors ${
                      errors.email ? "border-red-500/70" : "border-accent/20"
                    }`}
                    autoComplete="email"
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-secondary/40 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors resize-none ${
                      errors.message ? "border-red-500/70" : "border-accent/20"
                    }`}
                    disabled={loading}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                {submitError && (
                  <p className="text-sm text-red-400">{submitError}</p>
                )}

                <StarBorder
                  as="button"
                  type="submit"
                  color="magenta"
                  speed="5s"
                  disabled={loading}
                  className="w-full [&_.inner-content]:!w-full [&_.inner-content]:!bg-accent [&_.inner-content]:hover:!bg-accent-light [&_.inner-content]:!py-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </StarBorder>
              </div>
            </form>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
