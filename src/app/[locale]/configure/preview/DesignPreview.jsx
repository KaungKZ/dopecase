"use client";

import React, { useState } from "react";
import {
  matchingModelsValue,
  colors,
  prices,
  currency,
} from "../../../../config/products.js";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import ButtonComponent from "@/components/ButtonComponent.jsx";
import { cn } from "@/lib/utils.js";
import { useSession } from "next-auth/react";
import { authOption } from "../../api/auth/[...nextauth]/route";
import { useMutation } from "@tanstack/react-query";
import handleCheckout from "./actions.js";

export default function DesignPreview(props) {
  const {
    croppedImageUrl,
    width,
    height,
    id,
    color,
    model,
    material,
    finish,
    totalPrice,
  } = props.configuration;
  const data = useSession(authOption);

  const selectedColorCode =
    colors.find((c) => c.name === color).code || "#181818";

  const { mutate: handleConfigMutation, isPending } = useMutation({
    mutationKey: ["handle-checkout"],
    mutationFn: handleCheckout,
    onError: (err) => {
      console.log(err);
    },
    // onSuccess: () => {
    //   router.push(`/en`);
    // },
  });

  function handleClickCheckout() {
    console.log(data);
    if (data.data) {
      handleConfigMutation({ configId: id });
    } else {
      console.log("show singin modal");
      // show sign in modal
    }
  }

  return (
    <>
      <div className="my-24">
        <div>
          <h2>You are only 1 step away !</h2>
        </div>
        <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
            {/* <div className="relative max-w-[245px] h-[500px] overflow-hidden">
              <Image
                src="/phone-template.png"
                alt="phone template"
                fill
                className="pointer-events-none select-none z-30 "
              />
              <div
                className={cn(
                  "absolute inset-0 left-[3px] top-px right-[2px] bottom-px rounded-[32px]",
                  `bg-[${selectedColorCode}]`
                )}
              />
              <div className="absolute -z-10 inset-0">
                <Image
                  src={croppedImageUrl}
                  alt="phone preview"
                  fill
                  className="pointer-events-none select-none"
                />
              </div>
            </div> */}

            <div
              className={`relative pointer-events-none z-50 overflow-hidden ${`bg-[${selectedColorCode}]`} max-w-[245px] h-[500px]`}
            >
              <Image
                src="/phone-template-white-edges.png"
                className="pointer-events-none z-50 select-none"
                fill
                alt="phone image"
              />
              {/* <div
                className={cn(
                  "absolute inset-0 left-[3px] top-px right-[2px] bottom-px rounded-[32px]",
                  `bg-[${selectedColorCode}]`
                )}
              /> */}
              <div className="absolute -z-10 inset-0">
                <Image
                  className="object-cover pointer-events-none min-w-full min-h-full"
                  src={croppedImageUrl}
                  fill
                  alt="overlaying phone image"
                />
              </div>
            </div>
          </div>
          <div className=" sm:col-span-9 md:row-end-1">
            <h2 className="font-recursive text-3xl font-bold">
              Your {matchingModelsValue[model]} Case
            </h2>
            <div className="flex space-x-2 items-center mt-3">
              <Check className="text-primary h-5 w-5" />
              <span className="font-recursive text-base">
                In stock and ready to ship
              </span>
            </div>
            <div className="mt-10">
              <div className="flex justify-between">
                <div>
                  <span className="font-recursive font-bold text-base">
                    Highlights
                  </span>
                  <ol className="mt-3 text-zinc-700 list-disc list-inside text-base">
                    <li>Wireless charging compatible</li>
                    <li className="mt-1">TPU shock absorption</li>
                    <li className="mt-1">
                      Packaging made from recycled materials
                    </li>
                    <li className="mt-1">5 year print warranty</li>
                  </ol>
                </div>
                <div>
                  <span className="font-recursive font-bold text-base">
                    Materials
                  </span>
                  <ol className="mt-3 text-zinc-700 list-disc list-inside text-base">
                    <li>High-quality, durable material</li>
                    <li className="mt-1">
                      Scratch- and fingerprint resistant coating
                    </li>
                  </ol>
                </div>
              </div>
              <div className="w-full h-px bg-zinc-200 my-10"></div>
              <div className="px-7 flex flex-col space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-700 font-recursive">
                    Base price
                  </span>
                  <span className="font-semibold font-recursive text-base">
                    {currency}
                    {parseFloat(prices.base_price).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-700 font-recursive">
                    {finish === "smooth" ? "Smooth Finish" : "Textured Finish"}
                  </span>
                  <span className="font-semibold font-recursive text-base">
                    {currency}
                    {parseFloat(
                      finish === "smooth" ? prices.smooth : prices.textured
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-700 font-recursive">
                    {material === "silicone"
                      ? "Silicone"
                      : "Soft Polycarbonate"}
                  </span>
                  <span className="font-semibold font-recursive text-base">
                    {currency}
                    {parseFloat(
                      material === "silicone"
                        ? prices.silicone
                        : prices.polycarbonate
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="w-full h-px bg-zinc-200 my-4"></div>
                <div className="flex justify-between">
                  <span className="text-zinc-700 font-recursive font-semibold">
                    Order Total
                  </span>
                  <span className="font-semibold font-recursive text-base">
                    {currency}
                    {parseFloat(totalPrice).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-end mt-10">
                <ButtonComponent
                  cls="px-10"
                  color="primary"
                  // link="/en/configure/upload"
                  onClick={() => handleClickCheckout()}
                >
                  Check Out
                  <ArrowRight className="text-white h-5 w-5 ml-1.5" />
                </ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
