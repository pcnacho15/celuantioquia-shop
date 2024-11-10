import { Title } from "@/modules";
import { AdressForm } from "./ui/AdressForm";
import { getDepartments } from "@/modules/checkout/actions/get-departments";
import { getMunicipios } from "@/modules/checkout/actions/get-municipios";
import { TbTruckDelivery } from "react-icons/tb";
import { AddressClient } from "./ui/AddressClient";

export default async function AdressPage() {
  const departamentos = await getDepartments();
  const municipios = await getMunicipios();

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-5">
      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">
        <AddressClient
          departamentos={departamentos}
          municipios={municipios}
        />
      </div>
    </div>
  );
}
