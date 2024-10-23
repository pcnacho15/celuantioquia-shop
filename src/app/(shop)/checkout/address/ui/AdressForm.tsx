"use client";

import { getDepartmentById } from "@/modules/checkout/actions/get-departments";
import { getMunicipioById } from "@/modules/checkout/actions/get-municipios";
import { Departamento, Municipio } from "@/modules/checkout/interfaces/Adress";
import { useAdresStore } from "@/modules/checkout/store/adresStore";
import { fontTitle } from "@/utils";
import clsx from "clsx";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInputs {
  correo: string;
  nombres: string;
  apellidos: string;
  celular: string;
  tipoDocumento: string;
  numeroDocumento: string;
  departamento: number;
  municipio: number;
  direccion: string;
  direccion2: string;
  // codigoPostal: string;
  // ciudad: string;
  telefono: string;
}

interface Props {
  departamentos: Departamento[];
  municipios: Municipio[];
}

export const AdressForm = ({ departamentos, municipios }: Props) => {

  // console.log(municipios)
  const [municipioSelect, setMunicipioSelect] = useState<Municipio[]>([]);

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
    watch,
    reset,
  } = useForm<FormInputs>();

  const valueDepartamento = watch('departamento');

  useEffect(() => {

    // console.log(municipios)

    setMunicipioSelect(
      municipios.filter((m) => m.departamentoId === Number(valueDepartamento))
    );

  
  }, [valueDepartamento])
  


  useEffect(() => {
    let adress = getAdress();

    // const departamento= Number(adress.departamento);
    // const municipio = Number(adress.municipio);
    
    const {departamento, municipio, ...resto} = adress
    
    const departmentFound = departamentos.find(d => d.nombre === departamento);
    const municipioFound = municipios.find(m => m.nombre === municipio);

    if (adress.nombres) {
      reset({
        ...resto,
        departamento: departmentFound?.id,
        municipio: municipioFound?.id,
      });
    }
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async(data) => {
    const { departamento, municipio, ...resto } = data;
    const departmentById = await getDepartmentById(Number(departamento));
    const municipioById = await getMunicipioById( Number(municipio) );

    // console.log(departmentById?.nombre)

    setAdress({
      ...resto,
      departamento: departmentById!.nombre,
      municipio: municipioById!.nombre,
    });
    router.replace("/checkout");
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-3"
    >
      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Correo
        </span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("correo", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Celular
        </span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("telefono", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Nombres
        </span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200 capitalize"
          {...register("nombres", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Apellidos
        </span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200 capitalize"
          {...register("apellidos", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Tipo Documento
        </span>
        <select
          defaultValue={""}
          className="p-2 border rounded-md bg-gray-200 text-gray-600"
          {...register("tipoDocumento", { required: true })}
        >
          <option
            value=""
            disabled
          >
            Elija un tipo de documento
          </option>
          <option value="CC">Cédula de ciudadanía</option>
          <option value="CE">Cédula de extranjería</option>
          <option value="TI">Tarjeta identidad</option>
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Número de documento
        </span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("numeroDocumento", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Departamento
        </span>
        <select
          defaultValue={""}
          className="p-2 border rounded-md bg-gray-200 text-gray-600 capitalize"
          {...register("departamento", { required: true })}
        >
          <option
            value=""
            disabled
          >
            Seleccione un departamento
          </option>
          {departamentos.map((d) => (
            <option
              key={d.id}
              value={d.id}
            >
              {d.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Municipio
        </span>
        <select
          defaultValue={""}
          className="p-2 border rounded-md bg-gray-200 text-gray-600 capitalize"
          {...register("municipio", { required: true })}
        >
          <option
            value=""
            disabled
          >
            Seleccione un Municipio
          </option>
          {municipioSelect.map((m) => (
            <option
              key={m.id}
              value={m.id}
              className="capitalize"
            >
              {m.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Dirección
        </span>
        <input
          placeholder="Ej: Carrera 24A # 83-15"
          type="text"
          className="p-2 border rounded-md bg-gray-200 capitalize"
          {...register("direccion", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span className={`text-gray-500 font-semibold ${fontTitle.className}`}>
          Información adicional (ej: apto 201)
        </span>
        <input
          placeholder="Barrio, edificio, apto, casa, etc. (opcional)"
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("direccion2", { required: false })}
        />
      </div>

      {/* <div className="flex flex-col mb-2">
        <span>Código postal</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("codigoPostal", { required: true })}
        />
      </div> */}

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
          className={clsx("flex w-full sm:w-1/2 justify-center", {
            "flex items-center text-center justify-center bg-gradient-to-r from-lime-700 to-lime-600 rounded-sm mt-3 lg:mt-0 py-2 w-full text-white font-semibold hover:cursor-pointer shadow-md":
              isValid,
            "btn-disabled": !isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
