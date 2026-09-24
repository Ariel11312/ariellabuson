import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PROJECTS = [
  {
    tag: "mobile marketplace",
    title: "Upahan",
    desc: "A mobile apartment rental and hauling platform with real-time navigation and transparent, compliant booking.",
    stack: ["React", "REST API", "Real-time maps", "PostgreSQL"],
    accent: "from-cyan-500/30 to-cyan-500/0",
    mock: "rental",
    link: "https://play.google.com/store/apps/details?id=com.ariel.upahan",
  },
  {
    tag: "study platform",
    title: "Studiel",
    desc: "A student-focused study companion with organized notes, subject navigation, and a clean reading layout built to reduce friction while reviewing.",
    stack: ["React", "TypeScript", "REST API"],
    accent: "from-emerald-500/30 to-emerald-500/0",
    mock: "study",
    link: "https://studielcore.onrender.com/dashboard",
  },
  {
    tag: "point-of-sale system",
    title: "Bula-On Laundry Hub POS",
    desc: "A point-of-sale system for small food and retail businesses covering order entry, receipts, and daily sales tracking on desktop and mobile.",
    stack: ["React", "Node.js", "MySQL"],
    accent: "from-amber-500/30 to-amber-500/0",
    mock: "pos",
    link: "https://bulaonpos.onrender.com/pos",
  },
  {
    tag: "e-commerce platform",
    title: "Wemultiply",
    desc: "A full-stack e-commerce solution built during a production internship — responsive storefront, REST API backend, and a database tuned for performance and security.",
    stack: ["Node.js", "Express", "MySQL", "React", "Tailwind CSS"],
    accent: "from-indigo-500/30 to-indigo-500/0",
    mock: "ecommerce",
    link: "https://github.com/Ariel11312/Multiply",
  },
  {
    tag: "ride-hailing",
    title: "Trike Connect",
    desc: "A local ride-booking app connecting riders with tricycle drivers, with live route tracking so both sides know exactly where the trip stands.",
    stack: ["React", "Node.js", "Maps API", "MySQL"],
    accent: "from-fuchsia-500/30 to-fuchsia-500/0",
    mock: "route",
    link: "https://github.com/Ariel11312/trike_connect",
  },
];

// Injects the custom scrollbar styling once, globally, so plain
// className="custom-scrollbar" works anywhere in the app.
function ScrollbarStyles() {
  return (
    <style>{`
      /* Force the page scrollbar to always be visible, overriding any
         global CSS elsewhere in the app that hides it or locks height. */
      html, body {
        overflow-y: scroll !important;
        height: auto !important;
        max-height: none !important;
        scrollbar-gutter: stable;
        scrollbar-width: auto !important;
        scrollbar-color: rgba(129, 140, 248, 0.6) #0A0B0F !important;
      }
      html::-webkit-scrollbar, body::-webkit-scrollbar {
        width: 12px !important;
        display: block !important;
      }
      html::-webkit-scrollbar-track, body::-webkit-scrollbar-track {
        background: #0A0B0F;
      }
      html::-webkit-scrollbar-thumb, body::-webkit-scrollbar-thumb {
        background-color: rgba(129, 140, 248, 0.6);
        border-radius: 9999px;
        border: 2px solid #0A0B0F;
      }
      html::-webkit-scrollbar-thumb:hover, body::-webkit-scrollbar-thumb:hover {
        background-color: rgba(129, 140, 248, 0.85);
      }

      /* Scrollbar used on smaller scroll containers within this section
         (e.g. the mobile card row, the project modal). */
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(129, 140, 248, 0.55) rgba(21, 24, 36, 0.4);
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        display: block;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(21, 24, 36, 0.4);
        border-radius: 9999px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(129, 140, 248, 0.55);
        border-radius: 9999px;
        border: 2px solid transparent;
        background-clip: padding-box;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: rgba(129, 140, 248, 0.8);
      }
    `}</style>
  );
}

