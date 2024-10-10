'use client'

import { useState } from "react";
// import { getFiltersProduct } from "../actions/product-filters";
import { Product } from "../interfaces/Product";
import { useFilterStore } from "../store/productStore";
import { ProductGridItem } from "./ProductGridItem";
// import { ProductsFilter } from "./ProductsFilter";

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {

  // const [loaded, setloaded] = useState(true)

  const marcas = useFilterStore((state) => state.marcas);
  const colores = useFilterStore((state) => state.colores);
  const estados = useFilterStore((state) => state.estados);
  
  if (marcas.length) {
    products = products.filter(p => marcas.includes(p.marca));
  }

  if(colores.length) {
    products = products.filter(p => colores.includes(p.color));
  }

  if (estados.length) {
    products = products.filter(p => estados.includes(p.estado));
  }


  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-10 md:pl-52">
        {products.map((p) => (
          <ProductGridItem
            key={p.slug}
            product={p}
          />
        ))}
      </div>
    </>
  );
};
