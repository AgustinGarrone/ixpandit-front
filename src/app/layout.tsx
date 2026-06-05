import "./globals.css";

import { Press_Start_2P } from "next/font/google";

import bgImage from "../../public/bg_screen.png";
import { Providers } from "./providers";

const pressStartFont = Press_Start_2P({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pressStartFont.className}>
        <Providers>
          <div className="app-shell" style={{ minHeight: "100vh", width: "100vw" }}>
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
