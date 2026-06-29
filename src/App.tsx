/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import AIPanel from "./components/AIPanel";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [darkMode, setDarkMode] = React.useState(true);

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Absolute Frosted Ambient Radial Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(99,102,241,0.1),transparent_30%)] pointer-events-none z-0" />
      
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 grid-bg-overlay pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Pages Flow */}
      <main className="flex-1 flex flex-col relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <AIPanel />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
