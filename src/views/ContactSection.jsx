import { useState } from "react";

/**
 * ContactSection
 * ------------------------------------------------------------------
 * Companion section for AnimatedTechHero. No backend required — the
 * form builds a mailto: link from what's typed in, so it opens the
 * visitor's own email client with everything pre-filled. Swap the
 * handleSubmit body for a real API call / form service if you add one.
 *
 * Edit EMAIL and SOCIALS below with your own details.
 * ------------------------------------------------------------------
 */

const EMAIL = "ariellabuson08@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
];

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "your site"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name || "—"} (${form.email || "no email given"})`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#0A0B0F] px-6 py-24 text-slate-100"
    >
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[110px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
        {/* left: quick contact */}
        <div>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let's talk
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-400">
            Have a project in mind, or just want to say hi? My inbox is open.
          </p>

          <a
            href={`mailto:${EMAIL}`}
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-indigo-300 hover:text-indigo-200"
          >
            <MailIcon /> {EMAIL}
          </a>

          <div className="mt-8 flex gap-5">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm text-slate-400 underline decoration-slate-700 underline-offset-4 hover:text-indigo-300 hover:decoration-indigo-400"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* right: form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="font-mono text-xs text-indigo-300/70">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-md border border-slate-700 bg-[#12141c] px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-mono text-xs text-indigo-300/70">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-md border border-slate-700 bg-[#12141c] px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-indigo-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="font-mono text-xs text-indigo-300/70">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="mt-1.5 w-full resize-none rounded-md border border-slate-700 bg-[#12141c] px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}