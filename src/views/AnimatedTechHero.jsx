import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import my_image from "../assets/2x2 picture.jpg"
// import avatarImg from "../assets/2x2 picture.jpg"; // <-- point this at your real asset

/**
 * Portfolio
 * ------------------------------------------------------------------
 * Combined single-file version of: AnimatedTechHero + AboutSection
 * (placeholder, since no source was provided) + ContactSection +
 * Footer. Drop into a React + Tailwind (v3+) project.
 *
 * BACKGROUND FIX
 * ------------------------------------------------------------------
 * Each section set its own bg-[#0A0B0F], but <html>/<body> were left
 * unstyled (default white). On mobile, scroll rubber-banding (and any
 * gap during layout/resize) exposed that white background at the top
 * and bottom edges. Fixed by:
 *   1. A global <style> block setting html/body background to match
 *      the sections, with height:100% so it always fills the viewport.
 *   2. overscroll-behavior-y: none to kill the bounce-to-white effect.
 *   3. Removing the per-section background classes in favor of one
 *      continuous background wrapper, so there's no seam between
 *      sections even during transitions.
 *
 * "GET IN TOUCH" BLANK PAGE FIX
 * ------------------------------------------------------------------
 * The anchor links (#about, #projects) had BOTH a real href AND an
 * onClick handler that did NOT call e.preventDefault(). That let the
 * browser perform its native hash-navigation at the same time your
 * JS was trying to smooth-scroll — which, depending on how this app
 * is mounted (router, base path, etc.), could cause a blank render.
 * Fixed by making scrollToId a handler-factory that calls
 * e.preventDefault() before scrolling, and wiring every anchor link
 * through it consistently (including "Back to top").
 * ------------------------------------------------------------------
 */

const BG = "#0A0B0F";

/* ---------------------------------------------------------------- */
/* Shared: smooth-scroll click handler                               */
/* ---------------------------------------------------------------- */

// Returns an onClick handler for a given section id. Always prevents
// the native anchor jump so it can't race with (or replace) the
// smooth scroll — this is what was causing the blank-page issue.
function scrollToId(id) {
  return function handleClick(e) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
}

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */

const ROLES = [
  "Full-stack Developer",
  "React / TypeScript",
  "REST API Design",
  "MySQL & PostgreSQL",
];

const PROFILE_IMAGE = my_image; // set to your imported avatar
const INITIALS = "AL";

function useTypewriter(words, typingSpeed = 65, pauseMs = 1400) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? typingSpeed / 2 : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, pauseMs]);

  return text;
}

const FLOATERS = [
  { glyph: "</>", left: "8%", delay: "0s", duration: "9s", size: "text-sm" },
  { glyph: "{ }", left: "22%", delay: "2.2s", duration: "11s", size: "text-lg" },
  { glyph: "=>", left: "68%", delay: "1s", duration: "10s", size: "text-base" },
  { glyph: "npm", left: "84%", delay: "3.4s", duration: "8s", size: "text-xs" },
  { glyph: "git", left: "45%", delay: "4.4s", duration: "12s", size: "text-sm" },
  { glyph: "SQL", left: "90%", delay: "0.8s", duration: "9.5s", size: "text-xs" },
];

