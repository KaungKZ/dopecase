// "use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import ButtonComponent from "./ButtonComponent";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { getServerSession } from "next-auth";
import { authOption } from "../app/[locale]/api/auth/[...nextauth]/route";
// import { signIn } from "next-auth/react";
import UserAccountNav from "./UserAccountNav";

export default async function Navbar() {
  // const data = useSession();
  const data = await getServerSession(authOption);
  const isLoggedIn = data?.user;
  const username = data?.user.name || data?.user.username;

  // const username = data.data.user.username;
  return (
    <nav className="sticky left-0 top-0 border-b border-gray-200 bg-white/75 py-4 z-50">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between">
          <div>
            <ButtonComponent
              link="/"
              transparent
              cls="hover:bg-accent"
              nested={`
                <span class="text-lg text-foreground font-semibold">
                  case<span class="text-green-600 ">cobra</span>
                </span>
                `}
            />
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <UserAccountNav username={username} />
            ) : (
              <div className="border-r-2 border-zinc-200 flex">
                <ButtonComponent
                  link="/auth/register"
                  transparent
                  cls="text-sm font-medium hover:bg-accent text-foreground/90"
                >
                  Sign Up
                </ButtonComponent>
                <ButtonComponent
                  link="/auth/login"
                  transparent
                  cls="text-sm font-medium hover:bg-accent text-foreground/90"
                >
                  Log In
                </ButtonComponent>
              </div>
            )}

            <ButtonComponent
              cls="ml-6"
              color="primary"
              link="/en/configure/upload"
            >
              Create Case
              <ArrowRight className="text-white h-5 w-5 ml-1.5" />
            </ButtonComponent>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
