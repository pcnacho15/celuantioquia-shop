"use client";

import { useCartStore } from "@/modules/cart";
import { currencyFormat } from "@/utils";
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
          className="flex my-3 py-5 px-2 shadow-md bg-white rounded"
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
            <span className="font-semibold text-sm">
              <p>{p.title} ({p.quantity})</p>
            </span>
            <p className="capitalize text-sm mt-1 underline mb-2">{p.color}</p>
            <p className="mb-2">
              Subtotal: {''}
              {currencyFormat(p.price * p.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
