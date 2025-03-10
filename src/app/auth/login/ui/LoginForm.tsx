"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { authenticate } from "@/modules/auth";

import { IoInformationCircleOutline } from "react-icons/io5";
// import { useRouter } from "next/navigation";

export const LoginForm = () => {
  // const router = useRouter()

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  useEffect(() => {
    if (errorMessage === "success") {
      // router.replace("/");
      window.location.replace("/");
    }
  }, [errorMessage]);

  return (
    <form
      action={formAction}
      className="flex flex-col"
    >
      {errorMessage && errorMessage !== "success" && (
        <div
          className="flex h-8 items-center mb-2 space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <>
            <IoInformationCircleOutline className="h-5 w-5 text-red-500" />
            <p className="text-base text-red-500">{errorMessage}</p>
          </>
        </div>
      )}

      {/* <label htmlFor="email">Correo electrónico</label> */}
      <input
        className="px-5 py-2 border border-gray-400 rounded mb-5 w-full"
        type="email"
        name="email"
        placeholder="Correo"
      />

      {/* <label htmlFor="password">Contraseña</label> */}
      <input
        className="px-5 py-2 border border-gray-400 rounded mb-5"
        type="password"
        name="password"
        placeholder="Contraseña"
      />
      <button
        type="submit"
        className={clsx({
          "btn-primary": !isPending,
          "btn-disabled": isPending,
        })}
        disabled={isPending}
        // disabled={isPending}
      >
        Ingresar
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/register"
        className="btn-secondary text-center"
      >
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
