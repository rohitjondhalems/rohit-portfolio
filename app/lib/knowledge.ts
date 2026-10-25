/**
 * Builds the chatbot's knowledge base: curated CV entries plus content generated from
 * the same source the page renders (content.ts), so the bot and the site never disagree.
 */
import { contactInfo, projects, skills } from "../content";
import { cvKnowledge, type KnowledgeEntry } from "../knowledge/cv";

export type { KnowledgeEntry };

function siteProjectEntries(): KnowledgeEntry[] {
  // Projects with public repos aren't in the CV yet, so they come from the site.
  return projects
    .filter((p) => p.github)
    .map((p) => ({
      id: `site-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
      title: `${p.title} (open source)`,
      section: "Projects",
      text:
        `${p.title} — ${p.tag}. ${p.desc} ${p.metrics} ${p.bullets.join(" ")} ` +
        `It is an open-source portfolio project; the code is public on GitHub at ${p.github}.`,
    }));
}

function skillEntries(): KnowledgeEntry[] {
  return [
    {
      id: "skills-genai",
      title: "Skills — GenAI & AI agents",
      section: "Skills",
      text: `Generative AI and AI agent skills: ${skills.genAI.join("; ")}.`,
    },
    {
      id: "skills-cloud",
      title: "Skills — Cloud & MLOps",
      section: "Skills",
      text: `Cloud and MLOps skills: ${skills.cloudMLOps.join("; ")}.`,
    },
    {
      id: "skills-languages",
      title: "Skills — Languages & tools",
      section: "Skills",
      text: `Programming languages and tools: ${skills.languagesTools.join("; ")}.`,
    },
  ];
}

const contactEntry: KnowledgeEntry = {
  id: "contact",
  title: "Contact and availability",
  section: "Contact",
  text:
    `To contact ${contactInfo.name}, email ${contactInfo.email} or connect on LinkedIn at ${contactInfo.linkedin}. ` +
    `His CV can be downloaded from this site (${contactInfo.flowcv}). He is based in ${contactInfo.location} and is ` +
    `open to AI/ML Engineer, GenAI Engineer and AI Solution Architect opportunities; for availability, notice period, ` +
    `salary or interview scheduling, please email him directly.`,
};

const aboutBot: KnowledgeEntry = {
  id: "about-bot",
  title: "About this chatbot",
  section: "Site",
  text:
    "This 'Ask about Rohit' assistant is a small retrieval-augmented generation (RAG) chatbot that Rohit built for his " +
    "portfolio. It retrieves passages from his CV and this website with BM25 keyword ranking, then an LLM (GPT-OSS 120B " +
    "via Groq, with Claude as a fallback) answers only from those passages and cites them. It refuses off-topic questions " +
    "and says so when the answer is not in his CV or site.",
};

export const knowledgeBase: KnowledgeEntry[] = [
  ...cvKnowledge,
  ...siteProjectEntries(),
  ...skillEntries(),
  contactEntry,
  aboutBot,
];
