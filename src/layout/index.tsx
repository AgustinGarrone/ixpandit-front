import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { Providers } from "../app/providers";

const pressStartFont = Press_Start_2P({
  style: "normal",
  weight: "400",
  subsets:["latin"]
});

export const metadata: Metadata = {
  title: "IXP Pok",
  description: "IXP Pok",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pressStartFont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}