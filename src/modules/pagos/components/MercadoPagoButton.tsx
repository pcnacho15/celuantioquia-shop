"use client";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect } from "react";

interface Props {
  preferenceId: string;
//   amount: number;
}

export const MercadoPagoButton = ({ preferenceId }: Props) => {
  useEffect(() => {
    initMercadoPago("APP_USR-06f9c856-68fe-4f8e-904b-83e2aafa0c2a", {
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
