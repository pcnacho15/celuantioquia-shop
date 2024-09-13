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

        <span className="mt-5 text-2xl">Total: </span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>
      <div className="mt-4 mb-2 w-full">
        {totalItems > 0 ? (
          <Link
            className={`flex btn-primary justify-center`}
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
