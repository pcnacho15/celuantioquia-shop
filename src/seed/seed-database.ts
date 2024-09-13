import { initialData } from "./seed";
import prisma from '../lib/prisma';

async function main() {
    
    // 1. Borrar registros previos
    await prisma.productImages.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const categoriesData = initialData.categories.map(name => ({name}))
    await prisma.category.createMany({
        data: categoriesData
    }); 

    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name] = category.id;
        return map;
    }, {} as Record<string, string>);

    initialData.products.forEach(async({ images, category, ...restProduct }) => {

        const dbProduct = await prisma.product.create({
          data: {
            ...restProduct,
            categoryId: categoriesMap[category],
          },
        });

        // insertar imagenes
        const imagesData = images.map(image => ({
            productId: dbProduct.id,
            url: image
        }));

        await prisma.productImages.createMany({
            data: imagesData
        });

    })

    console.log('seed ejecutado');
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
