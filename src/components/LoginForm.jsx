"use client";

import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, TextInput, PasswordInput, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ButtonComponent from "./ButtonComponent";
import GoogleButton from "./GoogleButton";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ConnectedFocusError } from "focus-formik-error";
import { signIn, useSession } from "next-auth/react";
import { authOption } from "../lib/config/authOption";

export default function LoginForm() {
  const [visible, { toggle }] = useDisclosure(false);
  const data = useSession(authOption);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(data);
  const pathname = usePathname();
  const router = useRouter();
  const validationSchema = Yup.object({
    username: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Username is required"),
    password: Yup.string().required("Password is required"),
    // .min(8, "Password is too short - should be 8 chars minimum.")
    // .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  // console.log(data);

  async function handleOnSubmit(values) {
    // console.log(values);
    setIsLoading(true);
    const signInData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    // console.log(signInData);
    setIsLoading(false);
    if (signInData.error) {
      console.log(signInData.error);
    } else {
      // const { data } = useSession(authOption);
      // if (data) {
      const redirectURL = localStorage.getItem("redirectURL");
      if (redirectURL && !redirectURL.includes("/auth/register")) {
        router.push(redirectURL);
      } else {
        router.push(`/`);
      }
      if (redirectURL) localStorage.removeItem("redirectURL");
      // router.push("/"); // i think
      router.refresh();
      // router.push(`/en?redirectLogin=true`);
      // }
      // router.push({ pathname: "/en", query: { redirectLogin: "true" } });
    }
  }
  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="mt-12 flex flex-col space-y-2"
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

              {/* <div className="h-[15px] error-wrapper-empty"></div> */}
            </div>

            {/* <input
              id="firstName"
              type="text"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null} */}
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
            {/* <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}

            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null} */}
            <ButtonComponent
              type="submit"
              cls="w-full min-h-11 text-base"
              isLoading={isLoading}
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
          <Link href="/auth/register" className="text-blue-600 font-medium">
            Create one
          </Link>
        </span>
      </div>
    </>
  );
}
