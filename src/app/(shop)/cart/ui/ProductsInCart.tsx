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
          className="flex my-3 py-5 shadow-md rounded"
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

            <div className="flex justify-between items-center gap-8">
              <QuantitySelector
                quantity={p.quantity}
                onQuantityChanges={(value) => updateProductQuantity(p, value)}
              />

              <button
                onClick={() => removeProduct(p)}
                className="underline text-red-700"
              >
                <TbTrash size={30} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
