"use client";

import React, { useState, useRef } from "react";
import { signOut } from "next-auth/react";
import { ChevronDown } from "lucide-react";

import ButtonComponent from "./ButtonComponent";
import { cn } from "../lib/utils";

export default function UserAccountNav({ username, isAdmin }) {
  const [activeDropdown, setDropdown] = useState(false);

  const ref = useRef();

  return (
    <>
      <div className=" flex items-center">
        <div className="relative cursor-pointer">
          <div
            className="border-r-2 border-zinc-200 pr-4 flex items-center xsmmx:border-none"
            onClick={() => setDropdown((prev) => !prev)}
          >
            <span className="opacity-80 font-recursive text-sm">
              {username ? username.split(" ")[0] : ""}
            </span>
            <ChevronDown
              className={cn(
                "text-zinc-500 h-4 w-4 ml-1.5 font-semibold transition",
                {
                  "rotate-180": activeDropdown,
                }
              )}
            />
          </div>
          <div
            ref={ref}
            className={cn(
              "absolute top-[30px] w-full left-0 bg-white rounded shadow py-0 px-3 border-[#aedbb6] border opacity-0 transition pointer-events-none xsmmx:-left-[23px] xsmmx:min-w-fit xsmmx:right-0",
              {
                "opacity-1 pointer-events-auto": activeDropdown,
              }
            )}
          >
            <ButtonComponent
              transparent
              onClick={() => {
                signOut();
              }}
              cls="text-xs px-0 font-recursive-button font-medium text-zinc-500 hover:bg-accent text-foreground/80"
            >
              Sign Out
            </ButtonComponent>
            {isAdmin && (
              <div className="hidden xsmmx:block">
                <ButtonComponent
                  transparent
                  link="/dashboard"
                  cls="hover:bg-accent text-foreground/80 h-fit text-xs px-0 font-recursive-button font-medium text-zinc-500 pb-2 mt-3"
                >
                  Dashboard
                </ButtonComponent>
              </div>
            )}
          </div>
        </div>

        {isAdmin && (
          <div className="xsmmx:hidden">
            <ButtonComponent
              transparent
              link="/dashboard"
              cls="font-medium text-zinc-500 hover:bg-accent text-foreground/80 h-fit"
            >
              Dashboard
            </ButtonComponent>
          </div>
        )}
      </div>
    </>
  );
}
