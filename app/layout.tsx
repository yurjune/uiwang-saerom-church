import localFont from "next/font/local";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./global.css";
import { CHURCH_INFO, SITE_METADATA, TWITTER_CONFIG } from "@/constants";
import Providers from "./providers";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
  style: "normal",
});

export const metadata: Metadata = {
  title: {
    default: CHURCH_INFO.name,
    template: `%s | ${CHURCH_INFO.name}`,
  },
  description: SITE_METADATA.description,
  metadataBase: new URL(SITE_METADATA.baseUrl),
  keywords: SITE_METADATA.keywords,
  openGraph: {
    url: SITE_METADATA.baseUrl,
    type: "website",
    locale: "ko_KR",
    title: CHURCH_INFO.name,
    description: SITE_METADATA.description,
    siteName: CHURCH_INFO.name,
    images: [
      {
        url: SITE_METADATA.image,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: TWITTER_CONFIG.card,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.og_image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: SITE_METADATA.icon,
    shortcut: SITE_METADATA.icon,
    apple: SITE_METADATA.icon,
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" className={pretendard.variable} suppressHydrationWarning>
      <body className="chakra-ui-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
