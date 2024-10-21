import React from "react";
import { db } from "../../../../db";
import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";
import DesignPreview from "./DesignPreview";
import Steps from "../../../../components/Steps";
import { notFound } from "next/navigation";

export default async function Page(props) {
  const { id } = props.searchParams;

  const { locale } = props.params;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.imageConfiguration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  return (
    <section>
      <MaxWidthWrapper>
        <div className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] ">
          <Steps currentStep={2} />
          <DesignPreview configuration={configuration} locale={locale} />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
