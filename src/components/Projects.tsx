import React from "react";
import { Filter, Github, ExternalLink, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData, Project } from "../data/portfolioData";

export default function Projects() {
  const projects = portfolioData.projects;
  const [selectedTech, setSelectedTech] = React.useState<string>("All");

  // Get a unique set of tech stacks across all projects
  const allTechnologies = React.useMemo(() => {
    const techs = new Set<string>();
    projects.forEach((p) => {
      p.technologies.forEach((t) => techs.add(t));
    });
    return ["All", ...Array.from(techs)];
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    if (selectedTech === "All") return projects;
    return projects.filter((p) => p.technologies.includes(selectedTech));
  }, [projects, selectedTech]);

  return (
    <section id="projects" className="py-24 bg-slate-950 text-slate-100 relative overflow-hidden border-t border-white/5">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Engineering Projects</span>
          </h2>
          <div className="mt-2 h-1.5 w-12 bg-indigo-500 mx-auto rounded-full" />
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            A selective breakdown of real systems, tools, and interfaces built with modern developer ergonomics in mind.
          </p>
        </div>

        {/* Live Filter Bar */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest">
            <Filter className="h-3 w-3 text-indigo-400 animate-pulse" />
            <span>Filter by Stack</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium font-sans border transition-all duration-200 cursor-pointer ${
                  selectedTech === tech
                    ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-md shadow-indigo-500/5"
                    : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, idx: number) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5"
              >
                {/* Visual Accent Glow on Hover */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-indigo-500/5 group-hover:bg-indigo-500/10 blur-2xl rounded-full transition-all duration-500" />
                
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-indigo-400 font-semibold flex items-center gap-1.5">
                        {project.featured && <Sparkles className="h-3 w-3 text-cyan-400 shrink-0" />}
                        {project.featured ? "Featured Build" : "Module System"}
                      </span>
                      <h3 className="font-display font-bold text-xl text-white mt-1 group-hover:text-indigo-300 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs font-mono text-slate-400 italic mb-4">
                    &ldquo;{project.tagline}&rdquo;
                  </p>

                  <p className="text-slate-300 text-sm leading-relaxed font-sans mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[10px] text-slate-300 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5 text-slate-400">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium hover:text-white transition-colors cursor-pointer"
                    >
                      <Github className="h-4 w-4" />
                      <span>Source Code</span>
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
