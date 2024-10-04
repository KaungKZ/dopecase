"use client";

import React, { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { useRouter } from "next/navigation";

export default function GuestAccountNav({ domain }) {
  //   const [url, setURL] = useState("");
  //   const pathname = usePathname();

  const router = useRouter();
  //   console.log(url);
  //   console.log(router, pathname);

  //   useEffect(() => {
  //     if (typeof window !== undefined) {
  //       setURL(window.location.href);
  //     }
  //   }, []);

  return (
    <div className="border-r-2 border-zinc-200 flex">
      <ButtonComponent
        //   link="/auth/register"
        transparent
        cls="text-sm font-medium hover:bg-accent text-foreground/90"
      >
        Sign Up
      </ButtonComponent>
      <ButtonComponent
        //   link="/auth/login"
        transparent
        cls="text-sm font-medium hover:bg-accent text-foreground/90"
        onClick={() => {
          console.log(domain, window.location.href);

          localStorage.setItem(
            "redirectURL",
            window.location.href.split(domain)[1]
          );
          router.push("/auth/login");
        }}
      >
        Log In
      </ButtonComponent>
    </div>
  );
}
