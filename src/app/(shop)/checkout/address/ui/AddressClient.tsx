"use client";

import { Title } from "@/modules";
import { TbTruckDelivery } from "react-icons/tb";
import { AdressForm } from "./AdressForm";
import { Departamento, Municipio } from "@prisma/client";
import { useCartStore } from "@/modules/cart";
import { redirect } from "next/navigation";

interface Props {
  departamentos: Departamento[];
  municipios: Municipio[];
}

export const AddressClient = ({ departamentos, municipios }: Props) => {

    const productsInCartExist = useCartStore(state => state.cart)

    console.log(productsInCartExist.length);

    if (productsInCartExist.length <= 0) {
        redirect('/cart');
    }

  return (
    <>
      <Title
        title="Información de envío"
        subtitle="Dirección de entrega y datos de contacto"
        icon={<TbTruckDelivery size={40} />}
      />

      <AdressForm
        departamentos={departamentos}
        municipios={municipios}
      />
    </>
  );
};
