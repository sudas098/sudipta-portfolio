import React from "react";
import { User, Calendar, MapPin, Briefcase, GraduationCap, Code2, Award } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData } from "../data/portfolioData";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950 text-slate-100">
      {/* Dynamic Glow */}
      <div className="absolute -left-16 top-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-16 bottom-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{portfolioData.name}</span>
          </h2>
          <div className="mt-2 h-1.5 w-12 bg-indigo-500 mx-auto rounded-full" />
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            A developer who fuses computer science principles with powerful AI automation workflows and full-stack web products.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Bio card (Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <User className="h-5 w-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">My Philosophy</h3>
              </div>
              <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
                I am an MCA graduate and AI automation developer who loves turning complex procedures into completely autonomous code. 
                I focus on the intersection of scalable backend scripting and user-friendly web frameworks.
              </p>
              <p className="mt-4 text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
                My work centers around using Python, Large Language Models (LLMs), and semantic retrieval systems (RAG) 
                to optimize day-to-day operations and help teams scale. I build type-safe, modular, and reusable code pipelines 
                that are easy to test, deploy, and maintain.
              </p>
            </div>

            {/* Quick facts list */}
            <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
                <span className="text-xs text-slate-300">India / Remote Available</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Briefcase className="h-4 w-4 text-cyan-400 shrink-0" />
                <span className="text-xs text-slate-300">AI Automation Expert</span>
              </div>
              <div className="flex items-center gap-2.5">
                <GraduationCap className="h-4 w-4 text-indigo-400 shrink-0" />
                <span className="text-xs text-slate-300">MCA Graduate (2025)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-cyan-400 shrink-0" />
                <span className="text-xs text-slate-300">Ready for full-time role</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Metrics / Summary Card (Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display font-bold text-lg text-white mb-6">Core Focus Areas</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">AI Operations</div>
                  <div className="text-sm font-semibold text-white mt-1">Autonomous agents & RAG workflows</div>
                  <p className="text-xs text-slate-400 mt-1">Prompt architecture, semantic embedding pipelines, vector databases</p>
                </div>

                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Modern Web Dev</div>
                  <div className="text-sm font-semibold text-white mt-1">Responsive interfaces with React & Tailwind</div>
                  <p className="text-xs text-slate-400 mt-1">Framer Motion, clean interfaces, lightweight client state</p>
                </div>

                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Backend Systems</div>
                  <div className="text-sm font-semibold text-white mt-1">Python, FastAPIs & REST Backends</div>
                  <p className="text-xs text-slate-400 mt-1">Automated scripting, background processes, clean databases</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-center">
              <span className="text-xs text-indigo-300 font-mono">
                "Simple is better than complex. Complex is better than complicated."
              </span>
            </div>
          </motion.div>
        </div>

        {/* Education Section (MCA / B.Sc.) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Academic Foundation</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.education.map((edu, idx) => (
              <div 
                key={idx} 
                className="p-5 bg-white/5 border border-white/10 hover:border-indigo-500/40 transition-colors rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-display font-bold text-white text-base">{edu.degree}</h4>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-cyan-400" />
                    {edu.institution}
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                    {edu.scoreOrDetails}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
