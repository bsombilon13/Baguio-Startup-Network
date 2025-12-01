import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    // In a real app, ensure process.env.API_KEY is available. 
    // For this demo, we assume the environment is correctly set up as per instructions.
    // If not set, this will throw/fail safely.
    if (process.env.API_KEY) {
        aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        console.warn("API_KEY not found in environment variables.");
    }
  }
  return aiClient;
};

export const generateStartupDescription = async (name: string, category: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "AI services unavailable (Missing API Key).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a punchy, exciting, short description (max 25 words) for a startup or community named "${name}" in the category of "${category}". Make it sound innovative.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating description:", error);
    return "Failed to generate description.";
  }
};