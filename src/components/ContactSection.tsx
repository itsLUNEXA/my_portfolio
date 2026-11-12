"use client";

import React, { useState } from "react";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2, MessageSquare, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

interface ContactSectionProps {
  email: string;
  phone?: string;
  linkedinUrl: string;
  githubUrl: string;
}

export default function ContactSection({ email, phone, linkedinUrl, githubUrl }: ContactSectionProps) {
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

    // Basic frontend verification
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Could not reach server. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-graphite border-t border-cloud-border relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sunshine text-xs font-semibold tracking-widest uppercase mb-3">
              <span className="w-8 h-[1px] bg-sunshine" />
              <span>Section 06</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cloud font-normal">
              Get in <span className="italic font-medium text-sunshine">Touch</span>
            </h2>
          </div>
          <p className="text-cloud-muted text-sm max-w-md">
            Open for software engineering opportunities, internships, technical collaborations, and hackathon teams.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-graphite-100/70 border border-cloud-border space-y-6">
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

                {/* Phone Item */}
                {phone && (
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-graphite border border-cloud-border text-sunshine shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-cloud-subtle block">
                        Direct Contact
                      </span>
                      <a
                        href={`tel:${phone}`}
                        className="text-cloud font-medium text-sm sm:text-base hover:text-sunshine transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* LinkedIn Item */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-graphite border border-cloud-border text-sunshine shrink-0 mt-0.5">
                    <LinkedinIcon className="w-5 h-5 text-sunshine" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cloud-subtle block">
                      LinkedIn Network
                    </span>
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-cloud font-medium text-sm sm:text-base hover:text-sunshine transition-colors"
                    >
                      <span>Connect on LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-sunshine" />
                    </a>
                  </div>
                </div>

                {/* GitHub Item */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-graphite border border-cloud-border text-sunshine shrink-0 mt-0.5">
                    <GithubIcon className="w-5 h-5 text-sunshine" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cloud-subtle block">
                      Open Source & Code
                    </span>
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-cloud font-medium text-sm sm:text-base hover:text-sunshine transition-colors"
                    >
                      <span>View GitHub Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-sunshine" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Availability Notice */}
            <div className="p-5 rounded-xl bg-graphite border border-cloud-border flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunshine opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sunshine" />
              </span>
              <p className="text-xs text-cloud-muted">
                Available for internships, full-time opportunities, and hackathons.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-graphite-100/50 border border-cloud-border relative">
              <h3 className="font-serif text-2xl text-cloud font-normal mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-sunshine" />
                <span>Send a Direct Message</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field for anti-spam */}
                <div className="hidden">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-cloud-subtle mb-2 font-medium">
                      Your Full Name <span className="text-sunshine">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-graphite border border-cloud-border text-cloud placeholder-cloud-subtle text-sm focus:outline-none focus:border-sunshine focus:ring-1 focus:ring-sunshine transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-cloud-subtle mb-2 font-medium">
                      Your Email Address <span className="text-sunshine">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-graphite border border-cloud-border text-cloud placeholder-cloud-subtle text-sm focus:outline-none focus:border-sunshine focus:ring-1 focus:ring-sunshine transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-cloud-subtle mb-2 font-medium">
                    Subject Line <span className="text-sunshine">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineering Opportunity / Collaboration"
                    className="w-full px-4 py-3 rounded-xl bg-graphite border border-cloud-border text-cloud placeholder-cloud-subtle text-sm focus:outline-none focus:border-sunshine focus:ring-1 focus:ring-sunshine transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-cloud-subtle mb-2 font-medium">
                    Detailed Message <span className="text-sunshine">*</span>
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
                  <div className="p-4 rounded-xl bg-green-950/40 border border-green-500/40 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-green-300 leading-relaxed">
                      Thank you! Your message has been sent successfully. I will get back to you shortly.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-3">
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-sunshine text-graphite font-semibold text-sm tracking-wide shadow-gold-sm hover:bg-sunshine-hover hover:shadow-gold-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
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
          </div>

        </div>

      </div>
    </section>
  );
}
