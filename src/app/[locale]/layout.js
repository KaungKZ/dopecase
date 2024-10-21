/* eslint-disable react/no-children-prop */

import React from "react";
import "@mantine/core/styles.css";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "../../components/AuthProvider";
import { constructMetadata } from "../../lib/utils";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import "../globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RQProviders from "../../components/RQProviders";

const opensans = localFont({
  src: "../../../public/fonts/OpenSans-VariableFont_wdth,wght.ttf",

  variable: "--font-opensans",
});
const playfair = localFont({
  src: "../../../public/fonts/PlayfairDisplay-VariableFont_wght.ttf",
  variable: "--font-playfair",
});

const recursive = localFont({
  src: "../../../public/fonts/Recursive-VariableFont_CASL,CRSV,MONO,slnt,wght.ttf",
  variable: "--font-recursive",
});

export const metadata = constructMetadata();

const theme = createTheme({
  components: {},
  colors: {
    primary: [
      "#aedbb6",
      "#9ad2a4",
      "#85c993",
      "#6ebf81",
      "#56b66f",
      "#39ad5d",
      "#00a34a",
      "#008d3f",
      "#007835",
      "#00632a",
    ],
    secondary: [
      "#fbfbfb",
      "#f9f9fa",
      "#f8f8f9",
      "#f7f7f8",
      "#f6f6f7",
      "#f5f5f6",
      "#f4f4f5",
      "#d4d4d5",
      "#b5b5b6",
      "#979798",
    ],
  },
});

export default async function RootLayout({ children, params }) {
  const messages = await getMessages();
  return (
    <html lang={params.locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        suppressHydrationWarning
        className={`${opensans.variable} ${playfair.variable} ${recursive.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <RQProviders children={children}>
            <AuthProvider>
              <NextTopLoader color="#39ad5d" />
              <MantineProvider theme={theme}>
                <Navbar />
                {children}
                <Footer />
              </MantineProvider>
            </AuthProvider>
          </RQProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
