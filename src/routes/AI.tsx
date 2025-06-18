import { useState } from "react";
import { useGemini } from "../hooks/useGemini";
import AIChat from "../components/AIChat";
import PopoverUI from "../components/ui/PopoverUI";
import AISummary from "../components/AISummary";

const AI = () => {
  const [chatInputText, setChatInputText] = useState<string>("");

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
