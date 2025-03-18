"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoLogInOutline, IoSearch } from "react-icons/io5";

import { fontTitle } from "@/utils";
import { useUiStore } from "@/modules";
import { BsBasket3 } from "react-icons/bs";
import { useCartStore } from "@/modules/cart";
import { useEffect, useRef, useState } from "react";
import { GrBasket } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { FaUserAstronaut } from "react-icons/fa6";

export const TopMenu = () => {
  const openSideMenu = useUiStore((state) => state.openSideMenu);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const pathActive = usePathname();
  const [loaded, setLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: session } = useSession();
  const isAutenticated = !!session?.user


  useEffect(() => {

    setLoaded(true);

    const handleScroll = () => {
      if (window.scrollY >= 10) {
        setIsScrolled(true); // Si el scroll es mayor o igual a 10
      } else {
        setIsScrolled(false); // Si el scroll es menor a 10
      }
    };

    // Agregar el listener de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex fixed z-10 py-2 px-5 lg:px-12 justify-between items-center w-full transition-all duration-300 ${
        isScrolled ? "bg-white/30 backdrop-blur-md" : "bg-none"
      }`}
    >
      {/* logo */}
      <div>
        <Link href="/">
          <span className={`${fontTitle.className} antialiased font-bold`}>
            Celu
          </span>
          <span
            className={`${fontTitle.className} antialiased font-bold text-lime-600`}
          >
            Antioquia
          </span>
          {/* <span className={`${fontTitle.className} antialiased`}>
            {" "}
            | Tienda
          </span> */}
        </Link>
      </div>

      {/* Opciones de Menu */}
      <div className="hidden md:block">
        <Link
          className={`m-2 p-2 rounded-md transition-all ${
            pathActive === "/" && "text-lime-600 font-semibold"
          }`}
          href="/"
        >
          Inicio
        </Link>
        <Link
          className={`m-2 p-2 rounded-md transition-all ${
            pathActive === "/categories/celulares" &&
            "text-lime-600 font-semibold"
          }`}
          href="/categories/celulares"
        >
          Celulares
        </Link>
        <Link
          className={`m-2 p-2 rounded-md transition-all${
            pathActive === "/categories/accesorios" &&
            "text-lime-600 font-semibold"
          }`}
          href="/categories/accesorios"
        >
          Accesorios
        </Link>
      </div>

      {/* Buscar, Carrito, Menu */}
      <div className="flex items-center">
        {/* <Link
          href="/search"
          className="mx-2 hover:scale-105 transition-all duration-200"
        >
          <IoSearch className="w-5 h-6 pt-[3px]" />
        </Link> */}
        <Link
          href="/cart"
          className="mx-2 hover:scale-105 transition-all duration-200"
        >
          <div
            className={`relative flex flex-row-reverse justify-center items-center px-2 py-1 
             ${
               loaded &&
               totalItems > 0 &&
               "fade-in bg-lime-600 text-white rounded-full"
             } `}
          >
            {loaded && totalItems > 0 ? (
              <>
                <span className="absolute text-xs mt-3 font-semibold">
                  {totalItems}
                </span>

                <BsBasket3 className="w-6 h-6" />
              </>
            ) : (
              <GrBasket className="w-5 h-5" />
            )}

            {/* <IoCartOutline /> */}
          </div>
        </Link>

        {isAutenticated ? (
          <button
            onClick={() => openSideMenu()}
            className="flex items-center gap-1 m-2 text-sm rounded-md transition-all hover:scale-105 duration-300 bg-lime-600 p-2 shadow-md"
          >
            <FaUserAstronaut className="w-6 h-6 text-gray-100" />
          </button>
        ) : (
          <Link
            href="/auth/login"
            // onClick={() => openSideMenu()}
            className="flex items-center gap-1 m-2 p-2 bg-lime-600 text-sm text-white rounded-md transition-all hover:scale-105 duration-300"
          >
            Ingresar
            <IoLogInOutline className="w-5 h-5" />
          </Link>
        )}
      </div>
    </nav>
  );
};
