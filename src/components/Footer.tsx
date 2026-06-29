import React from "react";
import { Sparkles } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-slate-950 border-t border-white/5 py-8 text-slate-400 text-xs text-center relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
          <span className="font-sans font-semibold text-slate-300">
            © {currentYear} {portfolioData.name} Portfolio
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500 text-[10px] font-mono">React & Tailwind CSS</span>
        </div>

        {/* Social channels */}
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-wider">
          <a
            href={`https://${portfolioData.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={`https://${portfolioData.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`https://${portfolioData.contact.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
