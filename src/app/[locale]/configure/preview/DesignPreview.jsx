"use client";

import React, { useState } from "react";
import {
  matchingModelsValue,
  colors,
  prices,
  currency,
} from "../../../../lib/config/products.js";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import ButtonComponent from "@/components/ButtonComponent.jsx";
import { cn } from "@/lib/utils.js";
import { Formik } from "formik";
import * as Yup from "yup";
// import { useSession } from "next-auth/react";
import GoogleButton from "@/components/GoogleButton.jsx";
import {
  Input,
  TextInput,
  PasswordInput,
  Button,
  ScrollArea,
} from "@mantine/core";
import { ConnectedFocusError } from "focus-formik-error";
import { signIn, useSession } from "next-auth/react";

import { authOption } from "@/lib/config/authOption";
import CreateModalPopup from "../../../../components/CreateModalPopup.jsx";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import handleCheckout from "./actions.js";
import { useRouter } from "next/navigation";

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

  const { locale } = props;

  // console.log(props);

  const [visible, { toggle }] = useDisclosure(false);
  const data = useSession(authOption);
  const [modalLoginLoading, setModalLoginLoading] = useState(false);

  // console.log("rendered");

  // const { update } = useSession(authOption);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const validationSchema = Yup.object({
    username: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Username is required"),
    password: Yup.string().required("Password is required"),
    // .min(8, "Password is too short - should be 8 chars minimum.")
    // .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  const selectedColorCode =
    colors.find((c) => c.name === color).code || "#181818";

  const { mutate: handleConfigMutation, isPending } = useMutation({
    mutationKey: ["handle-checkout"],
    mutationFn: handleCheckout,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrieve payment URL.");
    },
  });

  async function handleLogin(values) {
    // console.log(values);
    setModalLoginLoading(true);
    const signInData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    // console.log(signInData);
    setModalLoginLoading(false);

    if (signInData.error) {
      console.log(signInData.error);
    } else {
      // const { data: session } = useSession()

      if (data) {
        // router.push(`/en?redirectLogin=true`);
        close();
        // update();
        router.refresh(); // i think
      }

      // router.push({ pathname: "/en", query: { redirectLogin: "true" } });
    }
  }

  function handleClickCheckout() {
    if (data.data) {
      handleConfigMutation({ configId: id, locale: locale });
    } else {
      open();
      // show sign in modal
    }
  }

  return (
    <>
      <div className="my-24 lgmx:my-16">
        <div></div>
        <div className="grid text-sm grid-cols-12 grid-rows-1 gap-x-6 lgmx:flex lgmx:flex-col">
          <div className="col-span-4 md:row-span-2 md:row-end-2 lgmx:flex lgmx:justify-center">
            <div
              className={`relative pointer-events-none z-50 overflow-hidden ${`bg-[${selectedColorCode}]`} w-[245px] h-[500px] lgmx:w-[200px] lgmx:h-[400px]`}
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
                {croppedImageUrl && (
                  <Image
                    className="object-cover pointer-events-none min-w-full min-h-full"
                    src={croppedImageUrl}
                    fill
                    alt="overlaying phone image"
                  />
                )}
              </div>
            </div>
          </div>
          <div className=" sm:col-span-9 md:row-end-1">
            <h2 className="text-primary font-bold text-lg lgmx:hidden">
              You are only 1 step away !
            </h2>
            <h2 className="font-recursive text-3xl font-bold mt-4 lgmx:text-center lgmx:mt-8">
              Your {matchingModelsValue[model]} Case
            </h2>
            <div className="flex space-x-2 items-center mt-3 lgmx:justify-center">
              <Check className="text-primary h-5 w-5" />
              <span className="font-recursive text-base">
                In stock and ready to ship
              </span>
            </div>
            <div className="mt-10">
              <div className="flex justify-between mdmx:flex-col mdmx:space-y-6">
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
              <div className="px-7 flex flex-col space-y-3 mdmx:px-0">
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
              <div className="flex justify-end mt-10 mdmx:mt-6">
                <ButtonComponent
                  cls="px-10 smmx:w-full "
                  color="primary"
                  isLoading={isPending}
                  isDisabled={data.status === "loading"}
                  // isLoading={test}
                  onClick={() => handleClickCheckout()}
                  // onClick={() => setTest((prev) => !prev)}
                >
                  Check Out
                  <ArrowRight className="text-white h-5 w-5 ml-1.5" />
                </ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateModalPopup
        open={open}
        close={close}
        opened={opened}
        cls="login-modal"
      >
        <div>
          <ScrollArea className="relative flex-1 h-full px-4">
            <div className=" flex justify-center">
              <div className="relative w-24 h-28 smmx:w-16 smmx:h-20">
                <Image src="/snake-1.png" fill alt="log in modal popup" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center my-4">
              Login to continue
            </h2>
            <p className="text-center text-zinc-700">
              <span className="font-semibold">
                Your configuration was saved!
              </span>{" "}
              Please login or create an account to complete your purchase.
            </p>
            <div>
              <Formik
                initialValues={{ name: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {(formik) => (
                  <form
                    onSubmit={formik.handleSubmit}
                    className="mt-8 flex flex-col space-y-2"
                  >
                    <ConnectedFocusError />
                    <div>
                      <label htmlFor="username" className="input-label">
                        Username
                      </label>
                      <TextInput
                        id="username"
                        placeholder=""
                        aria-label="Username"
                        className="min-h-16"
                        error={
                          formik.touched.username && formik.errors.username
                            ? formik.errors.username
                            : null
                        }
                        {...formik.getFieldProps("username")}
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="input-label">
                        Password
                      </label>

                      <PasswordInput
                        id="password"
                        aria-label="Password"
                        className="min-h-16"
                        visible={visible}
                        onVisibilityChange={toggle}
                        error={
                          formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : null
                        }
                        {...formik.getFieldProps("password")}
                      />
                    </div>

                    <ButtonComponent
                      type="submit"
                      cls="w-full min-h-11 text-base"
                      isLoading={modalLoginLoading}
                    >
                      Log In
                    </ButtonComponent>
                  </form>
                )}
              </Formik>
              <div className="mb-8">
                <div className="mt-8 mb-6 flex justify-center before:content:['*'] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1/2 before:h-[1px] before:bg-slate-200 after:content:['*'] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1/2 after:h-[1px] after:bg-slate-200">
                  <span className="w-fit bg-background font-medium text-center z-10 px-4">
                    Or
                  </span>
                </div>
                <div className="flex justify-center">
                  <GoogleButton></GoogleButton>
                </div>
                <span className="text-center block mt-4 text-sm">
                  No account ?{" "}
                  <Link
                    href="/auth/register"
                    className="text-blue-600 font-medium"
                  >
                    Create one
                  </Link>
                </span>
              </div>
            </div>
          </ScrollArea>
        </div>
      </CreateModalPopup>
    </>
  );
}
