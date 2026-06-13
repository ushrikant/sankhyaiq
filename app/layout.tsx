import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SankhyaIQ | Data Stories from India and the World",
  description:
    "Numbers made visual. Facts made beautiful. SankhyaIQ is India's home for data storytelling across science, society, maps, nature, economy and more.",
  metadataBase: new URL("https://sankhyaiq.in"),
  openGraph: {
    siteName: "SankhyaIQ",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${playfair.variable} ${ibmPlexSans.variable} font-plex bg-surface text-navy antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
