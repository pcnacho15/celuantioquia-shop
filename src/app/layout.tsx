import type { Metadata } from "next";
import Head from "next/head";
import { inter } from "@/utils";

import "./globals.css";
import { Provider } from "@/providers/Provider";
import Script from "next/script";

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
    <html lang="es">
      <Head>
        {/* <Script
          src="https://checkout.wompi.co/widget.js"
          strategy="afterInteractive"
        /> */}
        <script
          src="https://checkout.epayco.co/checkout.js"
          type="text/javascript"
        ></script>
      </Head>
      <body className={`${inter.className} bg-gray-100`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
