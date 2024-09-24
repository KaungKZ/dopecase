import { clsx } from "clsx";
// import { Metadata } from 'next'
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};

export function constructMetadata({
  title = "DopeCase - custom high-quality phone cases",
  description = "Create custom high-quality phone cases in seconds",
  image = "/thumbnail.png",
  icons = "/icon.ico",
} = {}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@kaungkz",
    },
    icons,
    metadataBase: new URL("https://casecobra.vercel.app/"),
  };
}
