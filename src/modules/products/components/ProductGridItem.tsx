"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CartProduct, Product } from "../interfaces/Product";
import { currencyFormat } from "@/utils";
import { TiPlus } from "react-icons/ti";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { useCartStore } from "@/modules/cart";
import { FaRegCircleCheck } from "react-icons/fa6";

interface Props {
  product: Product;
}


export const sleep = (seconds: number = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  const [posted, setPosted] = useState(false);
  const [check, setCheck] = useState(false)
  // const [colorActive, setColorActive] = useState(true);
  // const [color, setColor] = useState<string | undefined>(product.colores[0]);
  // const [quantity, setQuantity] = useState<number>(1);
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const addProductCart = async () => {
    setPosted(true);

    await sleep(0.5);

    // if (product.colores.length >= 1) {
    //   if (!color) {
    //     // setColorActive(false);
    //     return;
    //   }
    // }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: 1,
      color: product.colores[0],
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setCheck(true);
    await sleep(0.5);
    setPosted(false);
    setCheck(false);
    // setQuantity(1);
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
            {product.priceCompare && (
              <span className="text-gray-400 line-through w- text-sm">
                {currencyFormat(product.priceCompare)}
              </span>
            )}
            <span className="font-bold">{currencyFormat(product.price)}</span>
          </div>
          {posted ? (
            <button
              type="button"
              className="fade-in flex items-center text-center text-white justify-center bg-gradient-to-r from-lime-500 to-lime-400 rounded mt-3 lg:mt-0 py-2 w-full lg:w-1/2 m-auto hover:cursor-not-allowed duration-[500ms,800ms]"
              disabled
            >
              <div className="flex items-center justify-center m-[2.5px]">
                {check ? (
                  <FaRegCircleCheck
                    size={20}
                    className="fade-in"
                  />
                ) : (
                  <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                )}
              </div>
            </button>
          ) : (
            <button
              onClick={() => addProductCart()}
              className="btn-primary fade-in"
              disabled={posted}
            >
              Agregar
              <RiShoppingBasket2Line size={25} className="ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
