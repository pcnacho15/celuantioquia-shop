"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CartProduct, Product } from "../interfaces/Product";
import { currencyFormat } from "@/utils";
import { TiPlus } from "react-icons/ti";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { useCartStore } from "@/modules/cart";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  const [posted, setPosted] = useState(false);
  const [colorActive, setColorActive] = useState(true);
  const [color, setColor] = useState<string | undefined>(product.colores[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const addProductToCart = useCartStore((state) => state.addProductToCart);

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
    <div className="flex flex-col rounded-xl overflow-hidden fade-in bg-white w-full h-full">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
          priority
        />
        {/* <div className="relative bg-lime-600 h-9 text-white font-semibold text-center">
          <span>40% OFF</span>
        </div> */}
      </Link>

      <div className="p-4 flex flex-col gap-5 grow">
        <Link
          className="hover:text-lime-600 font-semibold text-ellipsis grow"
          href={`/product/${product.slug}`}
        >
          {product.title}
        </Link>

        <div className="flex flex-col lg:flex-row items-center gap-1 md:gap-2">
          <div className="flex flex-col">
            <span className="font-bold">{currencyFormat(product.price)}</span>
            {product.priceCompare && (
              <span className="text-gray-400 line-through text-sm">
                {currencyFormat(product.priceCompare)}
              </span>
            )}
          </div>
          <button
            onClick={() => addProductCart()}
            className="btn-primary"
          >
            Agregar
            <RiShoppingBasket2Line size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};
