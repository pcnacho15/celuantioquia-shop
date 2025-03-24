// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedOrders, Title } from "@/modules";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";

export default async function OrdersPage() {
  const { ok, orders = [] } = await getPaginatedOrders();

  if (!ok) {
    redirect("/");
  }

  return (
    <>
      <Title title="Todas las órdenes" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado pago
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado envío
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id.split("-").at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderAdress?.nombres} {order.OrderAdress?.apellidos}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.isPaid === "pagado" && (
                    <>
                      <IoCardOutline
                        className="text-green-800"
                        size={20}
                      />
                      <span className="mx-2 text-green-800">Pagada</span>
                    </>
                  )}

                  {order.isPaid === "pendiente" && (
                    <>
                      <IoCardOutline
                        className="text-blue-600"
                        size={20}
                      />
                      <span className="mx-2 text-blue-600">Pendiente</span>
                    </>
                  )}

                  {order.isPaid === "rechazado" && (
                    <>
                      <IoCardOutline
                        className="text-red-800"
                        size={20}
                      />
                      <span className="mx-2 text-red-800">Rechazada</span>
                    </>
                  )}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <div className="flex items-center">
                    {order.estadoEnvio && (
                      <>
                        <IoMdCheckboxOutline
                          className="text-green-800"
                          size={20}
                        />
                        <span className="mx-2 text-green-800">Entregado</span>
                      </>
                    )}

                    {order.isPaid === "pagado" && !order.estadoEnvio && (
                      <>
                        <TbTruckDelivery
                          className="text-blue-600"
                          size={20}
                        />
                        <span className="mx-2 text-blue-600">
                          En proceso de entrega
                        </span>
                      </>
                    )}

                    {order.isPaid === "rechazado" && (
                      <>
                        <TbTruckDelivery
                          className="text-red-800"
                          size={20}
                        />
                        <span className="mx-2 text-red-800">
                          Envío cancelado
                        </span>
                      </>
                    )}
                  </div>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
