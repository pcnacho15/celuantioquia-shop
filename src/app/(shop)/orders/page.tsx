// https://tailwindcomponents.com/component/hoverable-table
import { Title } from "@/modules";
import { getOrdersByUser } from "@/modules/orders/actions/get-orders-by-user";

import { redirect } from "next/navigation";
import { OrderItem } from "../../../modules/orders/components/OrderItem";

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mis pedidos" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </>
  );
}
