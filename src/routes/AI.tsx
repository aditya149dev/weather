import { useEffect, useState } from "react";
import AIChat from "../components/AIChat";
import PopoverUI from "../components/ui/PopoverUI";
import AISummary from "../components/AISummary";
import { useGemini } from "../hooks/useGemini";
import { useWeatherQuery } from "../services/weatherApi";
import { useAppSelector } from "../redux/hooks";
import { selectLocationQuery } from "../features/location/locationSlice";

const AI = () => {
  const locationQuery = useAppSelector(selectLocationQuery);
  const { data } = useWeatherQuery(locationQuery || "fetch:ip");

  //state of child AIChat and AISummary
  const [chatInputText, setChatInputText] = useState<string>("");
  const [summarySelectedFile, setSummarySelectedFile] = useState<File | null>(
    null
  );

  useEffect(() => {
    console.log("Weather Data in /ai:", data);
  }, [data]);

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
            isLoading={isChatLoading}
            error={chatError}
            onGenerateContent={handleChatGenerate}
            inputText={chatInputText}
            onInputChange={(text: string) => setChatInputText(text)}
          />
        </PopoverUI>
        <PopoverUI triggerText="AI Summary">
          <AISummary
            geminiResponse={summaryGeminiResponse}
            isLoading={isSummaryLoading}
            error={summaryError}
            onGenerateSummary={handleSummaryGenerate}
            selectedFile={summarySelectedFile}
            onFileSelect={(file: File | null) => setSummarySelectedFile(file)}
          />
        </PopoverUI>
      </div>
    </div>
  );
};

export default AI;
