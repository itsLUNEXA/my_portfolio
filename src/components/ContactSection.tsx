"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import WordReveal from "./animations/WordReveal";
import ScrollReveal from "./animations/ScrollReveal";
import WordmarkReveal from "./animations/WordmarkReveal";

interface ContactSectionProps {
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

export default function ContactSection({ email, linkedinUrl, githubUrl }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields before submitting.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (formData.name.trim().length < 2) {
      setStatus("error");
      setErrorMessage("Please provide your full name (at least 2 characters).");
      return;
    }

    if (formData.subject.trim().length < 3) {
      setStatus("error");
      setErrorMessage("Please provide a subject line (at least 3 characters).");
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please provide a detailed message (at least 10 characters).");
      return;
    }

    // Honeypot anti-spam check (bots fill this, humans cannot see it)
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || accessKey.trim() === "" || accessKey === "your_access_key") {
      setStatus("error");
      setErrorMessage(
        "Web3Forms Access Key is not configured yet. Please add your access key to NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in your .env.local file."
      );
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey.trim(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          botcheck: formData.honeypot || "",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
        });
      } else {
        throw new Error(data.message || "Failed to submit message to Web3Forms.");
      }
    } catch (err: unknown) {
      console.error("Web3Forms submission error:", err);
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while sending your message. Please try again or reach out directly by email.";
      setStatus("error");
      setErrorMessage(message);
    }
  };

  return (
    <section id="contact" className="py-24 bg-graphite border-t border-cloud-border relative scroll-mt-24 sm:scroll-mt-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sunshine text-xs font-semibold tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-sunshine" />
              <span>Section 06</span>
            </div>
            <WordReveal
              as="h2"
              text="Get in Touch"
              highlightWords={["Touch"]}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cloud font-normal"
              stagger={0.1}
            />
          </div>
          <ScrollReveal delay={0.2} yOffset={20} blurAmount={8}>
            <p className="text-cloud-muted text-sm max-w-md">
              Open for software engineering opportunities, internships, technical collaborations, and hackathon teams.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Direct Contact & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.1} duration={0.9} yOffset={40} blurAmount={12}>
              <div className="p-8 rounded-2xl bg-graphite-100/70 border border-cloud-border space-y-6 shadow-lg">
                <h3 className="font-serif text-2xl text-cloud font-normal">
                  Let&apos;s start a conversation.
                </h3>
                <p className="text-cloud-muted text-sm leading-relaxed font-light">
                  Whether you have an inquiry about my projects, want to discuss an open role, or wish to explore a collaboration, I look forward to hearing from you.
                </p>

                <div className="space-y-4 pt-4 border-t border-cloud-border">
                  
                  {/* Email Item */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-graphite border border-cloud-border text-sunshine shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-cloud-subtle block">
                        Direct Email
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className="text-cloud font-medium text-sm sm:text-base hover:text-sunshine transition-colors break-all"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                </div>

                {/* Social Connect Profiles */}
                <div className="pt-6 border-t border-cloud-border space-y-3">
                  <span className="text-xs uppercase tracking-wider text-cloud-subtle block">
                    Professional Networks
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sunshine flex items-center justify-between p-3 rounded-xl bg-graphite border border-cloud-border text-xs font-semibold text-cloud hover:text-sunshine hover:border-sunshine/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <LinkedinIcon className="w-4 h-4 text-sunshine" />
                        <span>LinkedIn</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-cloud-subtle" />
                    </a>

                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sunshine flex items-center justify-between p-3 rounded-xl bg-graphite border border-cloud-border text-xs font-semibold text-cloud hover:text-sunshine hover:border-sunshine/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <GithubIcon className="w-4 h-4 text-sunshine" />
                        <span>GitHub</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-cloud-subtle" />
                    </a>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2} duration={0.9} yOffset={40} blurAmount={12}>
              <div className="p-8 sm:p-10 rounded-2xl bg-graphite-100/50 border border-cloud-border shadow-xl">
                <h3 className="font-serif text-2xl text-cloud font-normal mb-2">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-cloud-muted mb-8 leading-relaxed">
                  Fill in your details below and I will respond to your inquiry directly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot anti-spam field */}
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-semibold text-cloud uppercase tracking-wider block">
                        Your Name <span className="text-sunshine">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-graphite border border-cloud-border text-cloud placeholder-cloud-subtle text-sm focus:outline-none focus:border-sunshine focus:ring-1 focus:ring-sunshine transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-cloud uppercase tracking-wider block">
                        Email Address <span className="text-sunshine">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-graphite border border-cloud-border text-cloud placeholder-cloud-subtle text-sm focus:outline-none focus:border-sunshine focus:ring-1 focus:ring-sunshine transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-semibold text-cloud uppercase tracking-wider block">
                      Subject <span className="text-sunshine">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Opportunity / Collaboration / Question"
                      className="w-full px-4 py-3 rounded-xl bg-graphite border border-cloud-border text-cloud placeholder-cloud-subtle text-sm focus:outline-none focus:border-sunshine focus:ring-1 focus:ring-sunshine transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-cloud uppercase tracking-wider block">
                      Message <span className="text-sunshine">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please write your message here..."
                      className="w-full px-4 py-3 rounded-xl bg-graphite border border-cloud-border text-cloud placeholder-cloud-subtle text-sm focus:outline-none focus:border-sunshine focus:ring-1 focus:ring-sunshine transition-all resize-none"
                    />
                  </div>

                  {/* Status Messages */}
                  {status === "success" && (
                    <div role="status" aria-live="polite" className="p-4 rounded-xl bg-green-950/40 border border-green-500/40 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-green-300 leading-relaxed">
                        Thank you! Your message has been sent successfully. I will get back to you shortly.
                      </p>
                    </div>
                  )}

                  {status === "error" && (
                    <div role="alert" aria-live="assertive" className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-300 leading-relaxed">
                        {errorMessage || "Submission error. Please check your fields and try again."}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    aria-busy={status === "submitting"}
                    className="btn-sunshine w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-sunshine text-graphite font-semibold text-sm tracking-wide shadow-gold-sm hover:bg-sunshine-hover hover:shadow-gold-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-graphite" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-graphite" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Cinematic Grand Wordmark (Showreel Scene 6 Feature) */}
        <WordmarkReveal text="MAHEEN FATIMA" />

      </div>
    </section>
  );
}
