import React from 'react';
import { MapPin, Mail, ArrowUpRight, GraduationCap, Github, Linkedin, Twitter } from 'lucide-react';
import { SYSTEM_CONTEXT } from '../types/types';
import { projects as featuredProjects, type Project } from '../data/projects';
import profileImage from '../assets/profile.jpg';
import seeqLogo from '../assets/logos/seeq.png';

const { context } = SYSTEM_CONTEXT;

type Link = { name: string; url: string };

type Experience = {
  role: string;
  company: string;
  location: string;
  dates: string;
  responsibilities: string[];
  links?: Link[];
};

const HEADLINE = 'AI Engineer & Full-Stack Developer';

// Public-facing contact links (kept in sync with the site Footer).
const PROFILE_LINKS = [
  { label: 'Email', href: 'mailto:ethan@clinick.net', Icon: Mail },
  { label: 'LinkedIn', href: context.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/eclinick', Icon: Github },
  { label: 'X', href: 'https://x.com/EthanClinick', Icon: Twitter },
];

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

// Parse a "April 2025 – Present" style range into a sortable start timestamp.
function startTimestamp(dates: string): number {
  const start = dates.split(/[–-]/)[0].trim();
  const [month, year] = start.split(/\s+/);
  const m = MONTHS[(month || '').toLowerCase()] ?? 0;
  const y = Number(year);
  return Number.isNaN(y) ? 0 : new Date(y, m, 1).getTime();
}

const experiences = [...(context.experience as Experience[])].sort(
  (a, b) => startTimestamp(b.dates) - startTimestamp(a.dates),
);

// Microsoft's four-square logo, drawn inline so no asset fetch is needed.
function MicrosoftLogo() {
  return (
    <svg viewBox="0 0 23 23" className="h-[0.95em] w-[0.95em]" aria-hidden="true">
      <rect width="11" height="11" fill="#F25022" />
      <rect x="12" width="11" height="11" fill="#7FBA00" />
      <rect y="12" width="11" height="11" fill="#00A4EF" />
      <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
    </svg>
  );
}

// Company names in the About copy. On hover the logo slides in ahead of the word,
// a shine sweeps through the letterforms, and a brand-colored underline draws in.
const BRAND_KEYWORDS: Record<
  string,
  { href: string; underline: string; logo: React.ReactNode }
> = {
  Seeq: {
    href: 'https://www.seeq.com',
    underline: 'after:bg-[#00a550]',
    logo: <img src={seeqLogo} alt="" className="h-[1.05em] w-[1.05em] rounded-[3px] object-contain" />,
  },
  Microsoft: {
    href: 'https://www.microsoft.com',
    underline: 'after:bg-[#00A4EF]',
    logo: <MicrosoftLogo />,
  },
};

function BrandKeyword({ name }: { name: string }) {
  const brand = BRAND_KEYWORDS[name];
  return (
    <a
      href={brand.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/brand relative inline whitespace-nowrap font-medium text-gray-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${brand.underline}`}
    >
      <span className="inline-block max-w-0 translate-x-1 overflow-hidden align-[-0.15em] opacity-0 transition-all duration-300 ease-out group-hover/brand:mr-1.5 group-hover/brand:max-w-[1.5em] group-hover/brand:translate-x-0 group-hover/brand:opacity-100">
        {brand.logo}
      </span>
      {/* shine is painted inside the glyphs: gradient clipped to the text, swept once per hover */}
      <span className="transition-colors duration-300 group-hover/brand:animate-text-shine group-hover/brand:bg-[linear-gradient(110deg,#f4f5f7_38%,#ffffff_50%,#f4f5f7_62%)] group-hover/brand:bg-[length:250%_100%] group-hover/brand:bg-clip-text group-hover/brand:text-transparent">
        {name}
      </span>
    </a>
  );
}

// Renders plain summary text, wrapping known company names with their branded hover links,
// so the copy itself stays single-sourced in SYSTEM_CONTEXT (shared with the chatbot).
function AboutText({ text }: { text: string }) {
  const pattern = new RegExp(`\\b(${Object.keys(BRAND_KEYWORDS).join('|')})\\b`, 'g');
  return (
    <>
      {text.split(pattern).map((part, i) =>
        BRAND_KEYWORDS[part] ? (
          <BrandKeyword key={i} name={part} />
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 text-orange-400 hover:text-orange-300 transition-colors"
    >
      {children}
      <ArrowUpRight className="w-3.5 h-3.5" />
    </a>
  );
}

function ProjectItem({ project, showLink }: { project: Project; showLink?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <h3 className="text-white font-semibold">
          {project.name}
          <span className="ml-2 text-gray-600 text-xs font-mono font-normal">{project.tech}</span>
        </h3>
        {showLink && project.liveUrl && <ExternalLink href={project.liveUrl}>Visit</ExternalLink>}
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-gray-800 pt-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function MinimalView() {
  return (
    <main className="container mx-auto max-w-3xl px-4 md:px-6 pt-28 md:pt-32 pb-16 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
        <img
          src={profileImage}
          alt={context.name}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border border-white/10 shrink-0"
        />
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold leading-tight">{context.name}</h1>
          <p className="text-orange-500 font-mono text-sm">{`{ ${HEADLINE} }`}</p>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{context.location}</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {PROFILE_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* About */}
      <Section title="About">
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          <AboutText text={context.summary} />
        </p>
      </Section>

      {/* Experience */}
      <Section title="Experience">
        <div className="space-y-6">
          {experiences.map((job) => (
            <div key={`${job.company}-${job.role}`} className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-white font-semibold">{job.role}</h3>
                <span className="text-gray-500 text-xs font-mono">{job.dates}</span>
              </div>
              <p className="text-gray-300 text-sm">
                {job.company}
                <span className="text-gray-600"> · {job.location}</span>
              </p>
              {/* <ul className="mt-1.5 space-y-1">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex gap-2 text-gray-400 text-sm leading-relaxed">
                    <span className="text-orange-500/70 select-none">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul> */}
              {job.links && job.links.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  {job.links.map((link) => (
                    <ExternalLink key={link.url} href={link.url}>
                      {link.name}
                    </ExternalLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Projects — mirrors the homepage's featured projects */}
      <Section title="Projects">
        <div className="space-y-5">
          {featuredProjects
            .filter((project) => !project.retired)
            .map((project) => (
              <ProjectItem key={project.id} project={project} showLink />
            ))}
        </div>
      </Section>

      {/* Retired Projects */}
      <Section title="Retired Projects">
        <div className="space-y-5">
          {featuredProjects
            .filter((project) => project.retired)
            .map((project) => (
              <ProjectItem key={project.id} project={project} showLink={false} />
            ))}
        </div>
      </Section>

      {/* Education */}
      <Section title="Education">
        <div className="flex items-start gap-3">
          <GraduationCap className="w-5 h-5 text-orange-500/70 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-white font-semibold">{context.education.university}</h3>
            <p className="text-gray-400 text-sm">
              {context.education.degree}, {context.education.major}
            </p>
            <p className="text-gray-500 text-xs font-mono mt-0.5">{context.education.years}</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
