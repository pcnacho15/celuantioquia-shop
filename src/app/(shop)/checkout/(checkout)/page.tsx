import Link from "next/link";

import { Title } from "@/modules";
import { ProductsPlaceOrder } from "./ui/ProductsPlaceOrder";
import { PlaceOrder } from "./ui/PlaceOrder";


export default function CheckoutPage() {


  return (
    <div className="flex justify-center items-center mb-72 px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link
              href="/cart"
              className="underline mb-5"
            >
              Editar carrito
            </Link>

            {/* Items */}
            <ProductsPlaceOrder />
          </div>

          {/* Checkout - Resumen de orden */}
         <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
