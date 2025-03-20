"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/utils";

export const getOrdersByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  const orders = await prisma.order.findMany({
    // where: {
    //   userId: session.user.id,
    // },
    include: {
      OrderAdress: {
        select: {
          nombres: true,
          apellidos: true,
        },
        where: {
          correo: session.user.email,
        },
      },
      OrderItem: {
        include: {
          product: {
            include: {
              ProductImages: {
                select: {
                  url: true
                }
              }
            }
          }
        }
      }
    },
  });

  return {
    ok: true,
    orders: orders,
  };
};
