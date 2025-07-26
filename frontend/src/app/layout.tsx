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
import { SiteInfoProvider } from "./context/SiteInfoContext";
import { SocialProvider } from "./context/SocialLinksContext";
import { PropertySchemaProvider } from "./context/PropertySchema";
import { TopLoader } from "./components/TopLoader";
import { UserDetailsProvider } from "./context/UserDetails";
import { ListedPropertyContext, ListedPropertyProvider } from "./context/ListedProperties";
import { LikeContextProvider } from "./context/LikeContext";
import { HomeComponentProvider } from "./context/HomeComponentDetails";
import VisitorTracker from "./components/VisitorTracker";
import { ScreenSizeProvider } from "./context/ScreenSizeContext";


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
            <UserDetailsProvider>
              <ContactProvider>
                <SiteInfoProvider>
                  <SocialProvider>
                    <ListedPropertyProvider>
                      <LikeContextProvider>
                        <ScreenSizeProvider>
                          <PropertySchemaProvider>
                            <HomeComponentProvider>
                              <VisitorTracker />
                              <Header />
                              <ToastContainer position="top-right" autoClose={3000} />
                              <TopLoader />
                              {children}
                              <Footer />
                            </HomeComponentProvider>
                          </PropertySchemaProvider>
                        </ScreenSizeProvider>
                      </LikeContextProvider>
                    </ListedPropertyProvider>
                  </SocialProvider>
                </SiteInfoProvider>
              </ContactProvider>
            </UserDetailsProvider>
          </EditModeToggleProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
