import { Title } from "@/modules";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Mi carrito de compras" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}

          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link
              href="/"
              className="underline mb-5 text-lime-600"
            >
              Continuar comprando
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl font-semi-bold mb-2">Resumen de mi orden</h2>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
