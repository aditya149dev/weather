import React from "react";
import { FormUI } from "./ui/FormUI";
import AIResponseDisplay from "./AIResponseDisplay";
import UpArrowIcon from "../assets/upArrow.svg";

interface AskAIProps {
  inputText: string;
  setInputText: (text: string) => void;
  geminiResponse: string | null;
  isLoading: boolean;
  error: string | null;
  onGenerateContent: (text: string) => void;
}

const AIChat = ({
  inputText,
  setInputText,
  geminiResponse,
  isLoading,
  error,
  onGenerateContent,
}: AskAIProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onGenerateContent(inputText);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2.5 overflow-y-auto pr-2 scrollbar-hide">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full bg-gray-700 border border-gray-600 rounded-md p-2"
        >
          <FormUI
            value={inputText}
            onChange={setInputText}
            onSearch={onGenerateContent}
            placeholder="Ask anything..."
            isExpandable={true}
            className="bg-transparent border-none focus:outline-none w-full text-white placeholder-gray-400 resize-none scrollbar-hide"
          />
          <div className="flex items-center w-full justify-between">
            <p
              className={`text-gray-400 text-sm ${
                !isLoading ? "invisible" : ""
              }`}
            >
              Generating...
            </p>
            <button
              type="submit"
              className="size-7 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-200 cursor-pointer"
              disabled={isLoading}
            >
              <img
                src={UpArrowIcon}
                alt="Generate Response"
                className="w-4 h-4 filter invert(100%)"
              />
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {geminiResponse && (
          <AIResponseDisplay geminiResponse={geminiResponse} />
        )}
      </div>
    </>
  );
};

export default AIChat;
