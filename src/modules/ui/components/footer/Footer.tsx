import { fontTitle } from "@/utils/config/fonts";

import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export const Footer = () => {
  return (
    <div className="flex flex-col w-full h-full py-10 gap-5">
      <div className="flex px-10 justify-center items-center text-sm gap-5">
        <Link href="/">
          <span className={`${fontTitle.className} antialiased font-bold `}>
            Celu Antioquia{" "}
          </span>
          <span>| Tienda </span>
          <span>© {new Date().getFullYear()}</span>
        </Link>

        <Link href="/">Privacidad & Legal</Link>

        <Link href="/">Ubicaciones</Link>
      </div>
      <div className="flex px-10 justify-center items-center text-sm gap-5">
        <Link
          href="https://www.instagram.com/celuantioquia/"
          target="_blank"
        >
          <FaInstagram
            size={24}
            className="hover:scale-105 transition-all duration-300"
          />
        </Link>

        <Link
          href={`https://www.facebook.com/celuantioquia/`}
          target="_blank"
        >
          <FaFacebook
            size={22}
            className="hover:scale-105 transition-all duration-300"
          />
        </Link>
      </div>
    </div>
  );
};
