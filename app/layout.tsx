import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          <aside className="w-64 bg-white shadow-md px-4 py-6">
            <h2 className="text-xl font-bold text-gray-700 mb-6">Classroom</h2>
            <ul className="space-y-4">
              <li>
                <a href='/home' className="text-blue-500 font-medium cursor-pointer hover:underline">Dashboard</a>
              </li>
              <li>
                <a href='/join' className="text-gray-700 font-medium cursor-pointer hover:underline">Classrooms</a>
              </li>
              <li>
                <a href='/assignment' className="text-gray-700 font-medium cursor-pointer hover:underline">Assignments</a>
              </li>
              <li>
                <a href='/live' className="text-gray-700 font-medium cursor-pointer hover:underline">Live Feed</a>
              </li>
              <li>
                <a href='/resources' className="text-gray-700 font-medium cursor-pointer hover:underline">Resources</a>
              </li>
            </ul>
          </aside>
          {children}
        </div>
      </body>
    </html>
  );
}