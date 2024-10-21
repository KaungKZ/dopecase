"use client";

import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getPaymentStatus from "./actions";
import { Loader2 } from "lucide-react";
import { AspectRatio } from "@mantine/core";
import { cn, formatPrice } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import ButtonComponent from "@/components/ButtonComponent";

export default function DesignThankyou() {
  const searchParams = useSearchParams();

  const caseRef = useRef();
  const orderId = searchParams.get("orderID") || "";
  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 1000,
  });
  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  });

  const handleResize = () => {
    if (!caseRef.current) return;
    const { width, height } = caseRef.current.getBoundingClientRect();
    setRenderedDimensions({ width, height });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (data === undefined) {
    return (
      <div className="w-full h-[calc(100vh-162px)] flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="flex justify-center">
            <Loader2 className="animate-spin w-10 h-10 mb-2 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Loading your order ..</h3>
          <p className="text-sm text-zinc-600">This won't take long</p>
        </div>
      </div>
    );
  }

  if (data === false) {
    return (
      <div className="w-full h-[calc(100vh-162px)] flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="flex justify-center">
            <Loader2 className="animate-spin w-10 h-10 mb-2 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Verifying your payment ..</h3>
          <p className="text-sm text-zinc-600">This might take a moment</p>
        </div>
      </div>
    );
  }

  if (data?.notExist === true) {
    return (
      <div className="w-full h-[calc(100vh-162px)] flex flex-col justify-center items-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">This order does not exist</h3>
          <p className="text-sm text-zinc-600">
            Please make sure you are signed in as the one who purchased this
            order
          </p>
        </div>
      </div>
    );
  }

  if (data?.unauthorize === true) {
    return (
      <div className="w-full h-[calc(100vh-162px)] flex flex-col justify-center items-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">
            You need to be logged in to see your order
          </h3>
          <div className="mt-8">
            <ButtonComponent
              link="/auth/register"
              onClick={() => {
                localStorage.setItem(
                  "redirectURL",
                  window.location.href.split(
                    process.env.NEXT_PUBLIC_SERVER_URL
                  )[1]
                );
              }}
              transparent
              cls="text-sm font-medium hover:bg-accent text-foreground/90"
            >
              Sign Up
            </ButtonComponent>
            <ButtonComponent
              link="/auth/login"
              cls="text-sm font-medium "
              onClick={() => {
                localStorage.setItem(
                  "redirectURL",
                  window.location.href.split(
                    process.env.NEXT_PUBLIC_SERVER_URL
                  )[1]
                );
              }}
            >
              Log In
            </ButtonComponent>
          </div>
        </div>
      </div>
    );
  }

  const { totalPrice, shippingAddress, configuration, billingAddress } = data;

  let caseBackgroundColor = "bg-zinc-950";
  if (configuration.color === "blue") caseBackgroundColor = "bg-blue-950";
  if (configuration.color === "rose") caseBackgroundColor = "bg-rose-950";

  return (
    <div className="my-16">
      <div>
        <div>
          <span className="text-primary font-semibold">Thank you!</span>
          <h2 className="text-4xl font-bold mt-1 smmx:text-3xl">
            Your case is on the way
          </h2>
        </div>
        <div className="w-full my-10 block">
          <span className="text-gray-600">Order number:</span>
          <br />
          <span className="text-primary font-bold text-lg smmx:text-base">
            {"  "}
            {orderId}
          </span>
        </div>
        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-6 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">
              You made a great choice!
            </h4>
            <p className="mt-2 text-sm text-zinc-600">
              We at Dopecase believe that a phone case doesn't only need to look
              good, but also last you for the years to come. We offer a 5-year
              print guarantee: If you case isn't of the highest quality, we'll
              replace it for free.
            </p>
          </div>
        </div>
        <div className="flex space-x-6 overflow-hidden mt-6 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
          <AspectRatio ref={caseRef} ratio={3000 / 2001} className="relative">
            <div
              className="absolute z-20 scale-[1.0352]"
              style={{
                left:
                  renderedDimensions.width / 2 -
                  renderedDimensions.width / (1216 / 105),
                top: renderedDimensions.height / 5.9,
              }}
            >
              <img
                width={renderedDimensions.width / (3000 / 637)}
                className={cn(
                  "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
                  caseBackgroundColor
                )}
                alt="thankyou-phone-cover"
                src={configuration.croppedImageUrl}
              />
            </div>

            <div className="relative h-full w-full z-40">
              <img
                alt="phone"
                src="/clearphone.png"
                className="pointer-events-none h-full w-full antialiased rounded-md"
              />
            </div>
          </AspectRatio>
        </div>
        <div>
          <div className="grid grid-cols-2 mt-6 gap-x-6">
            <div>
              <span className="font-semibold font-recursive">
                Shipping Address
              </span>
              <address className="mt-3">
                <span className="block">{shippingAddress.name}</span>
                <span className="block">{shippingAddress.street}</span>

                <span className="block">
                  {shippingAddress.postalCode} {shippingAddress.city}
                </span>
                <span className="block">{shippingAddress.country}</span>
              </address>
            </div>
            <div>
              <span className="font-semibold font-recursive">
                Billing Address
              </span>
              <address className="mt-3">
                <span className="block">{billingAddress.name}</span>
                <span className="block">{billingAddress.street}</span>

                <span className="block">
                  {billingAddress.postalCode} {billingAddress.city}
                </span>
                <span className="block">{billingAddress.country}</span>
              </address>
            </div>
          </div>

          <div className="w-full h-px bg-zinc-200 my-10"></div>
          <div className="grid grid-cols-2 mt-6 gap-x-6">
            <div>
              <span className="font-semibold font-recursive">
                Payment Status
              </span>
              <span className="block mt-3">Paid</span>
            </div>
            <div>
              <span className="font-semibold font-recursive">
                Shipping Method
              </span>
              <span className="block mt-3">
                DHL, takes up to 3 working days
              </span>
            </div>
          </div>
          <div className="w-full h-px bg-zinc-200 my-10"></div>
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between">
              <span className="font-recursive  text-zinc-900">Subtotal</span>
              <span className="text-zin-700 font-semibold">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-recursive text-zinc-900">Shipping</span>
              <span className="text-zin-700 ">{formatPrice(0)}</span>
            </div>
            <div className="w-full h-px bg-zinc-200 my-10"></div>

            <div className="flex justify-between">
              <span className="font-recursive  text-zinc-900">Total</span>
              <span className="text-zin-700 font-bold">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
          <div className="flex justify-center mt-10 space-x-5">
            <ButtonComponent
              link="/"
              transparent
              cls="text-sm font-medium hover:bg-accent text-foreground/90"
            >
              Back to home
            </ButtonComponent>

            <ButtonComponent link="/en/configure/upload">
              Make Another Case
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
