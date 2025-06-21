import React, { useState } from "react";
import AIResponseDisplay from "./AIResponseDisplay";
import UpArrowIcon from "../assets/upArrow.svg";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  changeSummarySelectedFile,
  selectSummarySelectedFile,
} from "../features/input/inputSlice";

interface AISummaryProps {
  geminiResponse: string | null;
  error: string | null;
  isLoading: boolean;
  onGenerateSummary: (file: File) => void;
}

const AISummary = ({
  geminiResponse,
  error,
  isLoading,
  onGenerateSummary,
}: AISummaryProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const dispatch = useAppDispatch();
  const changeSelectedFile = (file: File | null) =>
    dispatch(changeSummarySelectedFile(file));
  const selectedFile = useAppSelector(selectSummarySelectedFile);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      changeSelectedFile(e.target.files[0]);
    } else {
      changeSelectedFile(null);
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
        changeSelectedFile(droppedFile);
      } else {
        changeSelectedFile(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onGenerateSummary(selectedFile);
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
          {isLoading && selectedFile && (
            <p className="text-gray-400 text-sm">Summarizing...</p>
          )}
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
