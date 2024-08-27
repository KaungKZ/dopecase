import React from "react";

import Image from "next/image";
import { Check, Star, ArrowRight } from "lucide-react";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { Icons } from "../../components/Icons";
import { getServerSession } from "next-auth";
import { authOption } from "../[locale]/api/auth/[...nextauth]/route";
import { Reviews } from "../../components/Review";
import ButtonComponent from "../../components/ButtonComponent";
import Footer from "../../components/Footer";

export default async function Home() {
  // const t = await getDictionary(lang);
  const session = await getServerSession(authOption);
  // console.log("session", session);
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
              Capture your favorite memories with your own,{" "}
              <b className="text-primary">one-of-one</b> phone case. CaseCobra
              allows you to hold your memories, along with your phone.
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
      <section className="bg-slate-100 pb-6 pt-20">
        <MaxWidthWrapper>
          <div>
            <h1 className="text-6xl font-bold text-center w-full leading-tight text-balance">
              What our{" "}
              <span className="relative">
                customers{" "}
                <Icons.Underline className="block pointer-events-none absolute inset-x-0 -bottom-6 text-green-600" />
              </span>{" "}
              say
            </h1>

            <div className="mt-24">
              <div className="flex justify-between space-x-16">
                <div className="flex-1">
                  <div className="flex space-x-1">
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                  </div>

                  <p className="text-lg mt-6 leading-8">
                    "The case feels durable and I even got a compliment on the
                    design. Had the case for two and a half months now and{" "}
                    <span class="px-1 py-0.5 bg-slate-800 text-white rounded-md">
                      the image is super clear
                    </span>
                    , on the case I had before, the image started fading into
                    yellow-ish color after a couple weeks. Love it."
                  </p>
                  <div className="flex mt-8 space-x-4">
                    <div className="w-12 h-12 relative">
                      <Image
                        src="/users/user-3.png"
                        fill
                        alt="user-review-1"
                        className="rounded-full flex-1"
                      />
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-semibold font-recursive">
                        Anindita
                      </span>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mr-1.5" />
                        <span className="opacity-70 text-sm font-medium">
                          Verified Purchase
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex space-x-1">
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                  </div>
                  <p className="text-lg mt-6 leading-8">
                    "I usually keep my phone together with my keys in my pocket
                    and that led to some pretty heavy scratchmarks on all of my
                    last phone cases. This one, besides a barely noticeable
                    scratch on the corner,
                    <span class="px-1 py-0.5 bg-slate-800 text-white rounded-md">
                      looks brand new after about half a year
                    </span>
                    . I dig it."
                  </p>
                  <div className="flex mt-8 space-x-4">
                    <div className="w-12 h-12 relative">
                      <Image
                        src="/users/user-5.jpg"
                        fill
                        alt="user-review-2"
                        className="rounded-full flex-1 object-cover"
                      />
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-semibold font-recursive">
                        Anand
                      </span>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mr-1.5" />
                        <span className="opacity-70 text-sm font-medium">
                          Verified Purchase
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="relative bg-slate-100 pt-12">
        <Reviews />
      </section>

      <section className="w-full pt-28 pb-16 bg-slate-50 ">
        <MaxWidthWrapper>
          <div className="max-w-2xl mx-auto">
            <h1 className="font-recursive text-6xl font-bold text-center tracking-tight text-balance leading-tight">
              Upload your photo and get{" "}
              <span className="bg-green-600 rounded-2xl text-white px-2">
                your own case
              </span>{" "}
              now
            </h1>
          </div>
          <div className="flex items-center mt-24 justify-center space-x-5">
            <div>
              <div className="w-[384px] h-[575px] relative">
                <Image
                  src="/horse.jpg"
                  fill
                  className="object-cover rounded-lg shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
            <div className="w-[126px] h-[30px] relative">
              <Image src="/arrow.png" fill className="object-cover" />
            </div>
            <div className="relative">
              <div className="relative w-[240px] h-[490px]">
                <Image
                  src="/phone-template-white-edges.png"
                  fill
                  className="object-cover z-10"
                />
              </div>
              <Image
                src="/horse_phone.jpg"
                // width={240}
                // height={490}
                fill
                className="object-cover absolute top-0 left-0"
              />
            </div>
          </div>
          <div className="mt-16 flex flex-col space-y-2 max-w-prose items-start mx-auto w-fit">
            <div className="flex gap-1.5 items-center">
              <Check className="h-5 w-5 text-green-600 shrink-0" />
              <span className="font-medium text-lg">
                High-quality silicone material
              </span>
            </div>
            <div className="flex gap-1.5 items-center">
              <Check className="h-5 w-5 text-green-600 shrink-0" />
              <span className="font-medium text-lg">
                Scratch and fingerprint resistant coating
              </span>
            </div>
            <div className="flex gap-1.5 items-center">
              <Check className="h-5 w-5 text-green-600 shrink-0" />
              <span className="font-medium text-lg">
                Wireless charging compatible
              </span>
            </div>
            <div className="flex gap-1.5 items-center">
              <Check className="h-5 w-5 text-green-600 shrink-0" />
              <span className="font-medium text-lg">5 year print warranty</span>
            </div>
            <ButtonComponent
              cls="!mt-7 mx-auto text-base"
              color="primary"
              link="/en/configure/upload"
            >
              Create your case now
              <ArrowRight className="text-white h-5 w-5 ml-1.5" />
            </ButtonComponent>
          </div>
        </MaxWidthWrapper>
      </section>
      {/* <Footer /> */}
    </main>
  );
}
