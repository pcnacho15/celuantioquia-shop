"use client";

import { QuantitySelector } from "@/modules";
import { useCartStore } from "@/modules/cart";
import { currencyFormat, fontTitle } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);
  const { totalItems } = useCartStore((state) => state.getSummaryProducts());

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  if (totalItems <= 0) {
    return (
      <div className="flex h-56 flex-col items-center justify-center gap-5 mt-10">
        <BsCartX size={80} />
        <span
          className={`text-xl text-center font-semibold`}
        >
          Upps!! <br /> Parece que tienes tu carrito de compras vacío
        </span>
      </div>
    );
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
          className="flex md:items-start my-3 py-5 px-2 shadow-md rounded-md w-auto bg-white"
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
            className="mr-5 px-1 rounded"
          />

          <div className="flex flex-col md:justify-start md:items-start">
            <Link
              className="hover:text-lime-600"
              href={`/product/${p.slug}`}
            >
              <p className={`text-lg`}>{p.title}</p>
            </Link>
            <p className="capitalize text-base mb-2">({p.color})</p>
            <p className={`mb-2 text-base`}>
              {currencyFormat(p.price)}
            </p>

            <div className="flex items-center gap-5 md:gap-8 mt-3">
              <QuantitySelector
                quantity={p.quantity}
                onQuantityChanges={(value) => updateProductQuantity(p, value)}
              />

              <button
                onClick={() => removeProduct(p)}
                className="underline text-red-700"
              >
                <TbTrash size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
