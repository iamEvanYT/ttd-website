import type { Metadata } from "next";
import "./globals.css";
import { Topbar } from "@/components/custom/topbar";
import Footer from "@/components/custom/footer";
import { ThemeProvider } from "@/components/utility/theme-provider";
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
      <head>
        <script defer src="https://umami.iamevan.dev/script.js" data-website-id="47d4dd0d-9720-4344-a304-c00c8d18564c"></script>
      </head>
      <body className="flex flex-col min-h-screen">
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