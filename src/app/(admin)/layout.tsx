import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DoctorFooter from "@/components/DoctorFooter";
import AdminHeader from "@/components/AdminPanelComponents/AdminHeader";
import SideBar from "@/components/AdminPanelComponents/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stubby Admin Panel",
  description: "Stubby Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full w-full flex flex-col relative bg-gray-100">
          <div className="sticky z-30 top-0 md:static h-fit">
            <AdminHeader />
          </div>
          <div className="flex mt-16">
            <div className=" w-1/5 sticky top-0">
              <SideBar />
            </div>
            <div className="grow-0 flex w-full max-w-[1024px] self-center overflow-y-auto pb-10">
              {children}
            </div>
          </div>

          <div className="mt-auto w-full">
            <DoctorFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
