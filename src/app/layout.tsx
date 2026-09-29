import { Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-devanagari",
  display: "swap",
});

export const metadata = {
  title: "EKATMA Portal",
  description: "Government of Maharashtra industrial and entrepreneurship portal",
  icons: {
    icon: '/assets/ekatma-logo.png',
    shortcut: '/assets/ekatma-logo.png',
    apple: '/assets/ekatma-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSans.variable} ${notoSansDevanagari.variable}`}>
      <body>{children}</body>
    </html>
  );
}
