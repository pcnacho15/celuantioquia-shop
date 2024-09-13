import type { Metadata } from "next";


import "./globals.css";
import { inter } from "@/utils";



export const metadata: Metadata = {
  title: {
    template: "%s - Celuantioquia | Tienda",
    default: "Inicio - Celuantioquia | Tienda",
  },
  description: "Tienda virtual de productos tecnológicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
