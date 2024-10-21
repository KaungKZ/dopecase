import React from "react";
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/en/auth/register"); // default route when user comes to /auth
}
