"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/utils";

export const getOrderById = async (id: string) => {
  // const session = await auth();

  // if (!session?.user) {
  //   return {
  //     ok: false,
  //     message: "Debe de estar autenticado",
  //   };
  // }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAdress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            color: true,

            product: {
              select: {
                id: true,
                categoryId: true,
                title: true,
                slug: true,

                ProductImages: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `${id} no existe`;

    // if (session.user.role === "user") {
    //   if (session.user.id !== order.userId) {
    //     throw `${id} no es de ese usuario`;
    //   }
    // }

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Orden no existe",
    };
  }
};
