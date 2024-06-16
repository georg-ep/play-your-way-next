"use client";
import React, { useEffect } from "react";
import { NextPage } from "next";
import { NextRouter, Router } from "next/router";
import { NextUIProvider } from "@nextui-org/react";
import { AppInitialProps } from "next/app";
import RootLayout from "./layout";
import NextNProgress from 'nextjs-progressbar';

type AppPropsType<
  R extends NextRouter = NextRouter,
  P = {}
> = AppInitialProps & {
  Component: any;
  router: R;
  __N_SSG?: boolean;
  __N_SSP?: boolean;
};

type AppProps<P = {}> = AppPropsType<Router, P>;

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <NextNProgress color="#ffffff" startPosition={0.3} stopDelayMs={200} height={3} />
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </NextUIProvider>
  );
};

export default Application;
