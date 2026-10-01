import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/shared/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toastStyle";
import { siteMetadata } from "@/shared/config/metadata.config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster toastOptions={toastStyle} containerStyle={{ top: 100 }} />
        {children}
      </body>
    </html>
  );
}
