import { useCallback } from "react";
import { GoogleGenAI, type Part } from "@google/genai";
import { useAppDispatch } from "../redux/hooks";
import {
  changeGeminiChatResponse,
  changeGeminiSummaryResponse,
  changeGeminiIsLoading,
  changeGeminiError,
} from "../features/gemini/geminiSlice";
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const useGemini = () => {
  const dispatch = useAppDispatch();

  const performGeneration = useCallback(
    async (
      generationTask: () => Promise<Part[]>,
      dispatchAction: ActionCreatorWithPayload<string | null, string>
    ) => {
      dispatch(changeGeminiIsLoading(true));
      dispatch(changeGeminiError(null));
      dispatch(dispatchAction(null));

      try {
        if (!API_KEY) {
          throw new Error("API Key is not set.");
        }
        const contents = await generationTask();

        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents,
        });
        const textResponse = result.text || null;
        dispatch(dispatchAction(textResponse));
      } catch (err) {
        console.error("Error during generation:", err);
        if (err instanceof Error) {
          dispatch(changeGeminiError(err.message));
        } else {
          dispatch(changeGeminiError("An unknown error occurred."));
        }
      } finally {
        dispatch(changeGeminiIsLoading(false));
      }
    },
    [dispatch]
  );

  const generateContent = useCallback(
    (text: string) => {
      const task = async (): Promise<Part[]> => [{ text }];
      return performGeneration(task, changeGeminiChatResponse);
    },
    [performGeneration]
  );

  const generateSummaryFromFile = useCallback(
    (file: File) => {
      const task = async (): Promise<Part[]> => {
        const fileData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () =>
            resolve((reader.result as string).split(",")[1]);
          reader.onerror = (error) => reject(error);
        });
        return [
          { text: "Summarize this document" },
          {
            inlineData: {
              mimeType: file.type,
              data: fileData,
            },
          },
        ];
      };
      return performGeneration(task, changeGeminiSummaryResponse);
    },
    [performGeneration]
  );

  return {
    generateContent,
    generateSummaryFromFile,
  };
};
