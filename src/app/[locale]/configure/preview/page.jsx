import React from "react";
import { db } from "../../../../db";
import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";
import DesignPreview from "./DesignPreview";
import Steps from "../../../../components/Steps";
import { notFound } from "next/navigation";

export default async function page(props) {
  const { id } = props.searchParams;
  // const router = useRouter();

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.imageConfiguration.findUnique({
    where: { id },
  });

  if (!configuration) {
    console.log("no config");
    return notFound();
  }

  // const { croppedImageUrl, width, height, color, model, material, finish } =
  //   configuration;

  // console.log(configuration);

  //   console.log(props);
  return (
    <section>
      <MaxWidthWrapper>
        <div className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] ">
          <Steps currentStep={2} />
          <DesignPreview configuration={configuration} />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
