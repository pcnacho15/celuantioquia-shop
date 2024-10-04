import { fontTitle } from '@/utils/config/fonts';

import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex px-10 w-full justify-center text-xs mb-5">
      <Link href="/">
        <span className={`${fontTitle.className} antialiased font-bold `}>
          Celu Antioquia{" "}
        </span>
        <span>| Tienda </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

      <Link
        href="/"
        className="mx-3"
      >
        Privacidad & Legal
      </Link>

      <Link
        href="/"
        className="mx-3"
      >
        Ubicaciones
      </Link>
    </div>
  );
};
