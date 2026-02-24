import Providers from "./providers";

export const metadata = {
  title: "디딤돌교회",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="chakra-ui-light" >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
