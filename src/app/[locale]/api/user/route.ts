import { NextResponse } from "next/server";
import { db } from "../../../../db";
const bcrypt = require("bcryptjs");
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // await validationSchema.validate(body, { abortEarly: false });

    const { email, username, password } = body;

    console.log("trying...2");

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      console.log("is this");
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // const existingUserByUsername = await db.user.findUnique({
    //   where: { username: username },
    // });

    // if (existingUserByUsername) {
    //   return NextResponse.json(
    //     {
    //       user: null,
    //       message:
    //         "This username is already taken. Please choose another username",
    //     },
    //     { status: 409 }
    //   );
    // }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: secPass,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "User is created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    // const statusCode = error.statusCode || 500;
    // const message = error.message || "Something went wrong";
    // // debug(`Error ${statusCode}: ${message}`);
    // return NextResponse.json(
    //   {
    //     error: message,
    //   },
    //   { status: statusCode }
    // );
  }
}
