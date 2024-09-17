import type { Metadata } from "next";
import { inter } from "@/utils";


import "./globals.css";
import { Provider } from "@/providers/Provider";



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
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
