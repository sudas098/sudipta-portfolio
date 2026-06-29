import React from "react";
import { BrainCircuit, Layout, Server, Settings, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData, Skill } from "../data/portfolioData";

export default function Skills() {
  const [activeTab, setActiveTab] = React.useState<'all' | 'ai-ml' | 'frontend' | 'backend' | 'devops'>('all');
  const skills = portfolioData.skills;

  const categories = [
    { id: "all", name: "All Skills", icon: Terminal },
    { id: "ai-ml", name: "AI & ML", icon: BrainCircuit },
    { id: "frontend", name: "Frontend", icon: Layout },
    { id: "backend", name: "Full-Stack", icon: Server },
    { id: "devops", name: "DevOps & Cloud", icon: Settings },
  ];

  const filteredSkills = activeTab === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ai-ml": return "bg-indigo-600 dark:bg-indigo-500 text-indigo-600";
      case "frontend": return "bg-emerald-600 dark:bg-emerald-500 text-emerald-600";
      case "backend": return "bg-amber-600 dark:bg-amber-500 text-amber-600";
      case "devops": return "bg-sky-600 dark:bg-sky-500 text-sky-600";
      default: return "bg-indigo-600 dark:bg-indigo-500 text-indigo-600";
    }
  };

  return (
    <section id="skills" className="py-24 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Technical Arsenal
          </h2>
          <div className="mt-2 h-1 w-12 bg-indigo-600 mx-auto rounded-full" />
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base">
            My technical skills mapped across specialized architectural tiers. Tap categories to filter and inspect detailed proficiency metrics.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md scale-[1.02]"
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const themeColor = getCategoryColor(skill.category);
              const colorPrefix = themeColor.split(" ")[0]; // e.g. bg-indigo-600
              const textPrefix = themeColor.split(" ")[2]; // e.g. text-indigo-600

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-zinc-50 dark:bg-zinc-850/40 border border-zinc-100 dark:border-zinc-800/40 p-5 rounded-2xl relative overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="font-sans font-semibold text-sm text-zinc-800 dark:text-zinc-100">
                      {skill.name}
                    </span>
                    <span className={`font-mono text-xs font-bold ${textPrefix}`}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Glass Progress Bar track */}
                  <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${colorPrefix}`}
                    />
                  </div>

                  {/* Micro label for category */}
                  <div className="mt-2.5 flex items-center justify-end">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
                      {skill.category === "backend" ? "full-stack" : skill.category.replace("-", " ")}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
