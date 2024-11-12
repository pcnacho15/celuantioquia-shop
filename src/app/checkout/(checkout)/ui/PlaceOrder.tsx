"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";
// import { GoShieldLock } from "react-icons/go";
import { currencyFormat, fontTitle } from "@/utils";

import { useCartStore } from "@/modules/cart";
import { useAdresStore } from "@/modules/checkout/store/adresStore";
import { placeOrder } from "@/modules/orders/actions/place-order";
import clsx from "clsx";
import { RiSecurePaymentLine } from "react-icons/ri";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import { createPreferenceMP } from "@/modules/pagos/actions/mercado-pago/create-prefecence";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const router = useRouter();

  const address = useAdresStore((state) => state.getAdress());
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const { subTotal, /*tax*/ total, totalItems } = useCartStore((state) =>
    state.getSummaryProducts()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      color: product.color ?? "",
    }));

    //! Server Action
    const resp = await placeOrder(productsToOrder, address);
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    const urlMercadoPago = await createPreferenceMP(resp.order!.id);

    //* Todo salió bien!
    clearCart();
    // router.replace("orders/" + resp.order?.id);
    router.replace(urlMercadoPago);
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl pt-7 px-7 m-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 md:mb-1">
        <h2 className={`${fontTitle.className} text-xl mb-2 font-semibold`}>
          Dirección de entrega
        </h2>
        <Link
          href={"/checkout/address"}
          className="text-blue-500 hover:text-blue-600 flex mb-2 items-center gap-1"
        >
          Editar dirección
          <TbEdit size={20} />
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-lg capitalize">
          {address.nombres} {address.apellidos}
        </p>
        <p className="capitalize text-lg">
          {address.municipio} - {address.departamento}
        </p>
        <p className="capitalize text-lg">
          {address.direccion} ({address.direccion2})
        </p>
        <p className="text-lg">{address.telefono}</p>
        <p className="text-lg capitalize">
          tipo envío: {!address.tipoEnvio ? "Nacional" : "Recoger en la tienda"}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded my-5 bg-gray-200" />

      <h2 className={`${fontTitle.className} text-xl mb-2 font-semibold`}>
        Resumen de orden
      </h2>

      <div className="grid grid-cols-2">
        <span className="text-lg">No. Productos</span>
        <span className="text-right text-lg">{`${
          totalItems === 1
            ? `${totalItems} Artículo`
            : `${totalItems} Artículos`
        }`}</span>

        <span className="mt-2 text-lg">Subtotal</span>
        <span className="text-right mt-2 text-lg">
          {currencyFormat(subTotal)}
        </span>
        <span className="mt-2 text-lg">Envío</span>

        {!address.tipoEnvio ? (
          <>
            <span className="text-right mt-2 text-lg">
              {currencyFormat(10000)}
            </span>
          </>
        ) : (
          <>
            <span className="text-right mt-2 text-lg">{currencyFormat(0)}</span>
          </>
        )}

        {/* <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span> */}

        <div className="flex justify-between flex-col flex-wrap w-full">
          <span className="mt-5 text-2xl">Total: </span>
          <span className="mt-1 text-2xl">{currencyFormat(total)}</span>
        </div>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en Pagar, aceptas nuestros &quot;
            <a
              href="#"
              className="underline"
            >
              términos y condiciones
            </a>
            &ldquo; y&ldquo;
            <a
              href="#"
              className="underline"
            >
              política de privacidad
            </a>
          </span>
        </p>

        <p className="text-red-600">{errorMessage}</p>

        <button
          className={clsx("flex w-full justify-center", {
            "flex items-center text-center justify-center bg-gradient-to-r from-lime-700 to-lime-600 rounded-sm mt-3 lg:mt-0 py-2 w-full m-auto text-white font-semibold hover:cursor-pointer shadow-md hover:scale-105 transition-all duration-150":
              !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          onClick={onPlaceOrder}
        >
          <span className={`uppercase font-semibold ${fontTitle.className}`}>
            Pagar
          </span>
          {/* <GoShieldLock
            size={25}
            className="mb-1"
          /> */}
        </button>

        <div className="flex flex-col items-center justify-center mt-5">
          <div className="flex justify-center items-center gap-1">
            <RiSecurePaymentLine
              size={20}
              className="text-gray-600"
            />

            <span
              className={`${fontTitle.className} text-xs text-gray-600 font-bold`}
            >
              Pago totalmente seguro con{" "}
              <span className="text-gray-800">mercadopago</span>
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Image
              src={`/footerCheckout-mercadopago.svg`}
              alt="mercadopago"
              width={40}
              height={40}
              className="rounded"
            />
            <Image
              src={`/footerCheckout-efecty.svg`}
              alt="efecty"
              width={20}
              height={20}
              className="rounded"
            />
            <Image
              src={`/footerCheckout-pse.svg`}
              alt="pse"
              width={20}
              height={20}
              className="rounded"
            />
            <Image
              src={`/footerCheckout-visaLogo.svg`}
              alt="american"
              width={20}
              height={20}
              className="rounded"
            />
            <Image
              src={`/footerCheckout-american.svg`}
              alt="american"
              width={20}
              height={20}
              className="rounded"
            />
            <Image
              src={`/footerCheckout-diners.svg`}
              alt="diners"
              width={20}
              height={20}
              className="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
