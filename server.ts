import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { portfolioData } from "./src/data/portfolioData";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini Client to avoid crash if API key is not present on boot
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add your Gemini API Key in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// 1. AI Chatbot API Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGeminiClient();
    
    // Construct rich system instructions including full resume data context
    const contextJson = JSON.stringify(portfolioData, null, 2);
    const systemInstruction = `You are the AI Portfolio Assistant for Sudipta, an MCA Graduate & AI Automation Engineer. Your job is to answer the visitor's questions about Sudipta's skills, education, experience, projects, achievements, and contact info. 
Be highly professional, polite, direct, and conversational. Speak in third person about Sudipta.
Use the following portfolio data as your single source of truth:
${contextJson}

Guidelines:
- Keep answers concise, highly engaging, and readable. Use markdown bullets or short paragraphs where appropriate.
- If a question is completely unrelated to Sudipta, their career, technologies, or professional background, politely steer the conversation back to Sudipta's skills and projects.
- Be precise: only state facts that are in the provided context. If asked about something not in the context, state that you don't have that information but highlight related professional details.`;

    // Map history to the format expected by GoogleGenAI
    const formattedContents = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        if (turn.role === "user" || turn.role === "model") {
          formattedContents.push({
            role: turn.role,
            parts: [{ text: turn.text }]
          });
        }
      }
    }
    
    // Add current user message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ response: response.text });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the AI assistant." });
  }
});

// 2. Cover Letter Generator Endpoint
app.post("/api/coverletter", async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required." });
    }

    const ai = getGeminiClient();
    const contextJson = JSON.stringify(portfolioData, null, 2);
    
    const systemInstruction = `You are Sudipta, an MCA Graduate and AI Automation Engineer. 
Write a personalized, highly compelling cover letter tailored to the provided job description.
Write in Sudipta's real voice: professional, confident, technically precise, and enthusiastic about building scalable AI-driven solutions and automating workflows.
Draw directly on Sudipta's real education, technical stack, projects, and freelance/agency experience:
${contextJson}

Formatting Guidelines:
- Begin with a professional header layout (you don't need real addresses, just placeholders like [Sudipta, San Francisco, CA] and [Date]).
- Make it 3-4 paragraphs.
- Paragraph 1: An engaging hook introducing Sudipta, expressing deep interest in the role, and stating how Sudipta's expertise in AI and automation aligns.
- Paragraph 2: Match specific tech requirements in the job description to Sudipta's real projects (e.g., Agentic RAG for intelligent document pipelines, AutoFlow AI for webhook automation/queues, or ScribeAI for schema parsing). Explain the direct impact of those projects.
- Paragraph 3: Discuss problem solving, self-motivation, academic foundations, and willingness to collaborate on production-ready systems.
- Paragraph 4: Strong conclusion, offer to follow up, and professional sign-off.
- DO NOT invent any credentials, clients, or technologies that are not listed in the resume context. Keep it 100% truthful to Sudipta's profile.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Job Description:\n\n${jobDescription}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ coverLetter: response.text });
  } catch (error: any) {
    console.error("Cover Letter API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred generating the cover letter." });
  }
});

// 3. Resume Match Scorer Endpoint
app.post("/api/matchscore", async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required." });
    }

    const ai = getGeminiClient();
    const contextJson = JSON.stringify(portfolioData, null, 2);

    const systemInstruction = `You are an expert technical recruiter analyzing how well Sudipta's profile matches a target job description.
Examine Sudipta's skills, education, and projects:
${contextJson}

Carefully compare Sudipta's credentials against the target Job Description to compute a precise compatibility analysis. You MUST return a structured JSON response matching the provided schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Analyze Sudipta's resume against this Job Description:\n\n${jobDescription}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { 
              type: Type.INTEGER, 
              description: "An integer match score between 0 and 100 representing how well Sudipta's profile matches the job requirements." 
            },
            matchedSkills: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Array of technical skills and tools found in the job description that Sudipta possesses." 
            },
            missingSkills: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Array of technical skills, qualifications, or frameworks requested in the job description that Sudipta does not have in his profile." 
            },
            explanation: { 
              type: Type.STRING, 
              description: "A professional 2-3 sentence recruiter synthesis explaining the alignment and rationale for the score." 
            },
            suggestions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 highly actionable recommendations for Sudipta to customize his portfolio, highlight specific achievements, or bridge gaps for this specific role." 
            }
          },
          required: ["score", "matchedSkills", "missingSkills", "explanation", "suggestions"]
        },
        temperature: 0.2 // Lower temperature for objective recruiting evaluation
      }
    });

    // Extract JSON string from response
    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Match Score API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred scoring the resume." });
  }
});

// Configure Vite or Static Assets depending on Environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
