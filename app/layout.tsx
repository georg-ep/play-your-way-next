import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Modals from "@/components/Modals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlayYourWay | P2P Football Betting",
  description: "Play your way with P2P Football Betting",
};

import type { Viewport } from "next";
import LiveGamesTile from "@/components/Tiles/LiveGames";
import Footer from "@/components/Footer";
import Marquee from "react-fast-marquee";
import Head from "next/head";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={`${montserrat.className}`}>
        <div className="min-h-screen flex flex-col justify-between">
          <div>
            <Header />
            <ToastContainer
              theme="dark"
              position="top-right"
              autoClose={5000}
            />
            <div className="max-w-[1200px] mx-auto px-2 py-6 md:p-12">
              <LiveGamesTile />
              <Modals />
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
