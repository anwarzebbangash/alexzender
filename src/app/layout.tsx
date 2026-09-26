import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "AlexxTech | AI, Web Development & Software Tutorials",
    template: "%s | AlexxTech",
  },
  description:
    "Practical tutorials on AI tools, web development, JavaScript, Next.js, Node.js and SaaS for beginners and intermediate developers.",
  keywords: [
    "AI tools",
    "web development",
    "JavaScript",
    "Next.js",
    "Node.js",
    "SaaS",
    "programming tutorials",
  ],
  authors: [{ name: "Abdullah" }],
  openGraph: {
    title: "AlexxTech | AI, Web Development & Software Tutorials",
    description:
      "Practical tutorials on AI tools, web development, JavaScript, Next.js, Node.js and SaaS.",
    siteName: "AlexxTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlexxTech | AI, Web Development & Software Tutorials",
    description:
      "Practical tutorials on AI tools, web development, JavaScript, Next.js, Node.js and SaaS.",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}