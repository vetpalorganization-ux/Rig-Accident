import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rigaccident.com"),
  title: "Rig Accident Lawyer | Free Case Review",
  description: "Injured in a rig or oilfield accident? Speak with an experienced attorney today. Free consultation.",
  openGraph: {
    images: ["/images/stock/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/stock/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased font-body bg-secondary text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
