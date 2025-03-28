"use server";

import prisma from "@/lib/prisma";
import type { Adress } from "@/modules/checkout/interfaces/Adress";
import { auth } from "@/utils";

interface ProductToOrder {
  productId: string;
  quantity: number;
  color?: string;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Adress
) => {
  const session = await auth();
  const userId = session?.user.id;

  // if (!userId) {
  //   return {
  //     ok: false,
  //     message: "No hay sesión de usuario",
  //   };
  // }

  // Obtener información de los productos

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calcular los montos // Encabezado
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // Los totales de tax, subtotal, y total
  let { subTotal, /*tax,*/ total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      // totals.tax += subTotal * 0.15;
      totals.total += subTotal /* 1.15*/;

      return totals;
    },
    { subTotal: 0, /*tax: 0,*/ total: 0 }
  );

  // Crear la transacción de base de datos

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        //  Acumular los valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity // no hacer
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativos en las existencia = no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      //* Calcular costo de envío
      let costoEnvio = 0;
      if (!address.tipoEnvio) {
        if (productIds.length > 4) {
          costoEnvio = 40000;
          total += costoEnvio;
        }else {
          costoEnvio = 20000
          total += costoEnvio;
        }
      }

      console.log(userId)
      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          tipoEnvio: address.tipoEnvio,
          costo_envio: costoEnvio,
          // tax: tax,
          subTotal: subTotal,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                color: p.color ?? "",
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // Validar, si el price es cero, entonces, lanzar un error

      // 3. Crear la direccion de la orden
      // Address
      const { tipoEnvio, ...restAddress } = address;
      // console.log(address);
      const orderAddress = await tx.orderAdress.create({
        data: {
          ...restAddress,
          orderId: order.id,
        },
      });

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error?.message,
    };
  }

  // return {
  //   ok: true,
  //   order: order,
  //   prismaTx: prismaTx,
  // };
};
