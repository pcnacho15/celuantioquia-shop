"use client";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect } from "react";

interface Props {
  preferenceId: string;
//   amount: number;
}

export const MercadoPagoButton = ({ preferenceId }: Props) => {
  useEffect(() => {
    initMercadoPago("APP_USR-c1200559-6256-4e8b-8a6b-cd5a86dc8d4c", {
      locale: "es-CO",
    });
  }, []);

  return (
    <Wallet
      initialization={{ preferenceId: preferenceId, redirectMode: "modal" }}
      customization={{ texts: { valueProp: "smart_option" } }}
    />
  );
};
