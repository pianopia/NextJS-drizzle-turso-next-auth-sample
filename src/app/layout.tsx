'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from "next-auth/react";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <SessionProvider>
          {children}
        </SessionProvider>
        <ToastContainer aria-label="Toast Notifications" />
      </body>
    </html>
  );
}