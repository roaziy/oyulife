import type { Metadata } from "next";
import "../styles/globals.css";

// Desktop navbar
import NavBar from "@/components/NavBar/Desktop/NavBar";

export const metadata: Metadata = {
  title: "Welcome to OyuLife",
  description: "OyuLife is a platform for sharing and discovering life of Stundents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <div className="fixed top-0 left-0 w-full h-screen flex">
          <NavBar />
        </div>
        {children}
      </body>
    </html>
  );
}