import "./global.css";
import { CHURCH_LOCATION, CHURCH_NAME } from "../constants";
import Providers from "./providers";
import {
  SEO_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_ICON,
  SITE_IMAGE,
  SITE_SHORT_DESCRIPTION,
  SITE_URL,
} from "../lib/seo";

export const metadata = {
  title: {
    default: CHURCH_NAME,
    template: `%s | ${CHURCH_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...SEO_KEYWORDS.home, "교회", "예배", "설교영상", CHURCH_LOCATION],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: CHURCH_NAME,
    description: SITE_SHORT_DESCRIPTION,
    siteName: CHURCH_NAME,
    url: SITE_URL,
    images: [
      {
        url: SITE_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CHURCH_NAME,
    description: SITE_SHORT_DESCRIPTION,
    images: [SITE_IMAGE],
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
    icon: SITE_ICON,
    shortcut: SITE_ICON,
    apple: SITE_ICON,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="chakra-ui-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
