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
    },
  });

  orders.map(async (order) => {
    if (!order.isPaid && order.transactionId) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/epayco`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ref_epayco: order.transactionId }),
          }
        );

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error validando la orden:", error);
      }
    }
  });

  return {
    ok: true,
    orders: orders,
  };
};
