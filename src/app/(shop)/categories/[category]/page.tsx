export const revalidate = 60; // 60 segundos

import { getPaginatedProductsWithImages, Pagination, ProductGrid, Title } from "@/modules";
import { getCategoryWithId } from "@/modules/categories";
import { notFound } from "next/navigation";

interface Props {
  params: {
    category: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function CaregoryPage({ params, searchParams }: Props) {

  const { category } = params;
  const categoryDB = await getCategoryWithId({ category });
  if (!categoryDB) notFound();
  
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, categoryId: categoryDB.id });

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

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
