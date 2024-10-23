"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { GoShieldLock } from "react-icons/go";
import { currencyFormat, fontTitle } from "@/utils";

import { useCartStore } from "@/modules/cart";
import { useAdresStore } from "@/modules/checkout/store/adresStore";
import { placeOrder } from "@/modules/orders/actions/place-order";
import clsx from "clsx";



export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const router = useRouter();

  const address = useAdresStore((state) => state.getAdress());
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const { subTotal, tax, total, totalItems } = useCartStore((state) =>
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
      color: product.color ?? '',
    }));

    //! Server Action
    const resp = await placeOrder(productsToOrder, address);
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage( resp.message );
      return;
    }

    //* Todo salió bien!
    clearCart();
    router.replace('orders/' + resp.order?.id);

  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className={`${fontTitle.className} text-2xl mb-2 font-semibold`}>
        Dirección de entrega
      </h2>
      <div className="flex flex-col gap-1 mb-10">
        <p className="text-xl capitalize">
          {address.nombres} {address.apellidos}
        </p>
        <p className="capitalize">
          {address.municipio} - {address.departamento}
        </p>
        <p className="capitalize">{address.direccion}</p>
        <p>{address.direccion2}</p>
        <p>{address.telefono}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className={`${fontTitle.className} text-2xl mb-2 font-semibold`}>
        Resumen de orden
      </h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{`${
          totalItems === 1
            ? `${totalItems} Artículo`
            : `${totalItems} Artículos`
        }`}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

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
            Al hacer clic en Pagar, aceptas nuestros&quot;
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
            "flex items-center gap-1 text-center justify-center bg-gradient-to-r from-lime-700 to-lime-600 rounded-sm mt-3 lg:mt-0 py-2 w-full m-auto text-white font-semibold hover:cursor-pointer shadow-md hover:scale-105 transition-all duration-150":
              !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          onClick={onPlaceOrder}
        >
          <span className={`uppercase font-semibold text-xl ${fontTitle.className}`}>
            Pagar
          </span>
          {/* <GoShieldLock
            size={25}
            className="mb-1"
          /> */}
        </button>

        <div className="flex items-center justify-center gap-3">
          <Image
            src={`/footerCheckout-mercadopago.svg`}
            alt="mercadopago"
            width={60}
            height={60}
            className="rounded"
          />
          <Image
            src={`/footerCheckout-efecty.svg`}
            alt="efecty"
            width={30}
            height={30}
            className="rounded"
          />
          <Image
            src={`/footerCheckout-pse.svg`}
            alt="pse"
            width={30}
            height={30}
            className="rounded"
          />
          <Image
            src={`/footerCheckout-visaLogo.svg`}
            alt="american"
            width={30}
            height={30}
            className="rounded"
          />
          <Image
            src={`/footerCheckout-american.svg`}
            alt="american"
            width={30}
            height={30}
            className="rounded"
          />
          <Image
            src={`/footerCheckout-diners.svg`}
            alt="diners"
            width={30}
            height={30}
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
};
