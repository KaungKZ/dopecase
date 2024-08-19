"use client";

import React from "react";
// import { signIn, signOut, auth } from "../../../../../auth";
// import { AuthError } from "next-auth";
import LoginForm from "../../../../components/LoginForm";
import Image from "next/image";
import { useSession } from "next-auth/react";
import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";

export default function page() {
  const data = useSession();

  console.log(data);
  return (
    <section>
      <MaxWidthWrapper cls="max-w-[640px]">
        <div className="mt-16">
          <div className="flex w-fit items-baseline">
            <h1 className="text-5xl font-bold w-full">Welcome back</h1>
            <Image
              src="/snake-1.png"
              width={50}
              height={50}
              className="ml-2"
              alt="register-icon"
            />
          </div>
          {/* <h2 className="text-2xl mt-5">Get Started Today !</h2> */}
        </div>

        <div>
          <LoginForm />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
