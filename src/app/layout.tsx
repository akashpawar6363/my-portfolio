import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akash Pawar | Java Developer Portfolio",
  description: "Professional portfolio of Akash Pawar - Java Developer with 2+ years of experience in Spring Boot, Hibernate, MySQL, and enterprise application development.",
  keywords: ["Java Developer", "Spring Boot", "Hibernate", "MySQL", "Enterprise Applications", "Backend Developer", "Portfolio", "Akash Pawar"],
  authors: [{ name: "Akash Pawar" }],
  openGraph: {
    title: "Akash Pawar | Java Developer Portfolio",
    description: "Professional portfolio showcasing Java development expertise and enterprise projects",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
