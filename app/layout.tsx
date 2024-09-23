import type { Metadata } from "next";
import "./globals.css";
import { Topbar } from "@/components/topbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { OPENGRAPH_SITE_NAME } from "@/configuration";

export const metadata: Metadata = {
  title: "Home",
  description: "Website for Toilet Tower Defense!",
  openGraph: {
    siteName: OPENGRAPH_SITE_NAME
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Topbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}