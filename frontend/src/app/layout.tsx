import type { Metadata } from "next";
import "./globals.css";

import MyNavbar from "../components/myNavbar";

export const metadata: Metadata = {
  title: "NepWears",
  description: "Your fashion destination",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MyNavbar />
        {children}
      </body>
    </html>
  );
}
