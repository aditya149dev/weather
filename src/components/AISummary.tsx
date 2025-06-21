import React, { useState } from "react";
import AIResponseDisplay from "./AIResponseDisplay";
import UpArrowIcon from "../assets/upArrow.svg";

interface AISummaryProps {
  geminiResponse: string | null;
  isLoading: boolean;
  error: string | null;
  onGenerateSummary: (file: File) => void;
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
}

const AISummary = ({
  geminiResponse,
  isLoading,
  error,
  onGenerateSummary,
  selectedFile,
  onFileSelect,
}: AISummaryProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    } else {
      onFileSelect(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        onFileSelect(droppedFile);
      } else {
        onFileSelect(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onGenerateSummary(selectedFile);
      onFileSelect(null);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2.5 overflow-y-auto pr-2 scrollbar-hide">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full bg-gray-700 border border-gray-600 rounded-md p-2"
        >
          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center w-full p-4 rounded-lg cursor-pointer bg-transparent border-2 border-dashed ${
              isDragging ? "border-blue-400" : "border-gray-500"
            } ${selectedFile ? "hover:bg-gray-700" : "hover:bg-gray-800"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <p className="text-sm text-gray-300">
                {selectedFile ? selectedFile.name : "Select or Drag a PDF file"}
              </p>
              {!selectedFile && (
                <p className="text-xs text-gray-500 mt-1">
                  Click to choose a file
                </p>
              )}
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </label>
          <button
            type="submit"
            className="w-full py-2 flex items-center justify-center bg-gray-300 rounded-md hover:bg-gray-200 cursor-pointer mt-2"
            disabled={isLoading || !selectedFile}
          >
            <img
              src={UpArrowIcon}
              alt="Generate Summary"
              className="w-4 h-4 filter invert(100%)"
            />
          </button>
          {isLoading && <p className="text-gray-400 text-sm">Summarizing...</p>}
        </form>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {geminiResponse && (
          <AIResponseDisplay geminiResponse={geminiResponse} />
        )}
      </div>
    </>
  );
};

export default AISummary;
