// "use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import ButtonComponent from "./ButtonComponent";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/config/authOption";
// import LoadingAnimator from "./LoadingAnimator";
// import { signIn } from "next-auth/react";
import UserAccountNav from "./UserAccountNav";
import GuestAccountNav from "./GuestAccountNav";

export default async function Navbar(params) {
  // const data = useSession();
  const data = await getServerSession(authOption);
  const isLoggedIn = data?.user;
  const username = data?.user.name || data?.user.username;
  const headersList = headers();
  const domain = headersList.get("host") || "";
  // const fullUrl = headersList.get("referer") || "";

  // const username = data.data.user.username;
  return (
    <nav className="sticky left-0 top-0 border-b border-gray-200 bg-white/75 py-4 z-100">
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
              <GuestAccountNav domain={domain} />
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
