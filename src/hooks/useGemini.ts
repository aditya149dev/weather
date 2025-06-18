import { useState, useCallback } from "react";
import { GoogleGenAI, type Part } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const useGemini = () => {
  const [geminiResponse, setGeminiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const performGeneration = useCallback(
    async (generationTask: () => Promise<Part[]>) => {
      setIsLoading(true);
      setError(null);
      setGeminiResponse(null);

      if (!API_KEY) {
        setError("Gemini API Key is not set.");
        setIsLoading(false);
        return;
      }

      try {
        const contents = await generationTask();

        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents,
        });
        const textResponse = result.text || null;
        setGeminiResponse(textResponse);
      } catch (err) {
        console.error("Error during generation:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const generateContent = useCallback(
    (text: string) => {
      const task = async (): Promise<Part[]> => [{ text }];
      return performGeneration(task);
    },
    [performGeneration]
  );

  return {
    geminiResponse,
    isLoading,
    error,
    generateContent,
  };
};
