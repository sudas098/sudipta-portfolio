import React from "react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData, Experience as ExpType } from "../data/portfolioData";

export default function Experience() {
  const experiences = portfolioData.experience;

  return (
    <section id="experience" className="py-24 bg-slate-950 text-slate-100 relative overflow-hidden border-t border-white/5">
      {/* Background blurs */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Timeline</span>
          </h2>
          <div className="mt-2 h-1.5 w-12 bg-indigo-500 mx-auto rounded-full" />
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            A look at my professional journey, building automated software workflows and modern applications.
          </p>
        </div>

        {/* Timeline Structure */}
        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12 max-w-4xl mx-auto">
          {experiences.map((exp: ExpType, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Timeline Indicator Ring */}
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center group-hover:bg-indigo-500 group-hover:scale-110 transition-all duration-300">
                <Briefcase className="h-3 w-3 text-indigo-400 group-hover:text-white transition-colors" />
              </div>

              {/* Glassmorphic timeline card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-indigo-500/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-slate-300 mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full w-fit self-start sm:self-center">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-3 mb-6">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                      <ChevronRight className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="pt-4 border-t border-white/5">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2.5">
                    Utilized Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-xs text-indigo-200 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
