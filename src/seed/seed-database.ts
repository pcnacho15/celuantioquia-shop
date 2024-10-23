import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { departamentos } from "./seed-departamentos";
import { municipios } from "./seed-municipios";

async function main() {
  // 1. Borrar registros previos

  await prisma.municipio.deleteMany();
  await prisma.departamento.deleteMany();
  await prisma.orderAdress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.productImages.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const { users } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  await prisma.departamento.createMany({
    data: departamentos,
  });

  await prisma.municipio.createMany({
    data: municipios,
  });

  const categoriesData = initialData.categories.map((name) => ({ name }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name] = category.id;
    return map;
  }, {} as Record<string, string>);

  initialData.products.forEach(
    async ({ images, category, especificaciones, ...restProduct }) => {
      const dbProduct = await prisma.product.create({
        data: {
          ...restProduct,
          especificaciones: JSON.stringify(especificaciones),
          categoryId: categoriesMap[category],
        },
      });

      // insertar imagenes
      const imagesData = images.map((image, index) => ({
        productId: dbProduct.id,
        url: image,
      }));

      await prisma.productImages.createMany({
        data: imagesData,
      });
    }
  );

  console.log("seed ejecutado");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
