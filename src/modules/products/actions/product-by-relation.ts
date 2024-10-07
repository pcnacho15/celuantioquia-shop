import prisma from "@/lib/prisma";
import { ValidMarcas } from "../interfaces/Product";

export const getProductsRelationByMarca = async (marca: ValidMarcas, id:string) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImages: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        marca: marca,
        NOT: {
            id: id
        }
      },
    });

    return {
      products: products.map(
        ({ ProductImages, especificaciones, ...product }) => ({
          ...product,
          especificaciones: JSON.parse(especificaciones || ""),
          images: ProductImages.map((img) => img.url),
        })
      ),
    };
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo cargar los productos");
  }
};
