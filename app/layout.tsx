import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portiva — Moving business forward through smarter logistics.",
  description:
    "Portiva architects robust supply chains for global enterprises. We integrate warehousing, freight forwarding, and final-mile delivery with uncompromised precision.",
  metadataBase: new URL("https://portiva.example.com"),
  openGraph: {
    title: "Portiva Logistics",
    description:
      "Architecting robust supply chains for global enterprises.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="bg-paper text-ink">{children}</body>
    </html>
  );
}
