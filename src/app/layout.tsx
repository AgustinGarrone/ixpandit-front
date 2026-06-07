import "./globals.css";

import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

import bgImage from "../../public/bg-home.png";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "IXP Pokémon",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

const pressStartFont = Press_Start_2P({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pokemon",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={pressStartFont.variable}>
      <body>
        <Providers>
          <div className="app-shell">
            <div
              className="app-background"
              style={{ backgroundImage: `url(${bgImage.src})` }}
              aria-hidden
            />
            <div className="app-content">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
