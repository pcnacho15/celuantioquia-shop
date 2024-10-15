"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";

import { fontTitle } from "@/utils";
import { useUiStore } from "@/modules";
import { BsBasket3 } from "react-icons/bs";
import { useCartStore } from "@/modules/cart";
import { useEffect, useRef, useState } from "react";
import { GrBasket } from "react-icons/gr";
import { TbLockDollar } from "react-icons/tb";

export const TopMenuSale = () => {
  const openSideMenu = useUiStore((state) => state.openSideMenu);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const pathActive = usePathname();
  const [loaded, setLoaded] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

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
      className={`flex fixed z-10 px-5 justify-between items-center w-full transition-all duration-300 ${
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
      {/* <div className="hidden md:block">
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
      </div> */}

      {/* Buscar, Carrito, Menu */}
      <div className="flex items-center">
        <TbLockDollar
          size={25}
          className="mb-1"
        />
        <span className={`uppercase font-semibold`}>pago seguro</span>
      </div>
    </nav>
  );
};
