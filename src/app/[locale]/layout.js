import React from "react";
// import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
// import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import PropTypes from "prop-types";
import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  Input,
} from "@mantine/core";
import "../globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

const theme = createTheme({
  components: {
    // Input: Input.extend({
    //   classNames: {
    //     input: "border: 1px solid var(--mantine-color-violet-filled)",
    //   },
    // }),
  },
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

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        suppressHydrationWarning
        className={`${opensans.variable} ${playfair.variable} ${recursive.variable}`}
      >
        <NextTopLoader color="#39ad5d" />
        {/* {children} */}
        <MantineProvider theme={theme}>
          <Navbar />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
  params: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
