import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/components/providers/trpc-provider";
import { ConditionalNavbar } from "@/components/layout/conditional-navbar";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Impact Idol - Your Volunteer Journey",
  description: "The system of record for volunteer impact. Track, verify, and showcase your volunteer work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <TRPCProvider>
          <div className="flex min-h-screen flex-col">
            <ConditionalNavbar />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </TRPCProvider>
      </body>
    </html>
  );
}
