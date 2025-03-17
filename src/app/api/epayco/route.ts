import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client"; // Si usas Prisma para la BD
import crypto from "crypto";
import { NextResponse } from "next/server";

// Instancia de Prisma (o la BD que estés usando)
const prisma = new PrismaClient();

export async function POST(
  req: Request
) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
  }

  try {
    // Leer el body crudo
    const body = await req.json();

    console.log(body);
    return NextResponse.json(
      { success: true, message: "Notificación recibida" },
      { status: 200 }
    );

    // const {
    //   x_signature, // Firma de seguridad de Epayco
    //   x_ref_payco, // ID del pago en Epayco
    //   x_transaction_state, // Estado de la transacción
    //   x_amount, // Monto pagado
    //   x_currency, // Moneda
    //   x_customer_email, // Correo del comprador
    //   x_extra1, // ID de la orden en tu BD
    // } = req.body;

    // // 🔍 **Paso 1: Verificar la firma de seguridad**
    // const signatureString = `${process.env.NEXT_PUBLIC_EPAYCO_KEY}^${x_ref_payco}^${x_transaction_state}^${x_amount}^${x_currency}`;
    // const generatedSignature = crypto
    //   .createHash("sha256")
    //   .update(signatureString)
    //   .digest("hex");

    // if (generatedSignature !== x_signature) {
    //   return res.status(401).json({ error: "Firma no válida" });
    // }

    // // 🔍 **Paso 2: Validar el estado de la transacción**
    // let estado = "pendiente";
    // if (x_transaction_state === "Aceptada") estado = "pagado";
    // if (x_transaction_state === "Rechazada") estado = "rechazado";
    // if (x_transaction_state === "Fallida") estado = "fallido";

    // // 🔍 **Paso 3: Actualizar el estado en la base de datos**
    // await prisma.order.update({
    //   where: { id: x_extra1 }, // ID de la orden en la BD
    //   data: { estado, transaccionId: x_ref_payco },
    // });

    // // 🔍 **Paso 4: Responder a Epayco**
    // res.status(200).json({ message: "Notificación recibida" });
  } catch (error) {
    console.error("Error procesando la notificación de Epayco:", error);
    // rrres.status(500).json({ error: "Error interno del servidor" });
    return NextResponse.json({ error }, { status: 500 });
    
  }
}

export async function GET(req: Request) {
//   if (req.method !== "POST") {
//     return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
//   }

  try {
    // Leer el body crudo
    const body = await req.json();

    console.log(body);
    return NextResponse.json(
      { success: true, message: "Notificación recibida" },
      { status: 200 }
    );

    // const {
    //   x_signature, // Firma de seguridad de Epayco
    //   x_ref_payco, // ID del pago en Epayco
    //   x_transaction_state, // Estado de la transacción
    //   x_amount, // Monto pagado
    //   x_currency, // Moneda
    //   x_customer_email, // Correo del comprador
    //   x_extra1, // ID de la orden en tu BD
    // } = req.body;

    // // 🔍 **Paso 1: Verificar la firma de seguridad**
    // const signatureString = `${process.env.NEXT_PUBLIC_EPAYCO_KEY}^${x_ref_payco}^${x_transaction_state}^${x_amount}^${x_currency}`;
    // const generatedSignature = crypto
    //   .createHash("sha256")
    //   .update(signatureString)
    //   .digest("hex");

    // if (generatedSignature !== x_signature) {
    //   return res.status(401).json({ error: "Firma no válida" });
    // }

    // // 🔍 **Paso 2: Validar el estado de la transacción**
    // let estado = "pendiente";
    // if (x_transaction_state === "Aceptada") estado = "pagado";
    // if (x_transaction_state === "Rechazada") estado = "rechazado";
    // if (x_transaction_state === "Fallida") estado = "fallido";

    // // 🔍 **Paso 3: Actualizar el estado en la base de datos**
    // await prisma.order.update({
    //   where: { id: x_extra1 }, // ID de la orden en la BD
    //   data: { estado, transaccionId: x_ref_payco },
    // });

    // // 🔍 **Paso 4: Responder a Epayco**
    // res.status(200).json({ message: "Notificación recibida" });
  } catch (error) {
    console.error("Error procesando la notificación de Epayco:", error);
    // rrres.status(500).json({ error: "Error interno del servidor" });
    return NextResponse.json({ error }, { status: 500 });
  }
}
