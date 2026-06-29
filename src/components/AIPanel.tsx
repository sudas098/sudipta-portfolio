import React from "react";
import { 
  Sparkles, MessageSquare, FileText, BarChart3, Send, 
  RefreshCw, CheckCircle2, AlertTriangle, AlertCircle, 
  Copy, Check, UserCheck, HelpCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

interface MatchScoreData {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  explanation: string;
  suggestions: string[];
}

export default function AIPanel() {
  const [activeTab, setActiveTab] = React.useState<"chat" | "cover" | "score">("chat");

  // 1. AI Chat Assistant State
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([
    { role: "model", text: "Hello! I'm Sudipta's AI Twin. Feel free to ask me anything about my technical expertise, project architecture, or how I can help your team." }
  ]);
  const [chatInput, setChatInput] = React.useState("");
  const [chatLoading, setChatLoading] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // 2. Cover Letter State
  const [coverJobDesc, setCoverJobDesc] = React.useState("");
  const [coverLetter, setCoverLetter] = React.useState("");
  const [coverLoading, setCoverLoading] = React.useState(false);
  const [coverCopied, setCoverCopied] = React.useState(false);

  // 3. Resume Scorer State
  const [scoreJobDesc, setScoreJobDesc] = React.useState("");
  const [scoreData, setScoreData] = React.useState<MatchScoreData | null>(null);
  const [scoreLoading, setScoreLoading] = React.useState(false);

  // Scroll to bottom on chat update
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle Chat Submit
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: chatMessages
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to process chat response.");

      setChatMessages(prev => [...prev, { role: "model", text: data.response }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setChatMessages(prev => [
        ...prev, 
        { role: "model", text: `⚠️ Error: ${error.message || "Something went wrong. Please make sure the GEMINI_API_KEY is configured in Settings > Secrets."}` }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Handle Cover Letter Generation
  const handleGenerateCover = async () => {
    if (!coverJobDesc.trim() || coverLoading) return;

    setCoverLoading(true);
    setCoverLetter("");

    try {
      const response = await fetch("/api/coverletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: coverJobDesc })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate cover letter.");

      setCoverLetter(data.coverLetter);
    } catch (error: any) {
      console.error("Cover letter error:", error);
      setCoverLetter(`⚠️ Error: ${error.message || "Failed to generate letter. Please verify that the server is active and API keys are set."}`);
    } finally {
      setCoverLoading(false);
    }
  };

  // Handle Resume Scoring
  const handleGenerateScore = async () => {
    if (!scoreJobDesc.trim() || scoreLoading) return;

    setScoreLoading(true);
    setScoreData(null);

    try {
      const response = await fetch("/api/matchscore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: scoreJobDesc })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to calculate match score.");

      setScoreData(data);
    } catch (error: any) {
      console.error("Score generator error:", error);
      alert(`Error: ${error.message || "Failed to score job description."}`);
    } finally {
      setScoreLoading(false);
    }
  };

  const copyCoverToClipboard = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    setCoverCopied(true);
    setTimeout(() => setCoverCopied(false), 2000);
  };

  // Sample job description triggers to quickly test features
  const pasteSampleJob = (type: "cover" | "score") => {
    const sample = `We are looking for a Senior Full-Stack Software Engineer with expertise in building real-time collaboration tools, working with React and TypeScript, and orchestrating server-side Google Gemini LLM API systems. Candidates should have experience with Node.js, PostgreSQL, Docker, and caching strategies.`;
    if (type === "cover") {
      setCoverJobDesc(sample);
    } else {
      setScoreJobDesc(sample);
    }
  };

  return (
    <section id="ai-tools" className="py-24 bg-slate-950 text-slate-100 relative overflow-hidden border-t border-white/5 grid-bg-overlay">
      {/* Background glow triggers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-4">
            <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "3s" }} />
            <span>Interactive Playground</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Agent Co-Pilots</span>
          </h2>
          <div className="mt-2 h-1.5 w-12 bg-indigo-500 mx-auto rounded-full" />
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Interact with real server-side LLM modules built on the Gemini 1.5/3.5 models to test Sudipta's qualifications, synthesize custom pitches, or score prospective job alignments.
          </p>
        </div>

        {/* Dashboard Frame (Glassmorphism) */}
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-12 min-h-[580px]">
          
          {/* Sidebar / Navigation tabs */}
          <div className="col-span-4 bg-white/5 border-b md:border-b-0 md:border-r border-white/10 p-5 flex flex-row md:flex-col gap-2 overflow-x-auto">
            <div className="hidden md:block pb-4 mb-2 border-b border-white/5">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500 font-bold">Select agent service</span>
            </div>

            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer w-full shrink-0 ${
                activeTab === "chat"
                  ? "bg-indigo-600/20 border border-indigo-500/30 text-indigo-300"
                  : "hover:bg-white/5 text-slate-400 hover:text-white border border-transparent"
              }`}
            >
              <MessageSquare className="h-4.5 w-4.5 shrink-0" />
              <div className="text-left">
                <div className="font-bold">AI Chat Twin</div>
                <div className="text-[10px] text-slate-500 hidden md:block">Ask resume context questions</div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("cover")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer w-full shrink-0 ${
                activeTab === "cover"
                  ? "bg-indigo-600/20 border border-indigo-500/30 text-indigo-300"
                  : "hover:bg-white/5 text-slate-400 hover:text-white border border-transparent"
              }`}
            >
              <FileText className="h-4.5 w-4.5 shrink-0" />
              <div className="text-left">
                <div className="font-bold">Cover Letter Gen</div>
                <div className="text-[10px] text-slate-500 hidden md:block">Auto-tailor professional letter</div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("score")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer w-full shrink-0 ${
                activeTab === "score"
                  ? "bg-indigo-600/20 border border-indigo-500/30 text-indigo-300"
                  : "hover:bg-white/5 text-slate-400 hover:text-white border border-transparent"
              }`}
            >
              <BarChart3 className="h-4.5 w-4.5 shrink-0" />
              <div className="text-left">
                <div className="font-bold">Resume Match Scorer</div>
                <div className="text-[10px] text-slate-500 hidden md:block">Calculate keyword & skill gaps</div>
              </div>
            </button>
          </div>

          {/* Core Panel Content */}
          <div className="col-span-8 flex flex-col p-6 overflow-hidden bg-slate-950/20 min-h-[450px]">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: AI Chat Assistant */}
              {activeTab === "chat" && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-1"
                >
                  {/* Chat message logs */}
                  <div className="flex-1 overflow-y-auto space-y-4 max-h-[360px] pr-2 mb-4 scrollbar-thin">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 max-w-[85%] ${
                          msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                            msg.role === "user"
                              ? "bg-slate-700 text-slate-200"
                              : "bg-indigo-600 text-white"
                          }`}
                        >
                          {msg.role === "user" ? "U" : "S"}
                        </div>
                        
                        <div
                          className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                            msg.role === "user"
                              ? "bg-indigo-600/20 border border-indigo-500/30 text-slate-200 rounded-tr-none"
                              : "bg-white/5 border border-white/5 text-slate-300 rounded-tl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}

                    {chatLoading && (
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-mono text-white animate-pulse">
                          S
                        </div>
                        <div className="p-3.5 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin text-indigo-400" />
                          <span className="text-xs text-slate-400 font-mono">Formulating twins response...</span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Suggestion tags */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    <button 
                      onClick={() => setChatInput("What are your top 3 engineering projects and what role did you play?")}
                      className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-slate-400 hover:text-white transition-colors"
                    >
                      💡 Top Projects
                    </button>
                    <button 
                      onClick={() => setChatInput("What experience do you have with generative AI frameworks?")}
                      className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-slate-400 hover:text-white transition-colors"
                    >
                      💡 Generative AI experience
                    </button>
                    <button 
                      onClick={() => setChatInput("Where are you located and what are your current contact options?")}
                      className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-slate-400 hover:text-white transition-colors"
                    >
                      💡 Location & Contact
                    </button>
                  </div>

                  {/* Chat input box */}
                  <form onSubmit={handleChatSubmit} className="mt-auto">
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-950/50 rounded-xl border border-white/10">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask Sudipta's Twin (e.g. 'What is your background with Python?')..."
                        className="bg-transparent border-none outline-none text-xs sm:text-sm flex-1 text-slate-200 placeholder:text-slate-600"
                        disabled={chatLoading}
                      />
                      <button
                        type="submit"
                        disabled={chatLoading || !chatInput.trim()}
                        className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:hover:bg-indigo-600 transition-colors cursor-pointer"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Tab 2: Smart Cover Letter Generator */}
              {activeTab === "cover" && (
                <motion.div
                  key="cover"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-1 h-full"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400 font-bold">Smart Cover Letter Synthesis</span>
                    <button
                      onClick={() => pasteSampleJob("cover")}
                      className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 underline"
                    >
                      Insert Sample Job Description
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    {/* Left: Input Textbox */}
                    <div className="flex flex-col">
                      <textarea
                        value={coverJobDesc}
                        onChange={(e) => setCoverJobDesc(e.target.value)}
                        placeholder="Paste target job description description here..."
                        className="w-full flex-1 min-h-[160px] md:min-h-[220px] p-4 rounded-xl bg-slate-950/45 border border-white/10 outline-none text-xs sm:text-sm text-slate-300 placeholder:text-slate-600 resize-none font-sans"
                      />
                      <button
                        onClick={handleGenerateCover}
                        disabled={coverLoading || !coverJobDesc.trim()}
                        className="mt-3 py-3 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/30 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {coverLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Synthesizing in Sudipta's Voice...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            <span>Generate Tailored Cover Letter</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Right: Output */}
                    <div className="flex flex-col bg-slate-950/60 rounded-xl border border-white/10 p-4 relative overflow-hidden">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                        <span className="text-[10px] font-mono text-slate-500">Output Result</span>
                        {coverLetter && (
                          <button
                            onClick={copyCoverToClipboard}
                            className="inline-flex items-center gap-1 text-[10px] text-indigo-400 hover:text-indigo-300 font-mono transition-all"
                          >
                            {coverCopied ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                <span>Copy Text</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      <div className="flex-1 overflow-y-auto max-h-[200px] md:max-h-[260px] text-xs leading-relaxed text-slate-300 font-sans whitespace-pre-wrap pr-1">
                        {coverLetter ? (
                          coverLetter
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center text-slate-600 p-4">
                            <FileText className="h-8 w-8 mb-2 opacity-50" />
                            <p>Tailored letter will appear here once job description is submitted.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Resume Match Scorer */}
              {activeTab === "score" && (
                <motion.div
                  key="score"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-1 h-full"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400 font-bold">Resume Scorecard Engine</span>
                    <button
                      onClick={() => pasteSampleJob("score")}
                      className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 underline"
                    >
                      Insert Sample Job Description
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1">
                    {/* Left 5 cols: Input text box */}
                    <div className="md:col-span-5 flex flex-col">
                      <textarea
                        value={scoreJobDesc}
                        onChange={(e) => setScoreJobDesc(e.target.value)}
                        placeholder="Paste target job specification/spec..."
                        className="w-full flex-1 min-h-[140px] md:min-h-[200px] p-3.5 rounded-xl bg-slate-950/45 border border-white/10 outline-none text-xs text-slate-300 placeholder:text-slate-600 resize-none font-sans"
                      />
                      <button
                        onClick={handleGenerateScore}
                        disabled={scoreLoading || !scoreJobDesc.trim()}
                        className="mt-3 py-3 w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-600/30 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-cyan-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {scoreLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Scoring Profile...</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4" />
                            <span>Evaluate Compatibility</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Right 7 cols: Scorecard Display */}
                    <div className="md:col-span-7 flex flex-col bg-slate-950/60 rounded-xl border border-white/10 p-4 overflow-y-auto max-h-[350px]">
                      {scoreData ? (
                        <div className="space-y-4">
                          {/* Top compatibility section */}
                          <div className="flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-xl">
                            <div>
                              <div className="text-[10px] font-mono text-slate-400 uppercase">Match Compatibility</div>
                              <div className="text-xl font-bold font-display text-white mt-0.5">
                                {scoreData.score >= 85 ? "🔥 Ideal Technical Match" : scoreData.score >= 60 ? "👍 Good Fit" : "⚠️ Skills Gap Detected"}
                              </div>
                            </div>

                            {/* Radial or circular badge */}
                            <div className="w-14 h-14 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 flex items-center justify-center font-display font-black text-sm text-indigo-400 shadow-md">
                              {scoreData.score}%
                            </div>
                          </div>

                          {/* Progress gauge */}
                          <div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-1000" 
                                style={{ width: `${scoreData.score}%` }} 
                              />
                            </div>
                          </div>

                          {/* Recruiter Synthesis */}
                          <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">Recruiter Synthesis</div>
                            <p className="text-[11px] sm:text-xs text-slate-300 font-sans leading-relaxed">
                              {scoreData.explanation}
                            </p>
                          </div>

                          {/* Matching & Missing lists */}
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> Matched Skills
                              </span>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {scoreData.matchedSkills.length > 0 ? (
                                  scoreData.matchedSkills.map((s, idx) => (
                                    <span key={idx} className="px-1.5 py-0.5 bg-emerald-500/10 rounded text-[9px] text-emerald-300 font-mono">
                                      {s}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[9px] text-slate-500">None detected.</span>
                                )}
                              </div>
                            </div>

                            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase flex items-center gap-1">
                                <AlertTriangle className="h-3.5 w-3.5 shrink-0" /> Missing / Gap
                              </span>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {scoreData.missingSkills.length > 0 ? (
                                  scoreData.missingSkills.map((s, idx) => (
                                    <span key={idx} className="px-1.5 py-0.5 bg-amber-500/10 rounded text-[9px] text-amber-300 font-mono">
                                      {s}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[9px] text-slate-500">None detected!</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Actionable recommendations */}
                          <div className="pt-2 border-t border-white/5">
                            <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">Portfolio Recommendations</div>
                            <ul className="space-y-1.5">
                              {scoreData.suggestions.map((s, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300 leading-relaxed font-sans">
                                  <span className="text-cyan-400 shrink-0">•</span>
                                  <span>{s}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      ) : (
                        <div className="h-full flex-1 flex flex-col items-center justify-center text-center text-slate-600 py-8">
                          <BarChart3 className="h-8 w-8 mb-2 opacity-50" />
                          <p className="text-xs">
                            Scorecard report will render here.
                          </p>
                          <p className="text-[10px] text-slate-700 mt-1 max-w-[200px]">
                            Paste a job spec next door and click Evaluate.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
