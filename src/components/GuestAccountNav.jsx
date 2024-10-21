"use client";

import React from "react";
import ButtonComponent from "./ButtonComponent";

export default function GuestAccountNav({ locale }) {
  return (
    <div className="border-r-2 border-zinc-200 flex mdmx:border-none">
      <ButtonComponent
        link="/auth/register"
        onClick={() => {
          if (
            window.location.href !==
            process.env.NEXT_PUBLIC_SERVER_URL + locale
          ) {
            localStorage.setItem(
              "redirectURL",
              window.location.href.split(
                process.env.NEXT_PUBLIC_SERVER_URL + locale
              )[1]
            );
          }
        }}
        transparent
        cls="text-sm font-medium hover:bg-accent text-foreground/90"
      >
        Sign Up
      </ButtonComponent>
      <ButtonComponent
        link="/auth/login"
        transparent
        cls="text-sm font-medium hover:bg-accent text-foreground/90"
        onClick={() => {
          if (
            window.location.href !==
            process.env.NEXT_PUBLIC_SERVER_URL + locale
          ) {
            localStorage.setItem(
              "redirectURL",
              window.location.href.split(
                process.env.NEXT_PUBLIC_SERVER_URL + locale
              )[1]
            );
          }
        }}
      >
        Log In
      </ButtonComponent>
    </div>
  );
}
