/**
 * Footer
 * ------------------------------------------------------------------
 * Small closing bar for the portfolio. Edit NAME / EMAIL / SOCIALS.
 * ------------------------------------------------------------------
 */

const NAME = "Ariel Labuson";
const EMAIL = "ariellabuson08@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800 bg-[#0A0B0F] px-6 py-8 text-slate-500">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs">
          © {year} {NAME}
        </p>

        <div className="flex items-center gap-5">
          <a
            href={`mailto:${EMAIL}`}
            className="font-mono text-xs hover:text-indigo-300"
          >
            {EMAIL}
          </a>
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs hover:text-indigo-300"
            >
              {social.label}
            </a>
          ))}
          <a href="#top" className="font-mono text-xs hover:text-indigo-300">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}