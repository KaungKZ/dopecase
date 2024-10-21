import React from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";

export default function page() {
  return (
    <section>
      <MaxWidthWrapper>
        <div className="w-full h-[calc(100vh-162px)] flex flex-col justify-center items-center">
          <h3 className="text-lg ">404 not found</h3>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
