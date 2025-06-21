import React, { useRef, useLayoutEffect, useState } from "react";
import AIResponseDisplay from "./AIResponseDisplay";
import UpArrowIcon from "../assets/upArrow.svg";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  changeChatInputText,
  selectChatInputText,
} from "../features/gemini/geminiSlice";

interface AIChatProps {
  geminiResponse: string | null;
  isLoading: boolean;
  error: string | null;
  onGenerateContent: (text: string) => void;
}

const AIChat = ({
  geminiResponse,
  isLoading,
  error,
  onGenerateContent,
}: AIChatProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const inputText = useAppSelector(selectChatInputText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onGenerateContent(inputText);
      setIsFocused(false);
    }
  };

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";

      const computedStyle = window.getComputedStyle(textarea);
      const lineHeight = parseFloat(computedStyle.lineHeight);

      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);

      const maxLines = isFocused ? 6 : 2;
      const maxHeight = maxLines * lineHeight + paddingTop + paddingBottom;

      const scrollHeight = textarea.scrollHeight;

      if (scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = "scroll";
        textarea.scrollTop = textarea.scrollHeight;
      } else {
        textarea.style.height = `${scrollHeight}px`;
        textarea.style.overflowY = "hidden";
      }

      if (isFocused && inputText.length > 0) {
        textarea.selectionStart = inputText.length;
        textarea.selectionEnd = inputText.length;
      }
    }
  }, [inputText, isFocused]);

  return (
    <>
      <div className="flex flex-col gap-2.5 overflow-y-auto pr-2 scrollbar-hide">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full bg-gray-700 border border-gray-600 rounded-md p-2"
        >
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => dispatch(changeChatInputText(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(
                  e as unknown as React.FormEvent<HTMLTextAreaElement>
                );
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={2}
            placeholder="Ask anything..."
            className="bg-transparent border-none focus:outline-none w-full text-white placeholder-gray-400 resize-none scrollbar-hide"
            style={{
              lineHeight: "1.5rem",
            }}
          />
          <div className="flex items-center w-full justify-between">
            <p
              className={`text-gray-400 text-sm ${
                !isLoading || !inputText.trim() ? "invisible" : ""
              }`}
            >
              Generating...
            </p>
            <button
              type="submit"
              className="size-7 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-200 cursor-pointer"
              disabled={isLoading}
              onMouseDown={(e) => e.preventDefault()}
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
