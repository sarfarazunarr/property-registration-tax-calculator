import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Property Registry Calculator",
  description: "Calculate All Taxes on your Property Registration in Matiari, Hala & Saeedabad. You will get info about valuation, estamps, fbr taxes and MC Tax",
  openGraph: {
    title: "Property Registry Calculator",
    description: "Calculate All Taxes on your Property Registration in Matiari, Hala & Saeedabad. You will get info about valuation, estamps, fbr taxes and MC Tax",
    url: "/",
    images: [
      {
        url: "/og.jpg",
        width: 800,
        height: 600,
        alt: "Property Registry Calculator"
      }
    ]
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
        {children}
      </body>
    </html>
  );
}
