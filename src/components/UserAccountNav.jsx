"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import ButtonComponent from "./ButtonComponent";

export default function UserAccountNav({ username }) {
  return (
    <>
      <div className="border-r-2 border-zinc-200 pr-4">
        <span className="opacity-80 font-recursive text-sm">
          {username ? username.split(" ")[0] : ""}
        </span>
      </div>
      <ButtonComponent
        //  link="/auth/register"
        transparent
        onClick={() => {
          signOut({ callbackUrl: "/", redirect: true });
        }}
        cls="text-sm font-recursive-button font-medium text-zinc-500 hover:bg-accent text-foreground/80"
      >
        Sign Out
      </ButtonComponent>
    </>
  );
}
