import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client"; // Si usas Prisma para la BD
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import getRawBody from "raw-body";
import querystring from "querystring";

// Instancia de Prisma (o la BD que estés usando)
const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Desactivar bodyParser
  },
};

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
  }

  try {
    // Leer el body crudo
    const rawBody = await req.text();
    const body = querystring.parse(rawBody);

    console.log(body);

    const {
      x_signature, // Firma de seguridad de Epayco
      x_ref_payco, // ID del pago en Epayco
      x_transaction_state, // Estado de la transacción
      x_amount, // Monto pagado
      x_currency_code, // Moneda
      x_customer_email, // Correo del comprador
      x_id_factura, // ID de la orden en tu BD
      x_fecha_transaccion,
      x_transaction_id,
    } = body;

    //** Paso 1: Verificar la firma de seguridad**
    const signatureString = `${process.env.P_CUST_ID_CLIENTE}^${process.env.P_KEY}^${x_ref_payco}^${x_transaction_id}^${x_amount}^${x_currency_code}`;

    const generatedSignature = crypto
      .createHash("sha256")
      .update(signatureString)
      .digest("hex");

    console.log(generatedSignature);
    console.log(x_signature);

    if (generatedSignature !== x_signature) {
      return NextResponse.json({ error: "Firma no válida" }, { status: 401 });
    }

    //** Paso 2: Validar el estado de la transacción**
    let estado = "pendiente";
    if (x_transaction_state === "Aceptada") estado = "pagado";
    if (x_transaction_state === "Pendiente") estado = "pendiente";
    if (x_transaction_state === "Rechazada") estado = "rechazado";

    //** Paso 3: Actualizar el estado en la base de datos**
    await prisma.order.update({
      where: { id: String(x_id_factura) }, // ID de la orden en la BD
      data: {
        isPaid: estado,
        paidAt: String(x_fecha_transaccion),
        refEpayco: String(x_ref_payco),
      },
    });

    //** Paso 4: Responder a Epayco**
    return NextResponse.json(
      { message: "Notificación recibida" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error procesando la notificación de Epayco:", error);
    // rrres.status(500).json({ error: "Error interno del servidor" });
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { ref_epayco } = await req.json(); // Obtener la referencia de pago desde el frontend

    if (!ref_epayco) {
      return NextResponse.json(
        { error: "Referencia de pago requerida" },
        { status: 400 }
      );
    }

    // 🔹 Consultar el estado de la transacción en Epayco
    const response = await fetch(
      `https://secure.epayco.co/validation/v1/reference/${ref_epayco}`
    );
    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { error: "No se pudo consultar el estado del pago" },
        { status: 500 }
      );
    }

    // 🔹 Extraer el estado de la transacción
    const transactionState = data.data.x_transaction_state; // Aceptada, Pendiente, Rechazada

    let estado = "pendiente";
    if (transactionState === "Aceptada") estado = "pagado";
    if (transactionState === "Pendiente") estado = "pendiente";
    if (transactionState === "Rechazada") estado = "rechazado";

    // 🔹 Actualizar la orden en la base de datos si el estado ha cambiado
    const ordenActualizada = await prisma.order.update({
      where: { id: data.data.x_id_factura },
      data: { isPaid: estado, paidAt: data.data.x_fecha_transaccion },
    });

    return NextResponse.json({
      message: "Orden actualizada",
      order: ordenActualizada,
    });
  } catch (error) {
    console.error("Error al validar la orden:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