function Mockup({ type }) {
  const stroke = "rgba(148,163,184,0.35)";
  const fillSoft = "rgba(99,102,241,0.18)";
  const ink = "rgba(226,232,240,0.9)";

  if (type === "ecommerce") {
    return (
      <svg viewBox="0 0 400 260" className="h-full w-full">
        <rect width="400" height="260" fill="#0F1117" />
        <rect x="0" y="0" width="400" height="26" fill="#151824" />
        <circle cx="16" cy="13" r="3.5" fill={stroke} />
        <circle cx="28" cy="13" r="3.5" fill={stroke} />
        <circle cx="40" cy="13" r="3.5" fill={stroke} />
        {[24, 148, 272].map((x) => (
          <g key={x}>
            <rect x={x} y="46" width="104" height="76" rx="4" fill="#151824" stroke={stroke} />
            <rect x={x + 10} y="56" width="84" height="46" rx="3" fill={fillSoft} />
            <rect x={x + 10} y="110" width="60" height="6" rx="2" fill={ink} opacity="0.5" />
          </g>
        ))}
        <rect x="24" y="140" width="352" height="10" rx="2" fill={ink} opacity="0.7" />
        <rect x="24" y="158" width="220" height="8" rx="2" fill={ink} opacity="0.35" />
        <rect x="24" y="182" width="90" height="26" rx="4" fill="#6366F1" />
      </svg>
    );
  }
  if (type === "rental") {
    return (
      <svg viewBox="0 0 400 260" className="h-full w-full">
        <rect width="400" height="260" fill="#0F1117" />
        <rect x="132" y="18" width="136" height="224" rx="18" fill="#151824" stroke={stroke} />
        <path d="M150 150 C180 90, 240 190, 260 80" stroke="#22D3EE" strokeWidth="2.5" fill="none" opacity="0.7" />
        <circle cx="150" cy="150" r="5" fill={ink} />
        <circle cx="260" cy="80" r="6" fill="#22D3EE" />
        <rect x="150" y="176" width="100" height="52" rx="5" fill="#1B1F2C" stroke={stroke} />
        <rect x="160" y="186" width="60" height="7" rx="2" fill={ink} opacity="0.8" />
        <rect x="160" y="200" width="80" height="6" rx="2" fill={ink} opacity="0.4" />
        <rect x="160" y="212" width="44" height="10" rx="3" fill="#22D3EE" />
      </svg>
    );
  }
  if (type === "route") {
    return (
      <svg viewBox="0 0 400 260" className="h-full w-full">
        <rect width="400" height="260" fill="#0F1117" />
        <rect x="24" y="24" width="352" height="212" rx="6" fill="#151824" stroke={stroke} />
        <path d="M56 200 C130 130, 210 210, 280 110 S 340 70, 360 50" stroke="#D946EF" strokeWidth="2" strokeDasharray="2 8" fill="none" opacity="0.7" />
        <circle cx="56" cy="200" r="6" fill={ink} />
        <circle cx="360" cy="50" r="7" fill="#D946EF" />
        <g transform="translate(210,150)">
          <rect x="-20" y="-8" width="34" height="16" rx="4" fill={ink} opacity="0.9" />
          <circle cx="-12" cy="10" r="6" fill={ink} opacity="0.9" />
          <circle cx="12" cy="10" r="6" fill={ink} opacity="0.9" />
          <rect x="6" y="-18" width="12" height="12" rx="2" fill="#D946EF" />
        </g>
      </svg>
    );
  }
  if (type === "study") {
    return (
      <svg viewBox="0 0 400 260" className="h-full w-full">
        <rect width="400" height="260" fill="#0F1117" />
        <rect x="40" y="30" width="320" height="200" rx="5" fill="#151824" stroke={stroke} />
        <rect x="40" y="30" width="108" height="200" fill={fillSoft} />
        <rect x="58" y="54" width="72" height="8" rx="2" fill="#10B981" />
        <rect x="58" y="74" width="56" height="6" rx="2" fill={ink} opacity="0.4" />
        <rect x="58" y="90" width="64" height="6" rx="2" fill={ink} opacity="0.4" />
        <rect x="170" y="54" width="166" height="10" rx="2" fill={ink} opacity="0.85" />
        <rect x="170" y="76" width="166" height="6" rx="2" fill={ink} opacity="0.35" />
        <rect x="170" y="90" width="140" height="6" rx="2" fill={ink} opacity="0.35" />
        <rect x="170" y="112" width="70" height="44" rx="4" fill="#151824" stroke={stroke} />
        <rect x="252" y="112" width="70" height="44" rx="4" fill="#151824" stroke={stroke} />
        <circle cx="205" cy="134" r="11" fill="#10B981" opacity="0.8" />
        <circle cx="287" cy="134" r="11" fill={ink} opacity="0.5" />
      </svg>
    );
  }
  // pos
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full">
      <rect width="400" height="260" fill="#0F1117" />
      <rect x="40" y="30" width="188" height="200" rx="5" fill="#151824" stroke={stroke} />
      <rect x="60" y="52" width="86" height="9" rx="2" fill={ink} opacity="0.85" />
      <line x1="60" y1="74" x2="208" y2="74" stroke={stroke} />
      <rect x="60" y="86" width="100" height="6" rx="2" fill={ink} opacity="0.4" />
      <rect x="60" y="102" width="100" height="6" rx="2" fill={ink} opacity="0.4" />
      <line x1="60" y1="122" x2="208" y2="122" stroke={stroke} />
      <rect x="60" y="134" width="56" height="9" rx="2" fill={ink} opacity="0.85" />
      <rect x="152" y="134" width="56" height="9" rx="2" fill="#F59E0B" />
      <rect x="60" y="158" width="148" height="24" rx="4" fill="#F59E0B" />
      <rect x="256" y="56" width="104" height="150" rx="8" fill="#151824" stroke={stroke} />
      <rect x="266" y="70" width="84" height="96" rx="3" fill="#1B1F2C" />
      <rect x="276" y="82" width="30" height="18" rx="3" fill="#F59E0B" />
      <rect x="276" y="108" width="64" height="6" rx="2" fill={ink} opacity="0.4" />
      <rect x="276" y="120" width="50" height="6" rx="2" fill={ink} opacity="0.4" />
    </svg>
  );
}

