import React from "react";
import { cn } from "../lib/utils";
import Image from "next/image";

export default function Steps({ currentStep }) {
  return (
    <div className="w-full bg-white border-gray-200 border-l border-r flex">
      <div
        className={cn(
          "flex-1 py-4 px-6 before:content-[''] before:absolute before:bg-white before:-right-[11px] before:top-1/2 before:-translate-y-1/2 before:w-[20px] before:h-[20px] before:border-gray-200 before:border-r-2 before:border-t-2 before:rotate-45 after:content-[''] after:w-full after:absolute after:h-[5px] after:bottom-0 after:left-0 relative border-gray-200 border-r-2",
          {
            "after:bg-primary": currentStep === 0,
            "after:bg-zinc-700": currentStep > 0,
          }
        )}
      >
        <div className="flex items-center justify-center">
          <div className="w-[70px] h-[75px] relative mr-4">
            <Image src="/snake-1.png" fill sizes="100%" alt="step-1" />
          </div>
          <div className="flex flex-col">
            <span
              className={cn("font-semibold font-recursive text-zinc-700", {
                "text-primary": currentStep === 0,
              })}
            >
              Step 1: Upload Image
            </span>
            <span className="text-sm text-zinc-500">
              Upload an image to get started.
            </span>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "flex-1 py-4 px-6 before:content-[''] before:absolute before:bg-white before:-right-[11px] before:top-1/2 before:-translate-y-1/2 before:w-[20px] before:h-[20px] before:border-gray-200 before:border-r-2 before:border-t-2 before:rotate-45 after:content-[''] after:w-full after:absolute after:h-[5px] after:bottom-0 after:left-0  relative border-gray-200 border-r-2",

          {
            "after:bg-primary": currentStep === 1,
            "after:bg-zinc-700": currentStep > 1,
          }
        )}
      >
        <div className="flex items-center justify-center">
          <div className="w-[70px] h-[75px] relative mr-4">
            <Image src="/snake-2.png" fill sizes="100%" alt="step-1" />
          </div>
          <div className="flex flex-col">
            <span
              className={cn("font-semibold font-recursive text-zinc-700", {
                "text-primary": currentStep === 1,
              })}
            >
              Step 2: Customize design
            </span>
            <span className="text-sm text-zinc-500">Make the case yours</span>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "flex-1 py-4 px-6 after:content-[''] after:w-full after:absolute after:h-[5px] after:bottom-0 after:left-0 after:bg-zinc-400 relative border-gray-200 border-r",

          {
            "after:bg-primary": currentStep === 2,
          }
        )}
      >
        <div className="flex items-center justify-center">
          <div className="w-[70px] h-[75px] relative mr-4">
            <Image src="/snake-3.png" fill sizes="100%" alt="step-1" />
          </div>
          <div className="flex flex-col">
            <span
              className={cn("font-semibold font-recursive text-zinc-700", {
                "text-primary": currentStep === 2,
              })}
            >
              Step 3: Summary
            </span>
            <span className="text-sm text-zinc-500">Review your final art</span>
          </div>
        </div>
      </div>
    </div>
  );
}
