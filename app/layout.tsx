import type { Metadata } from "next";
import "./globals.css";
import { Topbar } from "@/components/custom/topbar";
import { Footer } from "@/components/custom/footer";
import { ThemeProvider } from "@/components/utility/theme-provider";
import { OPENGRAPH_SITE_NAME } from "@/configuration";
import { Toaster } from "sonner";
import { Clarity, Umami } from "@/components/utility/analytics";

export const metadata: Metadata = {
  title: "Home",
  description: "Website for Toilet Tower Defense!",
  openGraph: {
    siteName: OPENGRAPH_SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Umami />
        <Clarity />
      </head>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Topbar />
          {children}
          <Footer />
          <Toaster expand richColors closeButton position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
