"use client";

import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ButtonComponent from "./ButtonComponent";
import { GoogleButton, GithubButton } from "./oauthButtons.jsx";

import { Link } from "@/i18n/routing";

import { useRouter } from "next/navigation";
import { ConnectedFocusError } from "focus-formik-error";

export default function SignupForm() {
  const [visible, { toggle }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErr, setFormErr] = useState();
  const router = useRouter();
  const validationSchema = Yup.object({
    username: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  async function handleOnSubmit(values) {
    setIsLoading(true);
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        email: values.email,
      }),
    });
    setIsLoading(false);

    if (res.ok) {
      router.push("/en/auth/login");
    } else {
      const err = await res.json();
      console.log(err);
      if (err.message === "User with this email already exists") {
        setFormErr("User with this email already exists");
        setTimeout(() => {
          setFormErr("");
        }, 8000);
      } else {
        setFormErr("Registration failed");
        setTimeout(() => {
          setFormErr("");
        }, 8000);
      }

      console.error("Registration failed");
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
            </div>
            <div>
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <TextInput
                id="email"
                placeholder=""
                aria-label="Email"
                className="min-h-16"
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null
                }
                {...formik.getFieldProps("email")}
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
              isLoading={isLoading}
            >
              Create your account
            </ButtonComponent>
            <span className="h-5 text-red-600 text-center text-sm font-opensans">
              {formErr ? formErr : ""}
            </span>
          </form>
        )}
      </Formik>
      <div className="mb-8 mt-3">
        <div className="mb-6 flex justify-center before:content:['*'] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1/2 before:h-[1px] before:bg-slate-200 after:content:['*'] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1/2 after:h-[1px] after:bg-slate-200">
          <span className="w-fit bg-background font-medium text-center z-10 px-4">
            Or
          </span>
        </div>
        <div className="flex justify-center space-x-6">
          <GoogleButton></GoogleButton>
          <GithubButton></GithubButton>
        </div>
        <span className="text-center block mt-4 text-sm">
          Already have an account ?{" "}
          <Link href="/auth/login" className="text-blue-600 font-medium">
            Sign In
          </Link>
        </span>
      </div>
    </>
  );
}
