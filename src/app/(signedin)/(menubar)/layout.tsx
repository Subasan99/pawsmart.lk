// components/RootLayout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; 

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "veterinary-website",
//   description: "Website description",
// };

interface RootLayoutProps {
  children: React.ReactNode;
  pageName: string;
}

export default function RootLayout({ children, pageName }: RootLayoutProps) {
  return (
    <div className={inter.className}>
<div className="w-full bg-red-500 text-white py-6">
  <h1 className="ml-8 md:ml-48 text-2xl font-bold mt-5">{pageName}</h1>
</div>

    <div className="flex-grow">
      {children}
    </div>
  </div>
  );
}
