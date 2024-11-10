"use server";
import { getOrderById } from "@/modules/orders/actions/get-order-by-id";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export const createPreferenceMP = async (orderId: string) => {
  const { order } = await getOrderById(orderId);

  if (!order) {
    throw new Error("No se encontró la orden a pagar");
  }

  const preference = new Preference(client);

  const resp = await preference.create({
    body: {
      items: order!.OrderItem.map((item) => ({
        id: item.product.id,
        // picture_url: item.product.ProductImages[0],
        category_id: item.product.categoryId,
        title: item.product.title,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: "COP",
      })),
      payer: {
        name: order.OrderAdress!.nombres,
        surname: order.OrderAdress!.apellidos,
        email: order.OrderAdress!.correo,
        phone: {
          area_code: "57",
          number: order.OrderAdress!.telefono,
        },
        identification: {
          type: order.OrderAdress!.tipoDocumento,
          number: order.OrderAdress!.numeroDocumento,
        },
      },
      back_urls: {
        success: `${process.env.PROD_HOST}/orders/${orderId}`,
        pending: `${process.env.PROD_HOST}/orders/${orderId}`,
        // failure: `http://localhost:3000/orders/${orderId}`,
      },
      notification_url: `${process.env.PROD_HOST}/api/payment/${orderId}`,
      external_reference: orderId,
    },
  });

  // Devolvemos el init point (url de pago) para que el usuario pueda pagar
  return resp.init_point!;
};
