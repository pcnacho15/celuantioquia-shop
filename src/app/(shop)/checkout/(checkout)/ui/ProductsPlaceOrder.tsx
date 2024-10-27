"use client";

import { useCartStore } from "@/modules/cart";
import { currencyFormat, fontTitle } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProductsPlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      {productsInCart.map((p) => (
        <div
          key={`${p.slug}-${p.color}`}
          className="flex my-3 py-5 px-2 shadow-md bg-white rounded-md"
        >
          <Image
            src={`/products/${p.image}`}
            width={100}
            height={100}
            alt={p.title}
            style={{
              width: "100px",
              height: "100px",
            }}
            className="mr-5 rounded"
          />

          <div className="flex flex-col justify-start items-start">
            <span className="text-base">
              <p className={`text-lg ${fontTitle.className}`}>
                {p.title} ({p.quantity})
              </p>
            </span>
            <p className="capitalize mt-1 mb-2 text-base">({p.color})</p>
            <p className={`mb-2 mt-3 ${fontTitle.className} text-lg`}>
              Subtotal: {""}
              {currencyFormat(p.price * p.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
