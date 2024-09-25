"use client";

import React from "react";
import { AspectRatio } from "@mantine/core";
import { Rnd } from "react-rnd";
import Image from "next/image";
import { cn } from "../lib/utils";

export default function DesignConfigurator(props) {
  const { imageUrl, width, height } = props;
  return (
    <div className="my-24">
      <div className="flex">
        <div className="relative rounded-[32px] w-full bg-[#EAECF0] h-[37.5rem] max-w-4xl border-2 border-dashed border-gray-300 overflow-hidden p-12 flex items-center justify-center">
          <div className="aspect-[896/1831] pointer-events-none w-60 relative">
            <AspectRatio
              ratio={896 / 1831}
              className="aspect-[896/1831] w-full relative z-10 pointer-events-none"
            >
              <Image
                src="/phone-template.png"
                alt="phone template"
                // width={240}
                // height={120}
                fill
                className="pointer-events-none select-none"
              />
            </AspectRatio>
            <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
            <div
              className={cn(
                "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] bg-rose-950",
                {}
              )}
            />
          </div>
          <Rnd
            default={{
              x: 150,
              y: 205,
              width: width / 4,
              height: height / 4,
            }}
            lockAspectRatio
            resizeHandleComponent={{}}
          >
            <div className="relative w-full h-full">
              <Image
                src={imageUrl}
                alt="your image"
                fill
                className="pointer-events-none"
              />
            </div>
          </Rnd>
        </div>
      </div>
    </div>
  );
}
