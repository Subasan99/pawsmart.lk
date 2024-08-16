'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'veterinary-website',
//   description: 'Website description',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full w-full flex flex-col">
          <div className="bg-white flex items-center justify-between p-4 shadow-sm">
            <div className="flex items-center space-x-4">
              <img
                src="stubby.png"
                alt="Logo"
                className="h-8"
              />
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-full bg-gray-100"
              />
            </div>

            <div className="flex items-center space-x-6">
              <button className="relative">
                <img
                  src="notification.png"
                  alt="Notifications"
                  className="h-6"
                />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  1
                </span>
              </button>

              <div className="relative">
                <button
                  className="flex items-center space-x-2"
                  onClick={handleDropdownToggle}
                >
                  <img
                    src="doctor.png"
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <span>Dr. Sullivan</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grow-0">{children}</div>
        </div>
      </body>
    </html>
  );
}
