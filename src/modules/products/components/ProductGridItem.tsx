"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "../interfaces/Product";
import { currencyFormat } from "@/utils";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
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
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-600"
          href={`/product/${product.slug}`}
        >
          {product.title}
        </Link>
        <span className="font-bold">{currencyFormat(product.price)}</span>
      </div>
    </div>
  );
};
