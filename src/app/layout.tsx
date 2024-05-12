import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/global/theme-provider";
import NavBar from "@/components/layout/navbar";
import Transition from "@/utils/transition";
import MobileNavBar from "@/components/layout/mobileNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thang Vu // Home",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-zinc-300 dark:bg-zinc-700`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="top-0 w-full block lg:hidden md:hidden items-center justify-center relative z-60 bg-black">
            <MobileNavBar />
          </div>
          <div className="flex justify-between w-full h-full relative">
            <div className="w-[6%] fixed h-full hidden md:block">
              <NavBar />
            </div>
            <Transition>
              {children}
              <SpeedInsights />
            </Transition>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
