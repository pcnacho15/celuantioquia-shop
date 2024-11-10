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
import { BsShop } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";

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
  const [envio, setEnvio] = useState(false);

  const router = useRouter();
  const setAdress = useAdresStore((state) => state.setAdress);
  const getAdress = useAdresStore((state) => state.getAdress);

  // useSession({
  //   required: true,
  // });

  const {
    handleSubmit,
    register,
    formState: { /*isValid,*/ errors },
    watch,
    reset,
  } = useForm<FormInputs>();

  const valueDepartamento = watch("departamento");

  // console.log(isValid);

  useEffect(() => {
    setMunicipioSelect(
      municipios.filter((m) => m.departamentoId === Number(valueDepartamento))
    );
    let adress = getAdress();

    // const departamento= Number(adress.departamento);
    // const municipio = Number(adress.municipio);

    const { departamento, municipio, tipoEnvio, ...resto } = adress;

    setEnvio( tipoEnvio )

    const departmentFound = departamentos.find(
      (d) => d.nombre === departamento
    );
    const municipioFound = municipios.find((m) => m.nombre === municipio);

    if (adress.nombres) {
      reset({
        ...resto,
        departamento: departmentFound!.id,
        municipio: municipioFound!.id,
      });
    }
  }, [valueDepartamento]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // if (envio === 2) {
    //   return;
    // }

    const { departamento, municipio, ...resto } = data;
    const departmentById = await getDepartmentById(Number(departamento));
    const municipioById = await getMunicipioById(Number(municipio));

    // console.log(departmentById?.nombre)

    setAdress({
      ...resto,
      departamento: departmentById!.nombre,
      municipio: municipioById!.nombre,
      tipoEnvio: envio
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
          type="email"
          placeholder="correo@mail.com"
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-2 border-rose-500": errors.correo,
          })}
          {...register("correo", {
            required:
              "El correo debe ser obligatorio, allí enviaremos la factura de tu compra",
          })}
        />
        {errors.correo && (
          <span className={`text-sm text-red-500 ${fontTitle.className}`}>
            {errors.correo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Celular
        </span>
        <input
          type="text"
          placeholder="Ej: 30548732..."
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-2 border-rose-500": errors.telefono,
          })}
          {...register("telefono", {
            required:
              "El número de celular es requerido para realizar el envío",
            minLength: {
              value: 10,
              message: "El número de celular ingresado no es correcto",
            },
          })}
        />
        {errors.telefono && (
          <span className={`text-sm text-red-500 ${fontTitle.className}`}>
            {errors.telefono.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Nombres
        </span>
        <input
          type="text"
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-2 border-rose-500": errors.nombres,
          })}
          {...register("nombres", {
            required: "El nombre es un campo requerido para realizar el envío",
          })}
        />
        {errors.nombres && (
          <span className={`text-sm text-red-500 ${fontTitle.className}`}>
            {errors.nombres.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Apellidos
        </span>
        <input
          type="text"
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-2 border-rose-500": errors.apellidos,
          })}
          {...register("apellidos", {
            required:
              "El apellido es un campo requerido para realizar el envío",
          })}
        />
        {errors.apellidos && (
          <span className={`text-sm text-red-500 ${fontTitle.className}`}>
            {errors.apellidos.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Tipo Documento
        </span>
        <select
          defaultValue={""}
          // className="p-2 border rounded-md bg-gray-200 text-gray-600"
          className={clsx("p-2 border rounded-md bg-gray-200 text-gray-600", {
            "border-2 border-rose-500": errors.tipoDocumento,
          })}
          {...register("tipoDocumento", {
            required: "Selecciona un tipo de documento",
          })}
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
        {errors.tipoDocumento && (
          <span className={`text-sm text-red-500 ${fontTitle.className}`}>
            {errors.tipoDocumento.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Número de documento
        </span>
        <input
          type="text"
          placeholder="Ej: 100306..."
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-2 border-rose-500": errors.numeroDocumento,
          })}
          {...register("numeroDocumento", {
            required:
              "El número de documento es requerido para generar la factura de tu compra",
            minLength: 10,
          })}
        />
        {errors.numeroDocumento && (
          <span className={`text-sm text-red-500 ${fontTitle.className}`}>
            {errors.numeroDocumento.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Departamento
        </span>
        <select
          defaultValue={""}
          // className="p-2 border rounded-md bg-gray-200 text-gray-600 capitalize"
          className={clsx(
            "p-2 border rounded-md bg-gray-200 text-gray-600 capitalize",
            {
              "border-2 border-rose-500": errors.departamento,
            }
          )}
          {...register("departamento", {
            required: "Selecciona tu departamento de residencia",
          })}
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
        {errors.departamento && (
          <span className={`text-sm text-red-500 ${fontTitle.className}`}>
            {errors.departamento.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span
          className={`text-gray-500 font-semibold ${fontTitle.className} after:content-['*'] after:ml-0.5 after:text-red-500`}
        >
          Municipio
        </span>
        <select
          defaultValue={""}
          className={clsx(
            "p-2 border rounded-md bg-gray-200 text-gray-600 capitalize",
            {
              "border-2 border-rose-500": errors.municipio,
            }
          )}
          {...register("municipio", {
            required: "Selecciona tu municipio de residencia",
          })}
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
        {errors.municipio && (
          <span className={`text-sm text-red-500 ${fontTitle.className}`}>
            {errors.municipio.message}
          </span>
        )}
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
          className={clsx("p-2 border rounded-md bg-gray-200 capitalize", {
            "border-2 border-rose-500": errors.direccion,
          })}
          {...register("direccion", {
            required: "Por favor índicanos la dirección de tu residencia",
          })}
        />
        {errors.direccion && (
          <span className={`text-sm text-red-500 ${fontTitle.className}`}>
            {errors.direccion.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span className={`text-gray-500 font-semibold ${fontTitle.className}`}>
          Información adicional (ej: apto 201)
        </span>
        <input
          placeholder="Barrio, edificio, apto, casa, etc. (opcional)"
          type="text"
          className="p-2 border rounded-md bg-gray-200 capitalize"
          {...register("direccion2", { required: false })}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <span
            className={`text-gray-500 font-semibold ${fontTitle.className}`}
          >
            Tipo de envío
          </span>
          <div className="flex gap-10">
            <button
              type="button"
              onClick={() => setEnvio(false)}
              className="flex flex-col justify-center items-center gap-2"
            >
              <div
                className={clsx(
                  "cursor-pointer border-2 bg-opacity-25 rounded-full py-2 px-2 ",
                  {
                    "border-lime-500 bg-lime-500 text-lime-700 fade-in":
                      !envio,
                    "border-gray-500 bg-none text-gray-500 fade-in":
                      envio,
                  }
                )}
              >
                <TbTruckDelivery size={30} />
              </div>
              <span className="text-gray-500 text-xs underline hover:cursor-pointer">
                Envío nacional
              </span>
            </button>
            <button
              type="button"
              onClick={() => setEnvio(true)}
              className="flex flex-col justify-center items-center gap-2"
            >
              <div
                className={clsx(
                  "cursor-pointer border-2 bg-opacity-25 rounded-full py-2 px-2",
                  {
                    "border-lime-500 bg-lime-500 text-lime-700 fade-in":
                      envio,
                    "border-gray-500 bg-none text-gray-500 fade-in":
                      !envio,
                  }
                )}
              >
                <BsShop size={30} />
              </div>
              <span className="text-gray-500 text-xs underline hover:cursor-pointer">
                Recoger en tienda
              </span>
            </button>
          </div>
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
            // disabled={!isValid}
            className={
              "sm:w-1/2 flex items-center text-center justify-center w-full bg-gradient-to-r from-lime-700 to-lime-600 text-white font-semibold hover:cursor-pointer shadow-md  rounded-sm py-2"
            }
          >
            Ir a pagar
          </button>
        </div>
      </div>
    </form>
  );
};
