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
  const [loaded, setLoaded] = useState(false);

  // const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav
      className={`flex justify-center items-center w-full py-5 transition-all duration-300`}
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
          <span
            className={` ${fontTitle.className} antialiased font-semibold `}
          >
            {" "}
            | Tan paisa como vos
          </span>
        </Link>
      </div>
    </nav>
  );
};
