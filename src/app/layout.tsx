import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/ui/footer";
import { Inter } from "next/font/google";
import ReduxWrapper from "@/provider/redux/ReduxWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScentsNStories",
  description: "A place to buy and sell fragrances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxWrapper>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ReduxWrapper>
  );
}
