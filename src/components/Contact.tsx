import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, MessageCircle, ArrowRight, Check, Sparkles } from "lucide-react";
import { BRAND_STORY } from "../data.ts";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !name.trim(),
      email: !email.trim(),
      message: !message.trim(),
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.email || newErrors.message) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("https://formspree.io/f/mvzynzlz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
        setErrors({});
      } else {
        setSubmitError("Something went wrong. Please email us directly.");
      }
    } catch {
      setSubmitError("Network error. Please email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 md:py-32 px-6 overflow-hidden bg-[#030303] text-white transition-colors duration-500 font-sans select-none"
    >
      <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vh] bg-gradient-to-br from-amber-500/10 via-[#BEA587]/5 to-transparent blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0 opacity-80" />
      <div className="absolute top-[-5%] right-[-10%] w-[40vw] h-[40vh] bg-gradient-to-bl from-amber-500/10 via-[#BEA587]/5 to-transparent blur-[100px] rounded-full pointer-events-none mix-blend-screen z-0 opacity-70" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vh] bg-gradient-to-tl from-indigo-500/10 via-purple-500/5 to-transparent blur-[150px] rounded-full pointer-events-none mix-blend-screen z-0 opacity-60" />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_200%_150%_at_50%_40%,transparent_30%,#030303_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col h-full text-left items-start"
          >
            <div className="flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#BEA587]/20 bg-[#BEA587]/[0.03] shadow-[0_8px_30px_rgba(190,165,135,0.05)] backdrop-blur-3xl mb-8 relative overflow-hidden group hover:border-[#BEA587]/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#BEA587]/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />
                <Sparkles size={12} className="text-[#c8bfaf] opacity-90 relative z-10" />
                <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.45em] font-semibold text-[#d6cdbf] relative z-10">Get In Touch</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h2
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="font-sans text-[44px] md:text-[56px] lg:text-[64px] font-bold tracking-tight text-[#ffffff] mb-4 leading-[1.05]"
                >
                  Contact <span className="text-[#c9a96e] font-serif italic font-normal">Us.</span>
                </motion.h2>
              </motion.div>

              <p className="font-sans text-[20px] text-[#c8bfaf] font-medium tracking-tight mb-6">
                Get a free quote — no commitment needed.
              </p>

              <p className="font-sans text-[#aaaaaa] font-normal text-[16px] leading-[1.7] mb-8 max-w-md">
                Tell us about your business and what you need. We'll respond within a few hours with a clear plan and price — no confusing jargon, no pushy sales calls.
              </p>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#BEA587]/20 to-transparent mb-8" />

            <div className="flex flex-col gap-6 mb-12 w-full">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-[#0a0a0a] border border-[#BEA587]/20 shadow-[inset_0_0_15px_rgba(190,165,135,0.05),0_0_20px_rgba(190,165,135,0.12)] flex items-center justify-center text-[#BEA587] shrink-0">
                  <Mail size={20} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-[0.1em] font-medium text-[#c8bfaf] block mb-1">Email Address</span>
                  <a href={`mailto:${BRAND_STORY.directContact.email}`} className="text-white text-[16px] font-bold hover:text-[#BEA587] transition-colors cursor-pointer">
                    {BRAND_STORY.directContact.email}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-[#0a0a0a] border border-[#BEA587]/20 shadow-[inset_0_0_15px_rgba(190,165,135,0.05),0_0_20px_rgba(190,165,135,0.12)] flex items-center justify-center text-[#BEA587] shrink-0">
                  <MessageCircle size={20} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-[0.1em] font-medium text-[#c8bfaf] block mb-1">WhatsApp</span>
                  <a
                    href={`https://wa.me/${BRAND_STORY.directContact.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[16px] text-white font-bold hover:text-[#BEA587] transition-colors cursor-pointer underline underline-offset-4 decoration-white/20 hover:decoration-[#BEA587]"
                  >
                    <span>Message on WhatsApp</span>
                    <MessageCircle size={14} className="shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="p-6 md:p-10 rounded-[20px] relative z-10 lg:mt-14"
            style={{
              background: "radial-gradient(ellipse at top left, rgba(201,169,110,0.04) 0%, transparent 60%), #161616",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.5)",
              border: "1.5px solid transparent",
              backgroundClip: "padding-box",
            }}
          >
            <div
              className="absolute inset-0 rounded-[20px] pointer-events-none"
              style={{
                background: "linear-gradient(to bottom right, rgba(201, 169, 110, 0.5), rgba(255,255,255, 0.05))",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "source-out",
                maskComposite: "exclude",
                padding: "1.5px",
              }}
            />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>

              <div className="space-y-0 text-left">
                <label
                  htmlFor="contact-name"
                  className="text-[11px] font-sans uppercase tracking-[0.1em] font-medium block mb-1.5"
                  style={{ color: "rgba(201,169,110,0.6)" }}
                >
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: false }); }}
                  placeholder="Your name"
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full bg-[#0f0f0f] border ${errors.name ? "border-red-500 focus:border-red-500" : "border-white/[0.07] focus:border-[#c9a96e] focus:ring-[3px] focus:ring-[#c9a96e]/[0.08]"} rounded-[10px] px-4 py-3.5 text-[#ffffff] text-[16px] placeholder-[#444444] focus:outline-none transition-all duration-200`}
                />
                {errors.name && <span id="name-error" role="alert" className="text-[11px] text-red-500 font-medium inline-block mt-1">This field is required</span>}
              </div>

              <div className="space-y-0 text-left">
                <label
                  htmlFor="contact-email"
                  className="text-[11px] font-sans uppercase tracking-[0.1em] font-medium block mb-1.5"
                  style={{ color: "rgba(201,169,110,0.6)" }}
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: false }); }}
                  placeholder="your@email.com"
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full bg-[#0f0f0f] border ${errors.email ? "border-red-500 focus:border-red-500" : "border-white/[0.07] focus:border-[#c9a96e] focus:ring-[3px] focus:ring-[#c9a96e]/[0.08]"} rounded-[10px] px-4 py-3.5 text-[#ffffff] text-[16px] placeholder-[#444444] focus:outline-none transition-all duration-200`}
                />
                {errors.email && <span id="email-error" role="alert" className="text-[11px] text-red-500 font-medium inline-block mt-1">This field is required</span>}
              </div>

              <div className="space-y-0 text-left">
                <label
                  htmlFor="contact-message"
                  className="text-[11px] font-sans uppercase tracking-[0.1em] font-medium block mb-1.5"
                  style={{ color: "rgba(201,169,110,0.6)" }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors({ ...errors, message: false }); }}
                  placeholder="Tell us about your project..."
                  aria-required="true"
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`w-full bg-[#0f0f0f] border ${errors.message ? "border-red-500 focus:border-red-500" : "border-white/[0.07] focus:border-[#c9a96e] focus:ring-[3px] focus:ring-[#c9a96e]/[0.08]"} rounded-[10px] px-4 py-3.5 text-[#ffffff] text-[16px] placeholder-[#444444] focus:outline-none transition-all duration-200 resize-none h-[130px]`}
                />
                {errors.message && <span id="message-error" role="alert" className="text-[11px] text-red-500 font-medium inline-block mt-1">This field is required</span>}
              </div>

              <div className="pt-[8px]">
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`w-full rounded-[10px] px-6 py-4 font-sans text-[14px] tracking-[0.08em] uppercase font-bold transition-all duration-200 flex items-center justify-center gap-3 group ${
                    isSubmitting || submitted
                      ? "bg-[#333333] text-[#888888] cursor-not-allowed"
                      : "text-[#0d0d0d] hover:brightness-110 cursor-pointer"
                  }`}
                  style={!isSubmitting && !submitted ? { background: "linear-gradient(135deg, #c9a96e, #a07840)" } : undefined}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-[#888888] border-t-transparent animate-spin" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : submitted ? (
                    <>
                      <Check size={16} aria-hidden="true" />
                      <span>Message sent</span>
                    </>
                  ) : (
                    <>
                      <span>Send message</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </>
                  )}
                </button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    aria-live="polite"
                    className="mt-4 flex items-center justify-center gap-2 text-[#4ade80] text-[14px] font-medium"
                  >
                    <Check size={16} aria-hidden="true" />
                    <span>Message sent! We'll be in touch soon.</span>
                  </motion.div>
                )}

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    aria-live="assertive"
                    className="mt-4 flex items-center justify-center gap-2 text-red-400 text-[14px] font-medium"
                  >
                    <span>{submitError}</span>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
