import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stubby",
  description: "Stubby ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full w-full flex flex-col">
          <Header />
          <div className="grow bg-gray-100">{children}</div>
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
