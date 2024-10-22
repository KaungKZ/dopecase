export const dynamic = "force-dynamic";

import React from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";

export default function page() {
  return (
    <section>
      <MaxWidthWrapper>
        <div className="w-full h-[calc(100vh-162px)] flex flex-col justify-center items-center">
          <h3 className="text-lg underline underline-offset-[0px] decoration-4 decoration-primary">
            404 not found
          </h3>
          <h3 className="text-sm mt-1 text-zinc-500">
            This page does not exist.
          </h3>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
