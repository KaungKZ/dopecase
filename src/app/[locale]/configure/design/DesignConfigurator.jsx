"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  AspectRatio,
  Radio,
  Group,
  Stack,
  Text,
  Select,
  ScrollArea,
} from "@mantine/core";
import { Rnd } from "react-rnd";
import NextImage from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "../../../../lib/utils.js";
import DndHandler from "../../../../components/DndHandler.jsx";
// import useMutation from "@tanstack/react-query";
import ButtonComponent from "@/components/ButtonComponent.jsx";
import { Formik } from "formik";
import * as Yup from "yup";
// import { useUploadThing } from "../../../../lib/uploadthing.ts";
import { useUploadThing } from "@/lib/uploadthing.ts";
import saveConfig from "./actions.js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  materials,
  finishes,
  availableDevices,
  colors,
  currency,
} from "../../../../lib/config/products.js";

export default function DesignConfigurator(props) {
  // const [value, setValue] = useState(null);
  const { imageUrl, width, height, configId } = props;
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    model: availableDevices[0],
    material: {
      name: materials[0].value,
      price: materials[0].price,
    },
    finish: {
      name: finishes[0].value,
      price: finishes[0].price,
    },
    color: colors[0].name,
    // totalPrice: 0,
  });
  const containerRef = useRef(null);
  const caseRef = useRef(null);

  const { startUpload } = useUploadThing("imageUploader");
  const [renderedDimensions, setRenderedDimensions] = useState({
    width: width / 4,
    height: height / 4,
  });

  const [renderedPositions, setRenderedPositions] = useState({
    x: 150,
    y: 205,
  });
  const totalPrice = useMemo(() => {
    const basicFee = 5;

    const calculateTotalPrice = parseFloat(
      basicFee +
        parseFloat(formValues.material.price) +
        parseFloat(formValues.finish.price)
    ).toFixed(2);
    return calculateTotalPrice;
  }, [formValues.material, formValues.finish]);
  const selectedColorCode =
    colors.find((c) => c.name === formValues.color).code || "#181818";

  function base64toblob(base64, mime) {
    const byteChars = atob(base64);
    const byteNumbers = new Array(byteChars.length);

    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: mime });
  }

  async function saveImageConfiguration() {
    // console.log(values);

    try {
      const {
        top: caseTop,
        left: caseLeft,
        width,
        height,
      } = caseRef.current?.getBoundingClientRect();

      const { top: containerTop, left: containerLeft } =
        containerRef.current?.getBoundingClientRect();

      // get left and top offsets of template phone case (measured from aspect ratio corners)
      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      // substract those offsets from x and y cropped image (measured from aspect ratio corners)

      const actualX = renderedPositions.x - leftOffset;
      const actualY = renderedPositions.y - topOffset;

      // and get the actual x and y offsets of cropped image (measured from phone case)

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      console.log(
        userImage,
        actualX,
        actualY,
        renderedDimensions.width,
        renderedDimensions.height
      );

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimensions.width,
        renderedDimensions.height
      );

      const base64 = canvas.toDataURL();
      const base64data = base64.split(",")[1];

      console.log(base64);

      const blob = base64toblob(base64data, "image/png");

      const file = new File([blob], "croppedImage.png", { type: "image/png" });

      startUpload([file], { configId });
    } catch (err) {
      console.log(err);
    }
  }

  const { mutate: saveConfigMutation, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args) => {
      await Promise.all([saveImageConfiguration(), saveConfig(args)]);
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  // console.log(colors.filter((c) => c.name === formValues.color));

  const circles = (arr) => {
    return arr.map((item) => (
      <Radio.Card
        className={cn("w-8 h-8 rounded-full", {
          "bg-[#181818]": item.name === "black",
          "bg-[#172554]": item.name === "blue",
          "bg-[#4C0519]": item.name === "rose",
        })}
        radius={50}
        value={item.name}
        key={item.name}
      >
        <Group>
          {/* <Radio.Indicator /> */}
          {/* <div className={cn("w-6 h-6 rounded-full", `bg-${item}`)}></div> */}
        </Group>
      </Radio.Card>
    ));
  };

  const cards = (arr) => {
    return arr.map((item) => (
      <Radio.Card
        // className={classes.root}
        radius="md"
        value={item.value}
        key={item.value}
      >
        <Group wrap="nowrap" align="flex-start">
          {/* <Radio.Indicator /> */}
          <div className="flex justify-between items-start w-full py-4 px-5">
            <div className="flex flex-col">
              <span className="font-recursive text-sm font-semibold">
                {item.name}
              </span>
              <span className="text-sm text-zinc-500">{item.description}</span>
            </div>
            <div>
              <span className="font-medium">
                {currency}
                {item.price}
              </span>
            </div>
          </div>
        </Group>
      </Radio.Card>
    ));
  };

  return (
    <div className="my-24">
      <div className="grid grid-cols-3">
        <div
          ref={containerRef}
          className="col-span-2 relative rounded-[32px] w-full bg-[#EAECF0] h-[37.5rem] max-w-4xl border-2 border-dashed border-gray-300 overflow-hidden p-12 flex items-center justify-center"
        >
          <div className="aspect-[896/1831] pointer-events-none w-60 relative">
            <AspectRatio
              ratio={896 / 1831}
              className="aspect-[896/1831] w-full relative z-30 pointer-events-none"
              ref={caseRef}
            >
              {/* <img
                src="/phone-template.png"
                alt="phone template"
                className="pointer-events-none select-none w-full h-full"
              /> */}
              <NextImage
                src="/phone-template.png"
                alt="phone template"
                // width={240}
                // height={120}
                fill
                className="pointer-events-none select-none"
              />
            </AspectRatio>
            <div className="absolute z-40 inset-0 left-[3px] top-px right-[2px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
            <div
              className={cn(
                "absolute inset-0 left-[3px] top-px right-[2px] bottom-px rounded-[32px]",
                `bg-[${selectedColorCode}]`
              )}
            />
          </div>
          <Rnd
            default={{
              x: 150,
              y: 205,
              width: width / 4,
              height: height / 4,
            }}
            onResizeStop={(_, __, ref, ____, { x, y }) => {
              setRenderedDimensions({
                width: parseInt(ref.style.width.slice(0, -2)),
                height: parseInt(ref.style.height.slice(0, -2)),
              });

              setRenderedPositions({
                x,
                y,
              });
            }}
            onDragStop={(_, data) => {
              const { x, y } = data;
              setRenderedPositions({
                x,
                y,
              });
            }}
            lockAspectRatio
            className="border-[1px] border-primary absolute z-20"
            resizeHandleStyles={{
              topLeft: { zIndex: 1 },
              topRight: { zIndex: 1 },
            }}
            resizeHandleComponent={{
              bottomRight: <DndHandler />,
              bottomLeft: <DndHandler />,
              topRight: <DndHandler />,
              topLeft: <DndHandler />,
            }}
          >
            <div className="relative w-full h-full">
              <NextImage
                src={imageUrl}
                alt="your image"
                fill
                className="pointer-events-none"
              />
              {/* <img
                src={imageUrl}
                alt="your image"
                className="pointer-events-none w-full h-full"
              /> */}
            </div>
          </Rnd>
        </div>
        <div className="col-span-1">
          <Formik
            initialValues={{
              model: formValues.model,
              material: formValues.material,
              finish: formValues.finish,
              colors: formValues.color,
            }}
            enableReinitialize
            // validationSchema={validationSchema}
            onSubmit={(values) => {
              saveConfigMutation({
                color: values.colors,
                finish: values.finish.name,
                material: values.material.name,
                model: values.model.replace(/\s/gi, ""),
                configId,
                totalPrice: parseFloat(totalPrice),
              });
            }}
          >
            {(formik) => (
              <form
                onSubmit={formik.handleSubmit}
                className="h-[37.5rem] flex flex-col"
              >
                <ScrollArea className="px-8 relative flex-1 h-full">
                  <div
                    aria-hidden="true"
                    className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
                  ></div>
                  <div className="overflow-auto flex flex-col space-y-6 pb-12 pt-6">
                    <h2 className="text-3xl font-bold">Customize your case</h2>
                    <div className="w-full h-px bg-zinc-200 my-6"></div>
                    <div>
                      <label
                        htmlFor="color"
                        className="input-label !text-sm font-recursive"
                      >
                        Background Case Color:{" "}
                        {formValues.color.charAt(0).toUpperCase() +
                          formValues.color.slice(1)}
                      </label>
                      <Radio.Group
                        id="color"
                        className="design-radio-group"
                        defaultValue={formValues.color}
                        value={formValues.color}
                        onChange={(value) =>
                          setFormValues((prev) => {
                            return {
                              ...prev,
                              color: value,
                            };
                          })
                        }
                      >
                        <Stack gap="xs" className="flex flex-row">
                          {circles(colors)}
                        </Stack>
                      </Radio.Group>
                    </div>
                    <div className="">
                      <label
                        htmlFor="model"
                        className="input-label !text-sm font-recursive"
                      >
                        Model
                      </label>

                      <Select
                        id="model"
                        withCheckIcon={false}
                        className=""
                        defaultValue={formik.initialValues.model}
                        value={formValues.model || formik.initialValues.model}
                        onChange={(_value, option) => {
                          setFormValues((prev) => {
                            return {
                              ...prev,
                              model: _value,
                            };
                          });
                        }}
                        data={availableDevices}
                        // {...formik.getFieldProps("model")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="material"
                        className="input-label !text-sm font-recursive"
                      >
                        Material
                      </label>
                      <Radio.Group
                        id="material"
                        className="design-radio-group"
                        defaultValue={formValues.material.name}
                        value={formValues.material.name}
                        onChange={(value) =>
                          setFormValues((prev) => {
                            return {
                              ...prev,
                              material: {
                                name: value,
                                price: materials.find((m) => m.value === value)
                                  .price, // not the best practice
                              },
                            };
                          })
                        }
                      >
                        <Stack gap="xs">{cards(materials)}</Stack>
                      </Radio.Group>
                    </div>
                    <div>
                      <label
                        htmlFor="finish"
                        className="input-label !text-sm font-recursive"
                      >
                        Finish
                      </label>
                      <Radio.Group
                        id="finish"
                        defaultValue={formValues.finish.name}
                        className="design-radio-group"
                        value={formValues.finish.name}
                        onChange={(value) =>
                          setFormValues((prev) => {
                            return {
                              ...prev,
                              finish: {
                                name: value,
                                price: finishes.find((m) => m.value === value)
                                  .price, // not the best practice
                              },
                            };
                          })
                        }
                      >
                        <Stack gap="xs">{cards(finishes)}</Stack>
                      </Radio.Group>
                    </div>
                  </div>
                </ScrollArea>

                {/* <ConnectedFocusError /> */}
                <div className="px-8 w-full">
                  <div className="">
                    <div className="w-full h-px bg-zinc-200 mb-4"></div>
                  </div>
                  <div className="flex justify-between space-x-6 items-center">
                    <span className="font-semibold font-recursive">
                      {currency}
                      {totalPrice}
                    </span>
                    <ButtonComponent
                      type="submit"
                      cls="min-w-[200px] min-h-11 text-sm"
                      isLoading={isPending}
                      // isDisabled={isPending}
                    >
                      Continue
                      <ArrowRight className="text-white h-5 w-5 ml-1.5" />
                    </ButtonComponent>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
