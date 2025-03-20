"use client";

import { format } from "date-fns";

import Link from "next/link";
import React, { useEffect } from "react";
import { IoCardOutline } from "react-icons/io5";
import { revalidateOrders } from "../actions/revalidate-orders-epayco";
import Image from "next/image";
import { currencyFormat } from "@/utils";

interface Props {
  order: any;
}

export const OrderItem = ({ order }: Props) => {
  useEffect(() => {
    if (!order.isPaid && order.transactionId) {
      revalidateOrders(order.transactionId);
    }
  }, [order]);

  return (
    <>
      <div className="bg-white rounded-lg h-auto shadow-lg">
        <div className="flex justify-between items-center px-6 py-5 text-xs">
          {order.isPaid ? (
            <div className="flex items-center">
              <IoCardOutline className="text-green-800" />
              <span className="mx-2 text-green-800">Pagada</span>
            </div>
          ) : (
            <div className="flex items-center">
              <IoCardOutline className="text-red-800" />
              <span className="mx-2 text-red-800">Pendiente de pago</span>
            </div>
          )}
          <span className="text-gray-500">
            {String(format(order.createdAt, "yyyy-MM-dd HH:mm"))}
          </span>
        </div>

        <div
          className="flex flex-col gap-5 px-10 py-5 h-44 pr-3 overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {order.OrderItem.map((item: any) => (
            <div
              key={item.product.slug}
              className="flex items-center justify-between"
            >
              <span>{item.product.title}</span>
              <Image
                src={`/products/${item.product.ProductImages[0].url}`}
                alt={item.product.title}
                // className="w-full object-cover rounded"
                width={50}
                height={50}
              />
            </div>
          ))}
        </div>

        <div className="px-5 mt-3">
          <span className="text-gray-500 text-xs">
            Ref N°: {order.refEpayco}
          </span>
          <div>
            <span className="font-medium">{currencyFormat(order.total)}</span>
            <Link
              href={`/orders/${order.id}`}
              className="float-end flex px-3 mb-3 py-1 text-center bg-gradient-to-r from-lime-700 to-lime-600 rounded-sm lg:mt-0 m-auto text-white text-sm font-semibold hover:cursor-pointer hover:scale-105 active:scale-100 transition-all duration-300 shadow-md"
            >
              Ver orden
            </Link>
          </div>
        </div>

        {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {order.id.split("-").at(-1)}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {order.OrderAdress?.nombres} {order.OrderAdress?.apellidos}
        </td>
        <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {order.isPaid ? (
            <>
              <IoCardOutline className="text-green-800" />
              <span className="mx-2 text-green-800">Pagada</span>
            </>
          ) : (
            <>
              <IoCardOutline className="text-red-800" />
              <span className="mx-2 text-red-800">No Pagada</span>
            </>
          )}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 ">
          
        </td> */}
      </div>
    </>
  );
};
