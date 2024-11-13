import type { Metadata } from "next";
import "./globals.css";
import {Poppins} from 'next/font/google'
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['900','400','700','600','500','300'],
  variable: '--font-poppins',
})


export const metadata: Metadata = {
  title: "Dr Hiro",
  description: "Your Cryptocurrency Chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
