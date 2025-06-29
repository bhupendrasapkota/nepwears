import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/myNavbar";

export const metadata: Metadata = {
  title: "NepWears",
  description: "Your fashion destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
