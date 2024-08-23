import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stubby",
  description: "Stubby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (token) {
    const tokenObject = JSON.parse(token.value)
    
    // if(tokenObject?.role === 'USER'){
    //   navigat
    // }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full w-full flex flex-col">
          <div className="grow-0">{children}</div>
          <Toaster richColors />
        </div>
      </body>
    </html>
  );
}
