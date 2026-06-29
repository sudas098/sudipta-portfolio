export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'frontend' | 'backend' | 'ai-ml' | 'devops';
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  scoreOrDetails: string;
}

export interface PortfolioData {
  name: string;
  tagline: string;
  bio: string;
  roles: string[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export const portfolioData: PortfolioData = {
  name: "Sudipta",
  tagline: "MCA Graduate & AI Automation Engineer",
  bio: "Passionate about building scalable AI-driven solutions and automating complex workflows. Focused on combining robust, type-safe Next.js & TypeScript full-stack architectures with modern frontend layouts and smart AI integrations.",
  roles: [
    "MCA Graduate",
    "AI Automation Engineer",
    "Full-Stack TypeScript Developer"
  ],
  skills: [
    // AI & ML
    { name: "Google Gemini API / LLMs", level: 92, category: "ai-ml" },
    { name: "Python / Scripting / PyTorch", level: 95, category: "ai-ml" },
    { name: "LangChain & RAG Pipelines", level: 90, category: "ai-ml" },
    { name: "Vector Search (Chroma, Pinecone)", level: 88, category: "ai-ml" },
    
    // Frontend
    { name: "React / Vite", level: 90, category: "frontend" },
    { name: "TypeScript", level: 92, category: "frontend" },
    { name: "Tailwind CSS", level: 95, category: "frontend" },
    { name: "Framer Motion / Animations", level: 88, category: "frontend" },
    { name: "HTML5 / Canvas / SVG", level: 85, category: "frontend" },

    // Full-Stack
    { name: "Next.js / App Router / SSR", level: 93, category: "backend" },
    { name: "TypeScript / Full-Stack APIs", level: 95, category: "backend" },
    { name: "Node.js / Express Backends", level: 90, category: "backend" },
    { name: "PostgreSQL / Drizzle / Prisma ORM", level: 88, category: "backend" },
    { name: "RESTful APIs / GraphQL / WebSockets", level: 89, category: "backend" },

    // DevOps & Automation
    { name: "Docker / Containerization", level: 85, category: "devops" },
    { name: "CI/CD (GitHub Actions)", level: 84, category: "devops" },
    { name: "Cloud Run / AWS GCP", level: 80, category: "devops" },
    { name: "Linux / Shell Scripting / Cron", level: 88, category: "devops" }
  ],
  projects: [
    {
      id: "agentic-rag",
      title: "Agentic RAG",
      tagline: "Intelligent enterprise document context intelligence engine",
      description: "A document intelligence framework built to ingest PDF, CSV, and markdown documents, segment them using semantic splitters, embed them in high-density vectors, and answer multi-turn client queries grounded with specific sources.",
      technologies: ["Python", "FastAPI", "Gemini API", "ChromaDB", "LangChain", "Docker"],
      githubUrl: "https://github.com/sudipta/agentic-rag",
      liveUrl: "https://agenticrag.demo",
      featured: true
    },
    {
      id: "autoflow-ai",
      title: "AutoFlow AI",
      tagline: "Web hook background worker & automation pipeline",
      description: "An automated multi-agent system that runs active background tasks, crawls external web targets, synthesizes market trends, and fires off Slack/Discord webhook reports using parallel queuing.",
      technologies: ["Python", "FastAPI", "WebSockets", "Redis", "Celery", "Docker"],
      githubUrl: "https://github.com/sudipta/autoflow-ai",
      liveUrl: "https://autoflow.demo",
      featured: true
    },
    {
      id: "scribe-ai",
      title: "ScribeAI",
      tagline: "Live code schema analysis & interactive API documenter",
      description: "A developer tool that hooks into files to run schema parsing, auto-generating clean, live OpenAPI specs and document logs in real-time as your codebase updates.",
      technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/sudipta/scribe-ai",
      liveUrl: "https://scribeai.demo",
      featured: true
    },
    {
      id: "apex-agent",
      title: "ApexAgent",
      tagline: "Autonomous customer dialogue agent",
      description: "An interactive chatbot assistant that reads customer store inventories and executes real-time orders through standard semantic interfaces.",
      technologies: ["TypeScript", "Node.js", "Gemini API", "PostgreSQL", "React", "Tailwind CSS"],
      githubUrl: "https://github.com/sudipta/apexagent",
      liveUrl: "https://apexagent.demo",
      featured: false
    }
  ],
  experience: [
    {
      company: "Freelance & Agency Projects",
      role: "AI Automation Engineer",
      period: "May 2024 - Present",
      description: [
        "Designed and implemented production-ready RAG workflows using Python and the Gemini API, significantly improving document analysis turnaround times for local businesses.",
        "Built automated lead generation crawlers and background scraping tasks, orchestrating Redis queuing mechanisms and containerized Docker setups.",
        "Created custom client-facing interfaces using React and Tailwind CSS, facilitating seamless interactions with background AI models."
      ],
      technologies: ["Python", "FastAPI", "React", "Gemini API", "PostgreSQL", "Docker", "Redis"]
    },
    {
      company: "Innovative Code Sprints",
      role: "Full-Stack Developer & Lead Builder",
      period: "Jun 2023 - Apr 2024",
      description: [
        "Developed type-safe REST APIs in Express and Node.js, establishing clean database connections and optimized database operations.",
        "Crafted dynamic and fluid interactive components using React and Framer Motion, standardizing a library of responsive micro-components.",
        "Streamlined automated script tasks and scheduled cron jobs, decreasing manual workflow latency by 60%."
      ],
      technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"]
    }
  ],
  education: [
    {
      institution: "A.S. College / University",
      degree: "Master of Computer Applications (MCA)",
      period: "2023 - 2025",
      scoreOrDetails: "Focused on Advanced Software Engineering, Machine Learning, Database Management, and Full-Stack Architectures."
    },
    {
      institution: "State University",
      degree: "Bachelor of Computer Science (B.Sc.)",
      period: "2020 - 2023",
      scoreOrDetails: "Graduated with Honors. Rigorous foundation in Algorithms, Object-Oriented Programming, and Data Structures."
    }
  ],
  contact: {
    email: "sudipta.dev@example.com",
    github: "github.com/sudipta",
    linkedin: "linkedin.com/in/sudipta",
    twitter: "twitter.com/sudipta_dev"
  }
};
