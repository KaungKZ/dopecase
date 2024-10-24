import React from "react";

import Image from "next/image";
import { Check, Star, ArrowRight } from "lucide-react";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { Icons } from "../../components/Icons";

import YourImage from "../../../public/your-image.png";
import { Reviews } from "../../components/Review";
import ButtonComponent from "../../components/ButtonComponent";

export default async function Page() {
  return (
    <main className="w-full ">
      <MaxWidthWrapper>
        <section className="flex space-x-24 pt-40 pb-40 items-center justify-center 2xlmx:py-28 xlmx:space-x-8 xlmx:py-20 lgmx:space-x-0 lgmx:flex-col lgmx:space-y-40 smmx:pt-12 smmx:pb-16">
          <div>
            <h1 className="text-7xl font-bold w-fit leading-tight text-balance xlmx:text-6xl xlmx:leading-snug lgmx:text-center xsmmx:text-5xl xsmmx:leading-[4rem]">
              Your Image on a{" "}
              <span className="bg-green-600 rounded-2xl text-white px-2">
                Custom
              </span>{" "}
              Phone Case
            </h1>
            <p className="text-lg mt-8 pr-10 max-w-prose text-center text-wrap xlmx:text-left lgmx:text-center lgmx:max-w-full">
              Capture your favorite memories with your own,{" "}
              <span className="font-medium decoration-wavy underline-offset-2 decoration-primary decoration-3 underline">
                one-of-one
              </span>{" "}
              phone case. Dopecase allows you to hold your memories, along with
              your phone.
            </p>
            <div className="font-medium mt-8 flex flex-col space-y-2 lgmx:items-center">
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
            <div className="flex mt-8 space-x-5 lgmx:justify-center">
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
            <div className="items-center hidden mdmx:flex justify-center mt-10">
              <ButtonComponent
                cls="ml-6"
                color="primary"
                link="/configure/upload"
              >
                Create Case
                <ArrowRight className="text-white h-5 w-5 ml-1.5" />
              </ButtonComponent>
            </div>
          </div>
          <div className="relative">
            <div className="w-64 relative">
              <div className="absolute left-0 top-0 z-10">
                <div className="w-[256px] h-[500px] relative">
                  <Image
                    src="/phone-template-white-edges.png "
                    fill
                    sizes="100%"
                    alt="phone-template-white-edges"
                  />
                </div>
              </div>
              <div className="w-[256px] h-[500px] relative">
                <Image
                  src="/testimonials/1.jpg"
                  fill
                  sizes="100%"
                  alt="testimonials-1"
                />
              </div>
              <div className="absolute -top-28 -right-40 3xlmx:-right-24 2xlmx:hidden lgmx:block xsmmx:-right-12">
                <div className="w-[208px] h-[140px] relative 3xlmx:w-[150px] 3xlmx:h-[100px]">
                  <Image
                    src={YourImage}
                    fill
                    sizes="100%"
                    alt="your-image-placeholder"
                  />
                </div>
              </div>
            </div>
            <Image
              src="/line.png"
              className="absolute -left-6 -bottom-6"
              width={80}
              height={140}
              alt="line-placeholder"
            />
          </div>
        </section>
      </MaxWidthWrapper>
      <section className="bg-slate-100 pb-6 pt-20">
        <MaxWidthWrapper>
          <div>
            <h1 className="text-6xl font-bold text-center w-full leading-tight text-balance lgmx:text-5xl smmx:text-4xl">
              What our{" "}
              <span className="relative">
                customers{" "}
                <Icons.Underline className="block pointer-events-none absolute inset-x-0 -bottom-6 text-green-600" />
              </span>{" "}
              say
            </h1>

            <div className="mt-24 mdmx:mt-20 smmx:mt-16">
              <div className="flex justify-between space-x-16 lgmx:space-x-10 mdmx:flex-col mdmx:space-x-0 mdmx:space-y-10">
                <div className="flex-1">
                  <div className="flex space-x-1">
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                  </div>

                  <p className="text-lg mt-6 leading-8 mdmx:mt-4">
                    "The case feels durable and I even got a compliment on the
                    design. Had the case for two and a half months now and{" "}
                    <span className="px-1 py-0.5 bg-slate-800 text-white rounded-md lgmx:bg-transparent lgmx:px-0 lgmx:py-0 lgmx:text-black">
                      the image is super clear
                    </span>
                    , on the case I had before, the image started fading into
                    yellow-ish color after a couple weeks. Love it."
                  </p>
                  <div className="flex mt-8 space-x-4 mdmx:mt-5">
                    <div className="w-12 h-12 relative">
                      <Image
                        src="/users/user-3.png"
                        fill
                        sizes="100%"
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
                <div className="w-full h-px bg-zinc-300 my-0 hidden mdmx:block"></div>

                <div className="flex-1">
                  <div className="flex space-x-1">
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                    <Star className="text-green-600 h-5 w-5 fill-green-600" />
                  </div>
                  <p className="text-lg mt-6 leading-8 mdmx:mt-4">
                    "I usually keep my phone together with my keys in my pocket
                    and that led to some pretty heavy scratchmarks on all of my
                    last phone cases. This one, besides a barely noticeable
                    scratch on the corner,
                    <span className="px-1 py-0.5 bg-slate-800 text-white rounded-md lgmx:bg-transparent lgmx:px-0 lgmx:py-0 lgmx:text-black">
                      looks brand new after about half a year
                    </span>
                    . I dig it."
                  </p>

                  <div className="flex mt-8 space-x-4 mdmx:mt-5">
                    <div className="w-12 h-12 relative">
                      <Image
                        src="/users/user-5.jpg"
                        fill
                        sizes="100%"
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
            <h1 className="font-recursive text-6xl font-bold text-center tracking-tight text-balance leading-tight lgmx:text-5xl lgmx:leading-snug smmx:text-4xl smmx:leading-[3rem]">
              Upload your photo and get{" "}
              <span className="bg-green-600 rounded-2xl text-white px-2 xsmmx:bg-transparent xsmmx:text-black xsmmx:px-0">
                your own case
              </span>{" "}
              now
            </h1>
          </div>
          <div className="flex items-center mt-24 justify-center space-x-5 mdmx:flex-col mdmx:space-x-0 mdmx:space-y-16 mdmx:mt-20">
            <div>
              <div className="w-[384px] h-[575px] relative lgmx:w-[300px] lgmx:h-[489px] mdmx:h-[320px]">
                <Image
                  src="/horse.jpg"
                  fill
                  sizes="100%"
                  alt="upload-advertise-placeholder-1"
                  className="object-cover rounded-lg shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
            <div className="w-[126px] h-[30px] relative mdmx:rotate-90">
              <Image
                src="/arrow.png"
                fill
                className="object-cover"
                sizes="100%"
                alt="arrow placeholder"
              />
            </div>
            <div className="relative">
              <div className="relative w-[240px] h-[490px]">
                <Image
                  src="/phone-template-white-edges.png"
                  fill
                  alt="phone-template-white-edge"
                  sizes="100%"
                  className="object-cover z-10"
                />
              </div>
              <Image
                src="/horse_phone.jpg"
                sizes="100%"
                // width={240}
                // height={490}
                alt="upload-advertise-placeholder-2"
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
              link="/configure/upload"
            >
              Create your case now
              <ArrowRight className="text-white h-5 w-5 ml-1.5" />
            </ButtonComponent>
          </div>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}
