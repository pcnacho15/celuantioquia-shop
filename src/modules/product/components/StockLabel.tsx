"use client";

import { useEffect, useState } from "react";
import { fontTitle } from "@/utils";
import { getStockBySlug } from "../actions/get-product-stock";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <h1
          className={` ${fontTitle.className} antialiased font-bold text-lg bg-gray-200 animate-pulse `}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={` ${fontTitle.className} antialiased font-semibold text-base`}>
          Cantidad disponible: {stock}
        </h1>
      )}
    </>
  );
};
