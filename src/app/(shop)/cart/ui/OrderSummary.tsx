"use client";

import { useCartStore } from "@/modules/cart";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { subTotal, tax, total, totalItems } = useCartStore((state) =>
    state.getSummaryProducts()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{`${
          totalItems === 1
            ? `${totalItems} Artículo`
            : `${totalItems} Artículos`
        }`}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <div className="flex justify-between flex-col flex-wrap w-full">
          <span className="mt-5 text-2xl">Total: </span>
          <span className="mt-1 text-2xl">{currencyFormat(total)}</span>
        </div>
      </div>
      <div className="mt-4 mb-2 w-full">
        {totalItems > 0 ? (
          <Link
            className={`flex items-center text-center justify-center bg-gradient-to-r from-lime-700 to-lime-600 rounded mt-3 lg:mt-0 py-2 w-full text-white font-semibold hover:cursor-pointer hover:bg-lime shadow-xl hover:scale-105 transition-all duration-150`}
            href="/checkout/address"
          >
            Finalizar compra
          </Link>
        ) : (
          <button
            disabled
            className={`bg-gray-400 text-gray-50 py-2 px-4 rounded transition-all w-full`}
          >
            Carrito vacío
          </button>
        )}
      </div>
    </>
  );
};
