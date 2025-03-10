export const revalidate = 60; // 60 segundos

import { redirect } from "next/navigation";
import {
  getPaginatedProductsWithImages,
  Pagination,
  ProductGrid,
  Title,
} from "@/modules";
import { ProductsFilter } from "@/modules/products/components/ProductsFilter";
import { getFiltersProduct } from "@/modules/products/actions/product-filters";
// import { initialData } from "@/seed/seed";

type SearchParams = Promise<{
  page?: string;
}>;

// interface Props {
//   searchParams: {
//     page?: string;
//   };
// }

export default async function HomePage(props: { searchParams: SearchParams }) {

  const currentParams = await props.searchParams
  const page = currentParams.page ? parseInt(currentParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });
  const { marcas, colores } = await getFiltersProduct();

  if (products.length <= 0) {
    redirect("/");
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos nuestros productos"
        className="mb-2"
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
