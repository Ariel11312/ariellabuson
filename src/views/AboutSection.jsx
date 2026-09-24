/**
 * AboutSection
 * ------------------------------------------------------------------
 * Companion section for AnimatedTechHero. Same dark palette
 * (#0A0B0F / indigo / cyan), same font-mono labels, no extra deps.
 *
 * Usage: <AboutSection /> — drop it right after the hero.
 * Edit SKILL_GROUPS and BIO below with your own details.
 * ------------------------------------------------------------------
 */

const BIO = [
  "I build web applications end to end — from the database schema up through the API to the screen someone actually taps.",
  "Most of my recent work has been e-commerce backends and point-of-sale systems: inventory that has to stay accurate, checkouts that can't fail, and dashboards people rely on during a shift.",
  "I like React on the front for how fast it lets me iterate, and I'm particular about API design — predictable routes, clear error shapes, nothing surprising for whoever consumes it next.",
];

const SKILL_GROUPS = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Redux"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "REST API Design", "PHP"],
  },
  {
    label: "Data",
    items: ["MySQL", "PostgreSQL", "Redis"],
  },
  {
    label: "Tooling",
    items: ["Git", "Docker", "Postman", "Vercel"],
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#0A0B0F] px-6 py-24 text-slate-100"
    >
      {/* faint static grid, quieter than the hero's animated one */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(110,120,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(110,120,255,0.5) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl gap-16 md:grid-cols-[1.1fr_0.9fr]">
        {/* left: bio */}
        <div>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
            About
          </h2>

          <div className="mt-6 space-y-5">
            {BIO.map((line, i) => (
              <p
                key={i}
                className="max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* right: skills, grouped rather than one flat tag cloud */}
        <div className="space-y-8">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono text-xs text-indigo-300/70">
                {group.label}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-slate-700/80 bg-[#12141c] px-3 py-1.5 font-mono text-sm text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}