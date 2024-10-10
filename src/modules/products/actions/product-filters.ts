import prisma from "@/lib/prisma";

export const getFiltersProduct = async () => {
  const marcas = await prisma.product.findMany({
    select: {
      marca: true,
    },
    distinct: ["marca"],
  });

  const colores = await prisma.product.findMany({
    select: {
      color: true,
    },
    distinct: ["color"],
  });

  return {
    marcas,
    colores
  };
};
