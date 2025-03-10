"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TbLockDollar } from "react-icons/tb";
import { useCartStore } from "@/modules/cart";
import { currencyFormat, fontTitle } from "@/utils";
import Image from "next/image";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { subTotal, /*tax*/ total, totalItems } = useCartStore((state) =>
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
        <span className={`mb-2`}>No. Productos</span>
        <span className={`text-right mb-2`}>{`${
          totalItems === 1
            ? `${totalItems} Artículo`
            : `${totalItems} Artículos`
        }`}</span>

        <span className={`mb-2`}>Subtotal</span>
        <span className={`text-right mb-2`}>{currencyFormat(subTotal)}</span>

        <span className={`mb-2`}>Envío</span>
        <span className={`text-right mb-2`}>Por calcular</span>

        {/* <span className={`${fontTitle.className} mb-2`}>Impuestos (15%)</span>
        <span className={`text-right mb-2 ${fontTitle.className}`}>
          {currencyFormat(tax)}
        </span> */}

        <div className="flex justify-between flex-col flex-wrap mt-5 w-full">
          <span className={`mt-5 text-2xl`}>Total: </span>
          <span className={`mt-1 text-2xl`}>{currencyFormat(total)}</span>
        </div>
      </div>
      <div className="mt-8 w-full">
        {totalItems > 0 ? (
          <Link
            className={`flex items-center justify-center gap-2 bg-gradient-to-r from-lime-700 to-lime-600 text-gray-50 py-2 px-4 rounded-sm transition-all w-full hover:scale-105 duration-300`}
            href="/checkout/address"
          >
            <span className={`uppercase font-semibold`}>pago seguro</span>
            <TbLockDollar
              size={25}
              className="mb-1"
            />
          </Link>
        ) : (
          <button
            disabled
            className={`bg-gray-400 text-gray-50 py-2 px-4 rounded transition-all w-full`}
          >
            Carrito vacío
          </button>
        )}

        <div className="flex flex-col items-center justify-center mt-5">
          <span
            className={`${fontTitle.className} text-xs text-gray-600 font-bold`}
          >
            Medios de pago y sitio seguro
          </span>
          <div className="flex items-center justify-center gap-3">
            <Image
              src={`/footerCheckout-mercadopago.svg`}
              alt="mercadopago"
              width={60}
              height={60}
              className="rounded"
            />
            <Image
              src={`/footerCheckout-efecty.svg`}
              alt="efecty"
              width={30}
              height={30}
              className="rounded"
            />
            <Image
              src={`/footerCheckout-pse.svg`}
              alt="pse"
              width={30}
              height={30}
              className="rounded"
            />
            <Image
              src={`/footerCheckout-visaLogo.svg`}
              alt="american"
              width={30}
              height={30}
              className="rounded"
            />
            <Image
              src={`/footerCheckout-american.svg`}
              alt="american"
              width={30}
              height={30}
              className="rounded"
            />
            <Image
              src={`/footerCheckout-diners.svg`}
              alt="diners"
              width={30}
              height={30}
              className="rounded"
            />
          </div>
        </div>
      </div>
    </>
  );
};
