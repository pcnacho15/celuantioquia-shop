// import Link from "next/link";

import Image from "next/image";
import { redirect } from "next/navigation";

import { currencyFormat, fontTitle } from "@/utils";
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

  // const preferenceId = (await createPreferenceMP(order!.id)) || "";

  const address = order!.OrderAdress;

  return (
    <div className="flex justify-center items-center mt-10 mb-24 px-0">
      <div className="flex flex-col w-[1000px]">
        {/* <Title title={`Orden #${id.split("-").at(-1)}`} /> */}

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
            <h2
              className={`text-2xl mb-2 ${fontTitle.className} font-semibold`}
            >
              Datos de envío
            </h2>
            <div className="mb-10">
              <div className="flex flex-col gap-1">
                <p className="text-lg">
                  {address!.nombres} {address!.apellidos}
                </p>
                <p className="capitalize text-lg">
                  {address!.municipio} - {address!.departamento}
                </p>
                <p className="capitalize text-lg">{address!.direccion}</p>
                <p className="capitalize text-lg">{address!.direccion2}</p>
                <p className="text-lg">{address!.telefono}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2
              className={`text-2xl mb-2 ${fontTitle.className} font-semibold`}
            >
              Resumen de tu compra
            </h2>

            <div className="grid grid-cols-2">
              <span className="text-lg">No. Productos</span>
              <span className="text-right text-lg">
                {order?.itemsInOrder === 1
                  ? "1 artículo"
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span className="text-lg">Subtotal</span>
              <span className="text-right text-lg">
                {currencyFormat(order!.subTotal)}
              </span>

              {/* <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span> */}

              <div className="flex flex-col flex-wrap w-full">
                <span className="mt-5 text-2xl">Total: </span>
                <span className="mt-1 text-2xl">
                  {currencyFormat(order!.total)}
                </span>
              </div>
            </div>
            {/*  <div className="mt-5 mb-2 w-auto">
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : (
                <>
                  <MercadoPagoButton
                    // amount={order!.total}
                    preferenceId={preferenceId}
                  />
                   <PaypalButton
                    amount={order!.total}
                    orderId={order!.id}
                  />
                </>
              )}
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
