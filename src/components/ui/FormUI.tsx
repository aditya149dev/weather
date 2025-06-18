import React, { useRef, useLayoutEffect } from "react";

interface FormUIProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  rows?: number;
  isExpandable?: boolean;
  className?: string;
}

const NormalSearchBar = ({
  value,
  onChange,
  placeholder,
  handleSubmit,
  className,
}: Omit<FormUIProps, "onSearch" | "rows" | "isExpandable"> & {
  handleSubmit: (e: React.FormEvent) => void;
}) => {
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className={`${
          className ||
          "w-full py-1 px-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
        }`}
      />
    </form>
  );
};

const ExpandingSearchBar = ({
  value,
  onChange,
  placeholder,
  rows,
  handleSubmit,
  className,
}: Omit<FormUIProps, "onSearch" | "isExpandable"> & {
  handleSubmit: (e: React.FormEvent) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";

      const computedStyle = window.getComputedStyle(textarea);
      const lineHeight = parseFloat(computedStyle.lineHeight);

      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);

      const maxLines = 6;
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
    }
  }, [value]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent<HTMLTextAreaElement>);
          }
        }}
        rows={rows || 2}
        placeholder={placeholder || "Search..."}
        className={`${
          className ||
          "w-full py-1 px-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 resize-none focus:outline-none scrollbar-hide"
        }`}
        style={{
          lineHeight: "1.5rem",
        }}
      />
    </form>
  );
};

const FormUI = (props: FormUIProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSearch(props.value);
  };

  if (props.isExpandable === false) {
    return <NormalSearchBar {...props} handleSubmit={handleSubmit} />;
  } else {
    return <ExpandingSearchBar {...props} handleSubmit={handleSubmit} />;
  }
};

export { FormUI };
