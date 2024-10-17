"use client";
import { useAdresStore } from "@/modules/checkout/actions/adresStore";
import clsx from "clsx";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInputs {
  nombres: string;
  apellidos: string;
  direccion: string;
  direccion2?: string;
  codigoPostal: string;
  ciudad: string;
  pais: string;
  telefono: string;
}

export const AdressForm = () => {
  const router = useRouter();
  const setAdress = useAdresStore((state) => state.setAdress);
  const getAdress = useAdresStore((state) => state.getAdress);

  // useSession({
  //   required: true,
  // });

  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<FormInputs>();

  useEffect(() => {
    const adress = getAdress();

    if (adress.nombres) {
      reset(adress);
    }
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setAdress(data);

    router.replace("/checkout");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      <div className="flex flex-col mb-2 col-span-2">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
          Correo
        </span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("nombres", { required: true })}
        />
      </div>
      
      <div className="flex flex-col mb-2">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
          Nombres
        </span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("nombres", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
          Apellidos
        </span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("apellidos", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Tipo Documento</span>
        <select
          className="p-2 border rounded-md bg-gray-200"
          {...register("pais", { required: true })}
        >
          <option value="">[ Seleccione ]</option>
          <option value="CC">Cédula de ciudadanía</option>
          <option value="CE">Cédula de extranjería</option>
          <option value="TI">Tarjeta Identidad</option>
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("direccion", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección 2 (opcional)</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("direccion2", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Código postal</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("codigoPostal", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Ciudad</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("ciudad", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>País</span>
        <select
          className="p-2 border rounded-md bg-gray-200"
          {...register("pais", { required: true })}
        >
          {/* <option value="">[ Seleccione ]</option> */}
          <option value="COL">Colombia</option>
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Teléfono</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("telefono", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2 mt-5">
        {/* <div className="inline-flex items-center mb-10">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-lime-500 checked:bg-lime-500 checked:before:bg-lime-500 hover:before:opacity-10"
              id="checkbox"
              // checked
              {...register("recordarDireccion")}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <span>Recordar dirección</span>
        </div> */}
        <button
          //   href="/checkout"
          type="submit"
          disabled={!isValid}
          className={clsx("flex w-full sm:w-1/2 justify-center ", {
            "btn-primary": isValid,
            "btn-disabled": !isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
