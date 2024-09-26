"use client";

import {
  CartProduct,
  ColorSelector,
  Product,
  QuantitySelector,
} from "@/modules";
import { useCartStore } from "@/modules/cart";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [color, setColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const [colorActive, setColorActive] = useState(true);

  useEffect(() => {
    setColorActive(true);
  }, [color]);

  const addProductCart = () => {
    setPosted(true);

    if (product.colores.length >= 1) {
      if (!color) {
        setColorActive(false);
        return;
      }
    }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      color: color,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setColor(undefined);
    // console.log({ color, quantity });
  };

  return (
    <>
      {posted && !colorActive && (
        <span className="mt-2 text-red-500">Debes seleccionar un color*</span>
      )}

      {/* Selector de colores */}
      <ColorSelector
        selectedColor={color}
        availableColor={product.colores}
        onColorChanged={setColor}
      />

      {/* Selector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanges={setQuantity}
      />

      {/* Botón */}
      <button
        onClick={() => addProductCart()}
        className="flex items-center bg-gradient-to-r from-lime-700 to-lime-600 rounded my-5 p-2 text-white font-semibold hover:cursor-pointer shadow-xl"
      >
        <IoCartOutline className="mr-2" />
        Agregar al carrito
      </button>
    </>
  );
};
