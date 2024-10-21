import { NextResponse } from "next/server";
import { db } from "@/db";
const bcrypt = require("bcryptjs");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, username, password } = body;

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
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

    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user";

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: secPass,
        role,
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
  } catch (error) {}
}
