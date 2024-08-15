"use client";

import React from "react";
import Image from "next/image";
import SignupForm from "../../../../components/SignupForm";
import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";

export default function page() {
  return (
    <>
      <section>
        <MaxWidthWrapper>
          <div className="mt-24">
            <div className="flex w-fit items-baseline">
              <h1 className="text-5xl font-bold w-full">Register</h1>
              <Image
                src="/snake-1.png"
                width={50}
                height={50}
                className="ml-2"
              />
            </div>
            <h2 className="text-2xl mt-5">Get Started Today !</h2>
          </div>

          <div>
            <SignupForm />
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
