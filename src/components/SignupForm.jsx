"use client";

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, TextInput, PasswordInput, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ButtonComponent from "./ButtonComponent";
import GoogleButton from "./GoogleButton";
import Link from "next/link";

export default function SignupForm() {
  const [visible, { toggle }] = useDisclosure(false);
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  function handleOnSubmit(values) {
    console.log(values);
  }
  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="name" className="font-semibold text-md">
                Name
              </label>
              <TextInput
                id="name"
                placeholder=""
                aria-label="Name"
                error={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : null
                }
                {...formik.getFieldProps("name")}
              />
            </div>
            <div>
              <label htmlFor="email" className="font-semibold text-md">
                Email
              </label>
              <TextInput
                id="email"
                placeholder=""
                aria-label="Email"
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null
                }
                {...formik.getFieldProps("email")}
              />
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
              <label htmlFor="password" className="font-semibold text-md">
                Password
              </label>

              <PasswordInput
                id="password"
                aria-label="Password"
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
            <ButtonComponent type="submit" cls="w-full min-h-10 text-base">
              Create your account
            </ButtonComponent>
          </form>
        )}
      </Formik>
      <div>
        <span>Or</span>
        <div>
          <GoogleButton></GoogleButton>
        </div>
        <span>
          Already have an account ?{" "}
          <Link href="/auth/login" className="text-blue-600 font-medium">
            Sign In
          </Link>
        </span>
      </div>
    </>
  );
}
