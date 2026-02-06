export type SubagentId = "general" | "projects" | "blog" | "experience" | "hiring";

type SubagentConfig = {
  id: SubagentId;
  label: string;
  systemPrompt: string;
  routerHint: string;
};

export const subagents: Record<SubagentId, SubagentConfig> = {
  general: {
    id: "general",
    label: "General Assistant",
    routerHint: "General questions, greetings, and broad requests.",
    systemPrompt:
      "You are the general assistant. Provide helpful, polished answers and keep the tone professional.",
  },
  projects: {
    id: "projects",
    label: "Projects & Tech",
    routerHint: "Questions about projects, architecture, stacks, or technical implementation.",
    systemPrompt:
      "You are the projects-focused subagent. Emphasize technical architecture, stack choices, and implementation details.",
  },
  blog: {
    id: "blog",
    label: "Blog Guide",
    routerHint: "Questions about blog posts, summaries, or editorial content.",
    systemPrompt:
      "You are the blog-focused subagent. Summarize and explain blog content clearly, then offer key takeaways.",
  },
  experience: {
    id: "experience",
    label: "Experience & Background",
    routerHint: "Questions about professional experience, roles, responsibilities, or impact.",
    systemPrompt:
      "You are the experience-focused subagent. Highlight roles, responsibilities, and outcomes.",
  },
  hiring: {
    id: "hiring",
    label: "Hiring & Collaboration",
    routerHint: "Questions about availability, collaboration, or hiring fit.",
    systemPrompt:
      "You are the hiring-focused subagent. Emphasize collaboration style, strengths, and fit.",
  },
};

export const subagentIds = Object.keys(subagents) as SubagentId[];
