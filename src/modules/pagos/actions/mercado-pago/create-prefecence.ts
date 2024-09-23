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
        category_id: item.product.categoryId,
        title: item.product.title,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: "COP",
      })),
      back_urls: {
        success: `http://localhost:3000/orders/${orderId}`,
        // pending: `http://localhost:3000/orders/${orderId}`,
        // failure: `http://localhost:3000/orders/${orderId}`,
      },
      notification_url: `${process.env.PROD_HOST}/api/payment/${orderId}`,
      additional_info: orderId,
    },
  });

  return resp.id;
};
