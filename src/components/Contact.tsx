import React from "react";
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData } from "../data/portfolioData";

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    // Simulate real database integration / mail trigger safely
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 text-slate-100 relative overflow-hidden border-t border-white/5">
      {/* Background blurs */}
      <div className="absolute top-1/2 -left-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Connection</span>
          </h2>
          <div className="mt-2 h-1.5 w-12 bg-indigo-500 mx-auto rounded-full" />
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Interested in hiring Sudipta, discussing automated workflows, or just sending feedback? Pop a message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Left Column: Details */}
          <div className="md:col-span-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono uppercase">Direct Mail</div>
                    <a href={`mailto:${portfolioData.contact.email}`} className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors mt-0.5 block">
                      {portfolioData.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono uppercase">Workplace Base</div>
                    <span className="text-sm font-semibold text-white mt-0.5 block">
                      India (Remote Available)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="mt-12 pt-6 border-t border-white/5">
              <div className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-4">
                Alternate Portals
              </div>
              <div className="flex gap-4">
                <a
                  href={`https://${portfolioData.contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={`https://${portfolioData.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={`https://${portfolioData.contact.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="md:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">Transmission Delivered!</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-sm leading-relaxed">
                  Sudipta's mock integration pipeline successfully processed your letter request. Thank you for your inquiry!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono font-bold rounded-lg transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/45 border border-white/10 outline-none text-xs sm:text-sm text-slate-300 placeholder:text-slate-600 font-sans focus:border-indigo-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/45 border border-white/10 outline-none text-xs sm:text-sm text-slate-300 placeholder:text-slate-600 font-sans focus:border-indigo-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/45 border border-white/10 outline-none text-xs sm:text-sm text-slate-300 placeholder:text-slate-600 font-sans focus:border-indigo-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Message Body *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how Sudipta can assist with your software infrastructure..."
                    className="w-full min-h-[120px] px-3.5 py-2.5 rounded-xl bg-slate-950/45 border border-white/10 outline-none text-xs sm:text-sm text-slate-300 placeholder:text-slate-600 font-sans focus:border-indigo-500/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.name || !formData.email || !formData.message}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Delivering message...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
