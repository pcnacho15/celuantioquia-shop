import { Title } from "@/modules";
import { AdressForm } from "./ui/AdressForm";

export default function AdressPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title
          title="Información de envío"
          subtitle="Dirección de entrega y datos de contacto"
        />

        <AdressForm />
      </div>
    </div>
  );
}