function ProjectCard({ project, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer rounded-xl border border-slate-800 bg-[#0D0E13] p-4 transition-all duration-300 active:scale-[0.98] hover:-translate-y-1.5 hover:border-indigo-400/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
    >
      <div
        className={`pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br ${project.accent} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative overflow-hidden rounded-lg border border-slate-800">
        <Mockup type={project.mock} />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#0D0E13] via-transparent to-transparent transition-opacity duration-300 ${
            hovered ? "opacity-40" : "opacity-70"
          }`}
        />
      </div>

      <div className="relative mt-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-indigo-300/70">
          {project.tag}
        </p>
        <h3 className="mt-1 font-sans text-lg font-semibold text-white">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {project.desc}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded border border-slate-700 px-2 py-0.5 font-mono text-[11px] text-slate-400"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="custom-scrollbar relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-y-auto overscroll-contain rounded-t-2xl border border-slate-800 bg-[#0D0E13] shadow-2xl sm:max-h-[88vh] sm:rounded-xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="sticky right-3 top-3 z-10 ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-[#151824]/90 text-slate-400 backdrop-blur transition-colors hover:border-indigo-400/50 hover:text-white"
        >
          ✕
        </button>

        <div className="-mt-9 aspect-[400/260] w-full shrink-0">
          <Mockup type={project.mock} />
        </div>

        <div className="p-5 sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-wide text-indigo-300/70">
            {project.tag}
          </p>
          <h3 className="mt-1 font-sans text-xl font-semibold text-white sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {project.desc}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded border border-slate-700 px-2 py-0.5 font-mono text-[11px] text-slate-400"
              >
                {s}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-400 sm:w-auto sm:py-2.5"
          >
            Visit project
          </a>
        </div>
      </div>
    </div>
  );
}

// Back-to-main arrow. Uses React Router's Link so it's a real route
// change (to "/"), matching how "View projects" navigates here.
function BackToHome() {
  return (
    <Link
      to="/"
      className="group mb-6 inline-flex items-center gap-2 font-mono text-sm text-slate-400 transition-colors hover:text-indigo-300 sm:mb-8"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
      Back to home
    </Link>
  );
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="projects"
      className="relative w-full overflow-x-hidden bg-[#0A0B0F] px-4 py-16 text-slate-100 sm:px-6 sm:py-24"
    >
      <ScrollbarStyles />

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(110,120,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(110,120,255,0.5) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <BackToHome />

        <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="font-mono text-xs text-indigo-300/70">04 / selected work</p>
            <h2 className="mt-2 font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              Projects
            </h2>
          </div>
          <p className="max-w-xs text-sm text-slate-500 sm:block">
            Five shipped builds spanning e-commerce, mobility, and internal tools.
          </p>
        </div>

        {/*
          Mobile: horizontal snap-scroll row with a visible custom scrollbar,
          so cards stay full-width and readable on small screens.
          sm+: switches back to a normal responsive grid.
        */}
        <div
          className="custom-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
        >
          {PROJECTS.map((p) => (
            <div key={p.title} className="w-[85%] shrink-0 snap-start sm:w-auto sm:shrink">
              <ProjectCard project={p} onOpen={setSelected} />
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}