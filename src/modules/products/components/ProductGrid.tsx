'use client'

import { useState } from "react";
// import { getFiltersProduct } from "../actions/product-filters";
import { Product } from "../interfaces/Product";
import { useFilterStore } from "../store/productStore";
import { ProductGridItem } from "./ProductGridItem";
import { IoFilterOutline } from "react-icons/io5";
import { useUiStore } from "@/modules/ui/store/uiStore";
// import { ProductsFilter } from "./ProductsFilter";

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
const openFilterSideMenu = useUiStore((state) => state.openFilterSideMenu);
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
      <div className="flex flex-col gap-8">
        <button
          onClick={() => openFilterSideMenu()}
          className="flex md:hidden items-center gap-2 pl-4 py-2 shadow-md mt-5 font-semibold bg-white hover:bg-gray-100 w-28 rounded"
          type="button"
        >
          <IoFilterOutline size={25} />
          Filtros
        </button>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-10 md:pl-52">
          {products.map((p) => (
            <ProductGridItem
              key={p.slug}
              product={p}
            />
          ))}
        </div>
      </div>
    </>
  );
};
