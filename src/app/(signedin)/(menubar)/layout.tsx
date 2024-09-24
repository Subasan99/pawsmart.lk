// components/RootLayout.tsx
// import { Inter } from "next/font/google";
// import "../globals.css";

// const inter = Inter({ subsets: ["latin"] });


// interface RootLayoutProps {
//   children: React.ReactNode;
//   pageName: string;
//   description: string;
// }

// export default function RootLayout({
//   children,
//   pageName,
//   description,
// }: RootLayoutProps) {
//   return (
//     <div className={inter.className}>
//       <div className="w-full container pt-5 px-7 mx-auto my-5">
//         <div className="border-l-2 border-red-500 pl-2">
//           <h2 className="font-bold text-2xl">{pageName}</h2>
//         </div>
//         <div className="flex flex-row justify-between items-center">
//           <p className="text-l border-l-2 border-white-500 pl-2">
//             {description}
//           </p>
//         </div>

//         <div className="flex-grow">{children}</div>
//       </div>
//     </div>
//   );
// }
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;  // Required
  pageName: string;           // Required
  description: string;        // Required
  params?: any;               // Optional, depending on your layout
  searchParams?: any;
}

export default function RootLayout({
  children,
  pageName,
  description,
}: RootLayoutProps) {
  return (
    // <div className={inter.className}>
      <div className="w-screen container min-h-full flex flex-col pt-5 md:px-7 mx-auto my-5 grow">
        <div className="border-l-2 border-red-500 pl-2">
          <h2 className="font-bold text-2xl">{pageName}</h2>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-l border-l-2 border-white-500 pl-2">
            {description}
          </p>
        </div>
        <div className="flex grow">{children}</div>
      </div>
  );
}
