import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "../fonts/space-grotesk-latin.woff2",
  variable: "--font-space-grotesk",
  weight: "500 700",
  display: "swap",
});

const sans = localFont({
  src: "../fonts/ibm-plex-sans-latin.woff2",
  variable: "--font-ibm-plex-sans",
  weight: "400 600",
  display: "swap",
});

const mono = localFont({
  src: [
    { path: "../fonts/ibm-plex-mono-regular-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-mono-medium-latin.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Tendra.ai", template: "%s | Tendra.ai" },
  description: "Tendra.ai — clareza em cada requisito.",
  icons: {
    icon: [
      { url: "/brand/favicon/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