function ProfileAvatar() {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = PROFILE_IMAGE && !imgFailed;

  return (
    <div className="relative mb-8 h-28 w-28 shrink-0 sm:mb-0 sm:mr-8 sm:h-32 sm:w-32">
      <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-indigo-500/40 to-cyan-400/30 blur-xl" />
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-indigo-400/40 bg-[#151824] shadow-[0_0_0_4px_rgba(99,102,241,0.08)]">
        {showImage ? (
          <img
            src={PROFILE_IMAGE}
            alt="Ariel Labuson"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 font-mono text-3xl font-semibold text-indigo-200">
            {INITIALS}
          </div>
        )}
      </div>
      <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0A0B0F] bg-[#0A0B0F]">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
        </span>
      </span>
    </div>
  );
}

function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden text-slate-100 flex items-center"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] animate-[gridPan_18s_linear_infinite]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(110,120,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(110,120,255,0.5) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-indigo-600/30 blur-[110px] animate-[blobDrift_14s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-48 -right-24 h-[26rem] w-[26rem] rounded-full bg-cyan-500/20 blur-[110px] animate-[blobDrift2_16s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[100px] animate-[blobDrift_20s_ease-in-out_infinite_reverse]" />

      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute bottom-0 ${f.size} font-mono text-indigo-300/30 animate-[floatUp_var(--dur)_linear_infinite]`}
          style={{ left: f.left, animationDelay: f.delay, "--dur": f.duration }}
        >
          {f.glyph}
        </span>
      ))}

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 font-mono text-xs text-indigo-300 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          available for work
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center">
          <ProfileAvatar />
          <div>
            <h1 className="font-sans text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
              Ariel Labuson
            </h1>
            <div className="mt-5 h-9 font-mono text-lg text-indigo-300 sm:text-xl">
              <span>{typed}</span>
              <span className="ml-0.5 inline-block w-[2px] translate-y-[2px] animate-[blink_1s_step-end_infinite] bg-indigo-300 align-middle h-6" />
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Building fast, well-structured web apps — from e-commerce backends to
          POS systems — with React on the front and solid APIs underneath.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#about"
            onClick={scrollToId("about")}
            className="group relative overflow-hidden rounded-md bg-indigo-500 px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10">Get in touch</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-400 to-cyan-400 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <Link
            to="/projects"
            className="rounded-md border border-slate-700 px-6 py-3 font-medium text-slate-200 transition-colors hover:border-indigo-400 hover:text-indigo-300"
          >
            View projects
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* About (placeholder — swap in your real AboutSection content)      */
/* ---------------------------------------------------------------- */

const SKILLS = [
  "React", "TypeScript", "Node.js", "Express",
  "MySQL", "PostgreSQL", "REST APIs", "Tailwind CSS",
];

function AboutSection() {
  return (
    <section id="about" className="relative w-full px-6 py-24 text-slate-100">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
          About
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          I'm a full-stack developer focused on building fast, maintainable web
          apps end to end — from data models and APIs to the interfaces people
          actually use. Comfortable owning a feature from schema design through
          to a polished, animated UI.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <span
              key={s}
              className="rounded-full border border-slate-700 bg-[#12141c] px-3 py-1.5 font-mono text-xs text-indigo-300"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Contact                                                            */
/* ---------------------------------------------------------------- */

const EMAIL = "ariellabuson08@gmail.com";
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ContactSection() {
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
    <section id="contact" className="relative w-full overflow-hidden px-6 py-24 text-slate-100">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[110px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let's talk
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-400">
            Have a project in mind, or just want to say hi? My inbox is open.
          </p>
          <a href={`mailto:${EMAIL}`} className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-indigo-300 hover:text-indigo-200">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="font-mono text-xs text-indigo-300/70">Name</label>
              <input
                id="name" name="name" type="text" value={form.name} onChange={handleChange} required
                className="mt-1.5 w-full rounded-md border border-slate-700 bg-[#12141c] px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-mono text-xs text-indigo-300/70">Email</label>
              <input
                id="email" name="email" type="email" value={form.email} onChange={handleChange} required
                className="mt-1.5 w-full rounded-md border border-slate-700 bg-[#12141c] px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-indigo-400"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="font-mono text-xs text-indigo-300/70">Message</label>
            <textarea
              id="message" name="message" rows={5} value={form.message} onChange={handleChange} required
              className="mt-1.5 w-full resize-none rounded-md border border-slate-700 bg-[#12141c] px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-indigo-400"
            />
          </div>
          <button type="submit" className="rounded-md bg-indigo-500 px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.02]">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Footer                                                             */
/* ---------------------------------------------------------------- */

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800 px-6 py-8 text-slate-500">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs">© {year} Ariel Labuson</p>
        <div className="flex items-center gap-5">
          <a href={`mailto:${EMAIL}`} className="font-mono text-xs hover:text-indigo-300">{EMAIL}</a>
          {SOCIALS.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="font-mono text-xs hover:text-indigo-300">
              {social.label}
            </a>
          ))}
          <a href="#top" onClick={scrollToId("top")} className="font-mono text-xs hover:text-indigo-300">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- */
/* Page                                                               */
/* ---------------------------------------------------------------- */

export default function Portfolio() {
  return (
    <div style={{ background: BG }} className="min-h-screen w-full">
      {/* Global background fix: html/body match the page background and
          scroll bounce no longer exposes white edges on mobile. */}
      <style>{`
        html, body, #root {
          background: ${BG};
          min-height: 100%;
        }
        html {
          overscroll-behavior-y: none;
        }
        @keyframes gridPan {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 42px 42px, 42px 42px; }
        }
        @keyframes blobDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes blobDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -25px) scale(1.1); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

      <Hero />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}