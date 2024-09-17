"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/modules/auth/actions/login";
import clsx from "clsx";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const LoginForm = () => {
  // const router = useRouter();
  const [state, dispatch] = useFormState(authenticate, undefined);
  
  useEffect(() => {
    if (state === "Success") {
      // router.replace("/");
      window.location.replace("/");
    }
  }, [state]);

  return (
    <form
      action={dispatch}
      className="flex flex-col"
    >
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <LoginButton />

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

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending,
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  );
}
