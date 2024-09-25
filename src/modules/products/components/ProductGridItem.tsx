"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "../interfaces/Product";
import { currencyFormat } from "@/utils";
import { TiPlus } from "react-icons/ti";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { useCartStore } from "@/modules/cart";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  //   const [posted, setPosted] = useState(false);
  // const addProductToCart = useCartStore((state) => state.addProductToCart);

  
  // const addProductCart = () => {
  //   setPosted(true);

  //   if (product.colores.length >= 1) {
  //     if (!color) {
  //       setColorActive(false);
  //       return;
  //     }
  //   }

  //   const cartProduct: CartProduct = {
  //     id: product.id,
  //     slug: product.slug,
  //     title: product.title,
  //     price: product.price,
  //     quantity: quantity,
  //     color: color,
  //     image: product.images[0],
  //   };

  //   addProductToCart(cartProduct);
  //   setPosted(false);
  //   setQuantity(1);
  //   setColor(undefined);
  //   // console.log({ color, quantity });
  // };

  return (
    <div className="rounded-xl overflow-hidden fade-in bg-white">
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

      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-lime-600 font-semibold"
          href={`/product/${product.slug}`}
        >
          {product.title}
        </Link>
        <div className="flex flex-col lg:flex-row items-center mt-3">
          <div className="flex flex-col">
            <span className="font-bold">{currencyFormat(product.price)}</span>
            {product.priceCompare && (
              <span className="text-gray-400 line-through text-sm">
                {currencyFormat(product.priceCompare)}
              </span>
            )}
          </div>
          <button className="flex items-center gap-2 text-center justify-center bg-gradient-to-r from-lime-700 to-lime-600 rounded mt-3 lg:mt-0  mx-5 py-2 w-full text-white font-semibold hover:cursor-pointer hover:bg-lime shadow-md hover:scale-105 transition-all duration-150">
            Agregar
            <RiShoppingBasket2Line size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};
