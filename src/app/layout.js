"use client";

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import { Provider } from "react-redux";
import store from "@/lib/store";
import Script from "next/script";
import { DefaultSeo } from "next-seo";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <DefaultSeo
          titleTemplate="%s | SVM Pharmaceutical"
          defaultTitle="SVM Pharmaceutical - Trusted Medicines and Healthcare Products"
          description="SVM Pharmaceutical provides high-quality medicines and healthcare products. Trusted by thousands of customers. Shop now for reliable and certified products."
          canonical="https://www.svmpharmaceutical.com"
          openGraph={{
            type: "website",
            locale: "en_US",
            url: "https://www.svmpharmaceutical.com",
            siteName: "SVM Pharmaceutical",
            images: [
              {
                url: "https://www.svmpharmaceutical.com/images/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "SVM Pharmaceutical",
              },
            ],
          }}
          twitter={{
            handle: "@svmpharma",
            site: "@svmpharma",
            cardType: "summary_large_image",
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <Provider store={store}>
          <AuthProvider>
            <Navbar />
            <ScrollToTop />
            {children}
            <Footer />
            <Toaster />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
