import React from "react";
import DesignThankyou from "./DesignThankyou";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function page() {
  return (
    <section>
      <MaxWidthWrapper>
        <DesignThankyou />
      </MaxWidthWrapper>
    </section>
  );
}
