import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ApolloWrapper } from "./ApolloWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe List",
  description: "Search for your favourite recipes",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <ApolloWrapper>{children}</ApolloWrapper>
    </body>
  </html>
);

export default RootLayout;
