import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CopyIcon from "../assets/copy.svg";

interface AIResponseDisplayProps {
  geminiResponse: string | null;
}

const AIResponseDisplay: React.FC<AIResponseDisplayProps> = ({
  geminiResponse,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (responseRef.current) {
      navigator.clipboard.writeText(responseRef.current.innerText);
    }
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  if (!geminiResponse) {
    return null;
  }

  return (
    <div className="p-2 rounded-md w-full flex-grow bg-gray-800">
      <div className="prose prose-invert w-full overflow-y-auto">
        <div className="not-prose float-right pl-2 pb-1">
          <button
            type="button"
            onClick={handleCopy}
            className={`bg-gray-700 rounded-md hover:bg-gray-600 w-7 h-7 flex items-center justify-center cursor-pointer ${
              isAnimating ? "button-pop" : ""
            }`}
          >
            <img src={CopyIcon} alt="Copy" className="w-6 h-6" />
          </button>
        </div>
        <div ref={responseRef}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {geminiResponse}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default AIResponseDisplay;
