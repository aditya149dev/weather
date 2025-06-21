import { useEffect } from "react";
import AIChat from "../components/AIChat";
import PopoverUI from "../components/ui/PopoverUI";
import AISummary from "../components/AISummary";
import { useGemini } from "../hooks/useGemini";
import { useWeatherQuery } from "../services/weatherApi";
import { useAppSelector } from "../redux/hooks";
import { selectLocationQuery } from "../features/input/inputSlice";
import {
  selectGeminiChatResponse,
  selectGeminiSummaryResponse,
  selectIsGeminiLoading,
  selectGeminiError,
} from "../features/gemini/geminiSlice";

const AI = () => {
  const locationQuery = useAppSelector(selectLocationQuery);
  const { data } = useWeatherQuery(locationQuery || "fetch:ip");

  useEffect(() => {
    console.log("Weather Data in /ai:", data);
  }, [data]);

  const chatGeminiResponse = useAppSelector(selectGeminiChatResponse);
  const summaryGeminiResponse = useAppSelector(selectGeminiSummaryResponse);
  const isLoading = useAppSelector(selectIsGeminiLoading);
  const error = useAppSelector(selectGeminiError);

  const { generateContent: generateChatContent } = useGemini();
  const { generateSummaryFromFile } = useGemini();

  const handleChatGenerate = (text: string) => {
    generateChatContent(text);
  };

  const handleSummaryGenerate = (file: File) => {
    generateSummaryFromFile(file);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <div className="flex gap-8">
        <PopoverUI triggerText="AI Chat">
          <AIChat
            geminiResponse={chatGeminiResponse}
            isLoading={isLoading}
            error={error}
            onGenerateContent={handleChatGenerate}
          />
        </PopoverUI>
        <PopoverUI triggerText="AI Summary">
          <AISummary
            geminiResponse={summaryGeminiResponse}
            isLoading={isLoading}
            error={error}
            onGenerateSummary={handleSummaryGenerate}
          />
        </PopoverUI>
      </div>
    </div>
  );
};

export default AI;
