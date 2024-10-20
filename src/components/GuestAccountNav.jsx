"use client";

import React, { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { useRouter } from "next/navigation";
import { getLocale } from "next-intl/server";

export default function GuestAccountNav({ domain, locale }) {
  //   const [url, setURL] = useState("");
  //   const pathname = usePathname();
  // const router = useRouter();
  //   console.log(url);
  //   console.log(router, pathname);

  //   useEffect(() => {
  //     if (typeof window !== undefined) {
  //       setURL(window.location.href);
  //     }
  //   }, []);

  // console.log(
  //   window.location.href,
  //   process.env.NEXT_PUBLIC_SERVER_URL + locale
  // );

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
          // router.push("/auth/register");
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
          // router.push("/auth/login");
        }}
      >
        Log In
      </ButtonComponent>
    </div>
  );
}
