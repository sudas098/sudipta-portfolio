import React from "react";
import { ArrowRight, Code, Cpu, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData } from "../data/portfolioData";

export default function Hero() {
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const roles = portfolioData.roles;

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentRole = roles[roleIndex];
    
    const tick = () => {
      if (!isDeleting) {
        // Typing characters
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        
        if (displayText === currentRole) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting characters
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        
        if (displayText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }
      
      const speed = isDeleting ? 40 : 100;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, isDeleting ? 40 : 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden bg-zinc-50 dark:bg-zinc-950 grid-bg-overlay"
    >
      {/* Dynamic Background Blurs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Decorative Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-400 mb-6 text-xs font-mono"
        >
          <Cpu className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "3s" }} />
          <span>Available for Developer & AI Automation roles</span>
        </motion.div>

        {/* Display Typography Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white"
        >
          Hi, I am <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-300 bg-clip-text text-transparent">{portfolioData.name}</span>
        </motion.h1>

        {/* Typewriter Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-xl sm:text-2xl md:text-3xl font-display font-medium text-zinc-600 dark:text-zinc-300 min-h-[40px] flex justify-center items-center"
        >
          <span>I'm a&nbsp;</span>
          <span className="text-indigo-600 dark:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-400 pr-1 animate-pulse">
            {displayText}
          </span>
        </motion.div>

        {/* Bio Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed"
        >
          {portfolioData.bio}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button
            onClick={() => scrollToSection("#ai-tools")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-lg hover:shadow-indigo-600/20 hover:-translate-y-0.5 cursor-pointer"
          >
            Try AI Playground
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          
          <button
            onClick={() => scrollToSection("#projects")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-850 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 font-medium text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <Code className="mr-2 h-4 w-4 text-indigo-500" />
            View Projects
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 flex justify-center space-x-6 text-zinc-400 dark:text-zinc-500"
        >
          <a
            href={`https://${portfolioData.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={`https://${portfolioData.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`https://${portfolioData.contact.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${portfolioData.contact.email}`}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
