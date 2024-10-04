"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown } from "lucide-react";

import ButtonComponent from "./ButtonComponent";
import { cn } from "../lib/utils";
// import useComponentVisible from "./useComponentVisible";
import detectClickOutside from "./detectClickOutside";

export default function UserAccountNav({ username }) {
  const [activeDropdown, setDropdown] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  // const { ref, isComponentVisible } = useComponentVisible(true);
  const ref = useRef();

  // detectClickOutside(ref, dropOpen, setDropOpen);

  // useEffect(() => {
  //   document.addEventListener("mousedown", () => {
  //     console.log("clicked");
  //   });
  // }, []);

  // console.log(isComponentVisible);
  return (
    <>
      <div className="relative cursor-pointer">
        <div
          className="border-r-2 border-zinc-200 pr-4 flex items-center"
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
            "absolute top-[28px] w-full left-0 bg-white rounded shadow py-0 px-3 border-[#aedbb6] border opacity-0 transition pointer-events-none",
            {
              "opacity-1 pointer-events-auto": activeDropdown,
            }
          )}
        >
          <ButtonComponent
            //  link="/auth/register"
            transparent
            onClick={() => {
              signOut({ callbackUrl: "/", redirect: true });
            }}
            cls="text-xsm  px-0 font-recursive-button font-medium text-zinc-500 hover:bg-accent text-foreground/80"
          >
            Sign Out
          </ButtonComponent>
        </div>
      </div>
    </>
  );
}
