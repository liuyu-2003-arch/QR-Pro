
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis } from "../types";

// Always use the direct process.env.API_KEY as per guidelines
// Initialization must use a named parameter object: { apiKey: string }
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes content using Gemini to optimize it for QR code encoding.
 * Suggests a title and provides a summary.
 */
export const analyzeContent = async (content: string): Promise<AIAnalysis> => {
  // Use gemini-3-flash-preview for general text optimization and summarization tasks
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: `Analyze the following content intended for a QR code. 
    1. If it's a very long URL, suggest a shortened version (logic only, don't invent shortlinks if not possible, just clean it). 
    2. If it's long text, provide a concise summary that retains essential information.
    3. Suggest a 3-5 word title for this QR code.
    
    Content: ${content}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          optimizedValue: {
            type: Type.STRING,
            description: "An optimized, concise version of the input content."
          },
          suggestedTitle: {
            type: Type.STRING,
            description: "A short descriptive title."
          },
          summary: {
            type: Type.STRING,
            description: "A brief summary of what the content is."
          }
        },
        required: ["optimizedValue", "suggestedTitle", "summary"]
      }
    }
  });

  // Extract text output using the .text property (not a method) as per guidelines
  const jsonStr = response.text?.trim();
  try {
    return JSON.parse(jsonStr || '{}') as AIAnalysis;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    return {
      optimizedValue: content,
      suggestedTitle: "QR Code",
      summary: "No summary available."
    };
  }
};
