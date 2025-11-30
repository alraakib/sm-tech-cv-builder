import { ClientProviders } from "@/app/providers";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsFont = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Builder - AI Powered Resume Generator",
  description: "Frontend developer task - SM Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppinsFont.className} antialiased`}
        suppressHydrationWarning
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
