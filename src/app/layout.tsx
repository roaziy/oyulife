"use client";

import { useEffect, useState } from "react";
import "../styles/globals.css";

// Components
import NavBar from "@/components/NavBar/Desktop/NavBar";
import Auth from "@/components/Auth/AuthForm";

function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Clear the token on page refresh
    localStorage.removeItem("authToken");

    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        {isAuthenticated ? (
          <>
            <div className="fixed top-0 left-0 w-full">
              <NavBar />
            </div>
            <div className="pt-16">{children}</div>
          </>
        ) : (
          <Auth onLoginSuccess={() => setIsAuthenticated(true)} />
        )}
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}