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
    <div
      className="h-96 pr-3 overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      {productsInCart.map((p) => (
        <div
          key={`${p.slug}-${p.color}`}
          className="flex my-3 px-2 py-5 bg-white shadow-md rounded-md w-auto"
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
              <p className={`text-base`}>
                {p.title} <span className="font-bold">({p.quantity})</span>
              </p>
            </span>
            <p className="capitalize mt-1 mb-2 text-base">({p.color})</p>
            <p className={`mb-2 mt-3 text-base`}>
              Subtotal: {""}
              {currencyFormat(p.price * p.quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
