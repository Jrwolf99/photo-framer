import "~/styles/globals.css";

import { Geist } from "next/font/google";

export const metadata = {
  title: "Photo Framer",
  description: "Create beautiful framed images for your website",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
