import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlassNavbar from "@/components/GlassNavbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Portfolio",
  description: "Built with Next.js, Tailwind, and GSAP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global Navbar */}
        <GlassNavbar/>
        {children} 
      </body>
    </html>
  );
}
