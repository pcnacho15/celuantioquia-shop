"use client";

import { useEffect, useState } from "react";

import { currencyFormat } from "@/utils";

import { useCartStore } from "@/modules/cart";
import { useAdresStore } from "@/modules/checkout/actions/adresStore";
import { placeOrder } from "@/modules/orders/actions/place-order";
import clsx from "clsx";
import { useRouter } from "next/navigation";

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
      color: product.color,
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
      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.nombres} {address.apellidos}
        </p>
        <p>{address.direccion}</p>
        <p>{address.direccion2}</p>
        <p>{address.codigoPostal}</p>
        <p>
          {address.ciudad}, {address.pais}
        </p>
        <p>{address.telefono}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{`${
          totalItems === 1
            ? `${totalItems} Artículo`
            : `${totalItems} Artículos`
        }`}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total: </span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en Colocar orden, aceptas nuestros&quot;
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
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
          onClick={onPlaceOrder}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
