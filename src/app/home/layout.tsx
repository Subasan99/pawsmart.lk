import Footer from "@/components/Footer";
import Header from "@/components/HomeComponent/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
    <div className="h-full w-full flex flex-col">
      <Header />
      <div className="grow bg-gray-100">{children}</div>
      <div className="mt-auto" max-h="100vh">
        <Footer />
      </div>
    </div>
  );
}
