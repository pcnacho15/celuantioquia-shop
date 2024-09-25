"use client";

import { QuantitySelector } from "@/modules";
import { useCartStore } from "@/modules/cart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);

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
          className="flex md:items-start my-3 py-5 shadow-md rounded w-auto bg-white"
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

          <div className="flex flex-col md:justify-start md:items-start text-sm">
            <Link
              className="hover:underline font-semibold"
              href={`/product/${p.slug}`}
            >
              <p>{p.title}</p>
            </Link>
            <p className="capitalize mb-2">{p.color}</p>
            <p className="mb-2">
              {new Intl.NumberFormat("co-CO", {
                style: "currency",
                currency: "COP",
              }).format(p.price)}
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
    </>
  );
};
