import React from "react";
import { db } from "../../../../db";
import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";
import DesignConfigurator from "../../../../components/DesignConfigurator";
import Steps from "../../../../components/Steps";
import { notFound } from "next/navigation";

export default async function page(props) {
  const { id } = props.searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.imageConfiguration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, width, height } = configuration;

  // console.log(configuration);

  //   console.log(props);
  return (
    <section>
      <MaxWidthWrapper>
        <div className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] ">
          <Steps currentStep={1} />
          <DesignConfigurator
            imageUrl={imageUrl}
            width={width}
            height={height}
            configId={id}
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
