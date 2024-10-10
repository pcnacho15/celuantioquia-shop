"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";

import { fontTitle } from "@/utils";
import { useUiStore } from "@/modules";
import { BsBasket3 } from "react-icons/bs";
import { useCartStore } from "@/modules/cart";
import { useEffect, useState } from "react";
import { GrBasket } from "react-icons/gr";

export const TopMenu = () => {
  const openSideMenu = useUiStore((state) => state.openSideMenu);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const pathActive = usePathname();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex fixed z-10 px-5 justify-between items-center w-full bg-gray-200">
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
        <Link
          href="/search"
          className="mx-2 hover:scale-105 transition-all duration-200"
        >
          <IoSearch className="w-5 h-6 pt-[3px]" />
        </Link>
        <Link
          href="/cart"
          className="mx-2 hover:scale-105 transition-all duration-200"
        >
          <div
            className={`relative flex flex-row-reverse justify-center items-center px-2 py-1 
             ${
               loaded &&
               totalItems > 0 &&
               "fade-in bg-lime-500 text-white rounded-full"
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

        <button
          onClick={() => openSideMenu()}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
