"use server";

import { signIn } from "@/utils";
import { AuthError } from "next-auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'success'

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales incorrectas";
        default:
          return "Algo salió mal. Intente de nuevo";
      }
    }
    throw error;
  }
}


export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo iniciar sesión",
    };
  }
};