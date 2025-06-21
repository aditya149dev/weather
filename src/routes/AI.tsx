import { useState } from "react";
import AIChat from "../components/AIChat";
import PopoverUI from "../components/ui/PopoverUI";
import AISummary from "../components/AISummary";
import { useGemini } from "../hooks/useGemini";
import { useWeatherQuery } from "../services/weatherApi";
import { useAppSelector } from "../redux/hooks";
import { selectLocationQuery } from "../features/location/locationSlice";

const AI = () => {
  const [chatInputText, setChatInputText] = useState<string>("");

  const locationQuery = useAppSelector(selectLocationQuery);
  const { data } = useWeatherQuery(locationQuery || "fetch:ip");
  console.log("Weather Data in /ai:", data);

  const {
    geminiResponse: chatGeminiResponse,
    isLoading: isChatLoading,
    error: chatError,
    generateContent: generateChatContent,
  } = useGemini();

  const {
    geminiResponse: summaryGeminiResponse,
    isLoading: isSummaryLoading,
    error: summaryError,
    generateSummaryFromFile,
  } = useGemini();

  const handleChatGenerate = () => {
    generateChatContent(chatInputText);
  };

  const handleSummaryGenerate = (file: File) => {
    generateSummaryFromFile(file);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <div className="flex gap-8">
        <PopoverUI triggerText="AI Chat">
          <AIChat
            inputText={chatInputText}
            setInputText={setChatInputText}
            geminiResponse={chatGeminiResponse}
            isLoading={isChatLoading}
            error={chatError}
            onGenerateContent={handleChatGenerate}
          />
        </PopoverUI>
        <PopoverUI triggerText="AI Summary">
          <AISummary
            geminiResponse={summaryGeminiResponse}
            isLoading={isSummaryLoading}
            error={summaryError}
            onGenerateSummary={handleSummaryGenerate}
          />
        </PopoverUI>
      </div>
    </div>
  );
};

export default AI;
