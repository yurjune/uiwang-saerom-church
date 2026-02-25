import "./global.css";
import { CHURCH_NAME } from "../constants";
import Providers from "./providers";

export const metadata = {
  title: CHURCH_NAME,
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
