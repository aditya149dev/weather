import React, { useState } from "react";
import { Popover } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";

interface PopoverUIProps {
  children: React.ReactNode;
  triggerText: string;
}

const PopoverUI = ({ children, triggerText }: PopoverUIProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none text-white text-sm font-bold min-w-[3rem] flex items-center justify-center shadow-none cursor-pointer"
          aria-label="Settings"
        >
          <span>{triggerText}</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-[calc(100vw-2rem)] max-w-2xl rounded bg-gray-800 pt-8 px-4 pb-4 shadow-lg will-change-[transform,opacity] focus:outline-none mx-4 max-h-[80vh] flex flex-col"
          sideOffset={5}
        >
          {children}
          <Popover.Close
            className="absolute right-[2px] top-[2px] inline-flex size-[25px] cursor-default items-center justify-center rounded-full text-gray-400 outline-none hover:bg-gray-700 cursor-pointer"
            aria-label="Close"
          >
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="fill-gray-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverUI;
