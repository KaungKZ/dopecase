import React from "react";
import { redirect } from "next/navigation";

export default function page() {
  redirect("/en/auth/register"); // default route when user comes to /auth
  //   return <div>page</div>;
}
