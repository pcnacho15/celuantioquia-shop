"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    // Consultar si la orden ya se encuentra pagada
    const orderValidatedPaid = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (orderValidatedPaid?.isPaid) {
      return {
        ok: false,
        message: `Esta orden ya se encuentra pagada, por favor validar la order de transacción con id ${orderValidatedPaid.transactionId}`,
      };
    }

    const orderUpdated = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId: transactionId,
      },
    });

    if (!orderUpdated) {
      return {
        ok: false,
        message: `Lo sentimos, no se encontró una orden con número de registro ${orderId}`,
      };
    }

    return {
      ok: true,
    };
  } catch (error : any) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo actualizar el id de la transacción" + error.message,
    };
  }
};
