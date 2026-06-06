import "./globals.css";

import { Press_Start_2P } from "next/font/google";

import bgImage from "../../public/bg-home.png";
import { Providers } from "./providers";

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
