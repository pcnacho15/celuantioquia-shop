export const revalidate = 60; // 60 segundos

import {
  getPaginatedProductsWithImages,
  Pagination,
  ProductGrid,
  Title,
} from "@/modules";
import { getCategoryWithId } from "@/modules/categories";
import { getFiltersProduct } from "@/modules/products/actions/product-filters";
import { ProductsFilter } from "@/modules/products/components/ProductsFilter";
import { notFound } from "next/navigation";

type Params = Promise<{
  category: string;
}>;

type SearchParams = Promise<{
  page?: string;
}>;

// type Props = Promise<{
//   params: {
//     category: string;
//   };
//   searchParams: {
//     page?: string;
//   };
// }>

export default async function CaregoryPage(props: { params: Params; searchParams: SearchParams }) {
  const { category } = await props.params;
  
  const categoryDB = await getCategoryWithId({ category });
  if (!categoryDB) notFound();

  const currentParams = await props.searchParams;
  const page = currentParams.page ? parseInt(currentParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    categoryId: categoryDB.id,
  });

  const { marcas, colores } = await getFiltersProduct();

  const labels: Record<string, string> = {
    celulares: "Celulares",
    accesorios: "Accesorios",
  };

  return (
    <>
      <Title
        title={
          categoryDB.name === "celulares"
            ? `${labels[categoryDB.name]}`
            : `${labels[categoryDB.name]}`
        }
        subtitle={
          categoryDB.name === "celulares"
            ? `Conoce toda nuestra colección de smartphones`
            : `Conoce toda nuestra colección de artículos y accesorios y/o gadgets para tu dia a dia`
        }
      />

      <div className="flex gap-12 mt-5">
        <ProductsFilter
          marcas={marcas}
          colores={colores}
        />
        <ProductGrid products={products} />
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}
