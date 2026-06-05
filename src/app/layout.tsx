import { Flex } from "@chakra-ui/react";
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
          <Flex
            h="100vh"
            w="100vw"
            alignItems="center"
            justifyContent="flex-start"
            backgroundImage={`url(${bgImage.src})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
          >
            {children}
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
