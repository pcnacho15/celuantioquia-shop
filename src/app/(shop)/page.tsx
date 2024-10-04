export const revalidate = 60; // 60 segundos

import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages, Pagination, ProductGrid, Title } from "@/modules";
// import { initialData } from "@/seed/seed";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function HomePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

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

      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages} />
    </>
  );
}
