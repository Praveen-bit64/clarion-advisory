import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from "./components/Footer";
import { EditModeToggleProvider } from "./context/EditModeToggle";
import { ClerkProvider } from "@clerk/nextjs";
import { ContactProvider } from "./context/ContactContext";
import { ToastContainer } from "react-toastify";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clarion Advisory WLL",
  description: "Clarion Advisory WLL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased custom-scrollbar`}
        ><EditModeToggleProvider>
            <ContactProvider>
              <Header />
              <ToastContainer position="top-right" autoClose={3000} />
              {children}
              <Footer />
            </ContactProvider>
          </EditModeToggleProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
