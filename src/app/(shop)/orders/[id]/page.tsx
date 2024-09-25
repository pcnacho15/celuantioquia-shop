// import Link from "next/link";

import Image from "next/image";
import { redirect } from "next/navigation";

import { currencyFormat } from "@/utils";
import { OrderStatus, Title } from "@/modules";
import { getOrderById } from "@/modules/orders/actions/get-order-by-id";
import { createPreferenceMP } from "@/modules/pagos/actions/mercado-pago/create-prefecence";
import { MercadoPagoButton } from "@/modules/pagos/components/MercadoPagoButton";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const preferenceId = (await createPreferenceMP(order!.id)) || "";

  const address = order!.OrderAdress;

  return (
    <div className="flex justify-center items-center mb-72 px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + item.color}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.ProductImages[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${currencyFormat(item.price)} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="flex flex-col bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address!.nombres} {address!.apellidos}
              </p>
              <p>{address!.direccion}</p>
              <p>{address!.direccion2}</p>
              <p>{address!.codigoPostal}</p>
              <p>
                {address!.ciudad}, {address!.pais}
              </p>
              <p>{address!.telefono}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 artículo"
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <div className="flex flex-col flex-wrap w-full">
                <span className="mt-5 text-2xl">Total: </span>
                <span className="mt-1 text-2xl">{currencyFormat(order!.total)}</span>
              </div>
            </div>

            <div className="mt-5 mb-2 w-auto">
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : (
                <>
                  <MercadoPagoButton
                    // amount={order!.total}
                    preferenceId={preferenceId}
                  />
                  {/* <PaypalButton
                    amount={order!.total}
                    orderId={order!.id}
                  /> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
