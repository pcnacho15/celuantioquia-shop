"use client";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect } from "react";

interface Props {
  preferenceId: string;
//   amount: number;
}

export const MercadoPagoButton = ({ preferenceId }: Props) => {
  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_CLIENT_ID!, {
      locale: "es-CO",
    });
  }, []);

  return (
    <Wallet
      initialization={{ preferenceId: preferenceId, redirectMode: "blank" }}
      // customization={{ checkout: { theme: "" } }}
    />
  );
};
