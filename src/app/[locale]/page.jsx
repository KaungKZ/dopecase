import React from "react";

import Image from "next/image";
import { Check, Star } from "lucide-react";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { Icons } from "../../components/Icons";

export default async function Home() {
  // const t = await getDictionary(lang);
  return (
    <main className="w-full ">
      <MaxWidthWrapper>
        <section className="flex space-x-24 pt-40 pb-40 items-center justify-center">
          <div>
            <h1 className="text-7xl font-bold w-fit leading-tight text-balance">
              Your Image on a{" "}
              <span className="bg-green-600 rounded-2xl text-white px-2">
                Custom
              </span>{" "}
              Phone Case
            </h1>
            <p className="text-lg mt-8 pr-10 max-w-prose text-center  text-wrap">
              Capture your favorite memories with your own, <b>one-of-one</b>{" "}
              phone case. CaseCobra allows you to hold your memories, along with
              your phone.
            </p>
            <div className="font-medium mt-8 flex flex-col space-y-2">
              <div className="flex gap-1.5 items-center">
                <Check className="h-5 w-5 text-green-600 shrink-0" />
                <span>High-quality, durable material</span>
              </div>
              <div className="flex gap-1.5 items-center">
                <Check className="h-5 w-5 text-green-600 shrink-0" />
                <span>5 year print guarantee</span>
              </div>
              <div className="flex gap-1.5 items-center">
                <Check className="h-5 w-5 text-green-600 shrink-0" />
                <span>Modern iPhone models supported</span>
              </div>
            </div>
            <div className="flex mt-8 space-x-5">
              <div className="flex -space-x-4">
                <Image
                  src="/users/user-1.png"
                  width={40}
                  height={40}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  alt="home-placeholder-user-1"
                />
                <Image
                  src="/users/user-2.png"
                  width={40}
                  height={40}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  alt="home-placeholder-user-2"
                />
                <Image
                  src="/users/user-3.png"
                  width={40}
                  height={40}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  alt="home-placeholder-user-3"
                />
                <Image
                  src="/users/user-4.jpg"
                  width={40}
                  height={40}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                  alt="home-placeholder-user-4"
                />
                <Image
                  src="/users/user-5.jpg"
                  width={40}
                  height={40}
                  className="inline-block h-10 w-10 rounded-full ring-2 object-cover ring-slate-100"
                  alt="home-placeholder-user-5"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex space-x-1">
                  <Star className="text-green-600 h-4 w-4 fill-green-600" />
                  <Star className="text-green-600 h-4 w-4 fill-green-600" />
                  <Star className="text-green-600 h-4 w-4 fill-green-600" />
                  <Star className="text-green-600 h-4 w-4 fill-green-600" />
                  <Star className="text-green-600 h-4 w-4 fill-green-600" />
                </div>
                <div className="mt-1">
                  <span className="font-medium">
                    <b>{Number("2222").toLocaleString()}</b> happy customers
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-64 ">
              <Image
                src="/phone-template-white-edges.png"
                width={256}
                height={500}
                className="absolute left-0 top-0"
                alt="phone-template-white-edges"
              />
              <Image
                src="/testimonials/1.jpg"
                width={256}
                height={500}
                className=""
                alt="testimonials-1"
              />
            </div>
            <Image
              src="/your-image.png"
              className="absolute -top-28 -right-40"
              width={208}
              height={140}
              alt="your-image-placeholder"
            />
            <Image
              src="/line.png"
              className="absolute -left-7 -bottom-6"
              width={80}
              height={140}
              alt="line-placeholder"
            />
          </div>
        </section>
        {/* <p className=" w-full justify-center text-black">{t.home.title}</p> */}
        {/* <Image width={500} height={200} src="/snake-1.png" alt="snake"></Image> */}
      </MaxWidthWrapper>
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper>
          <div>
            <h1 className="text-7xl font-bold text-center w-full leading-tight text-balance">
              What our{" "}
              <span className="relative">
                customers{" "}
                <Icons.Underline className="block pointer-events-none absolute inset-x-0 -bottom-6 text-green-600" />
              </span>{" "}
              say
            </h1>
          </div>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}
