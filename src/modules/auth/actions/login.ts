"use server";

import { signIn } from "@/utils";
import { AuthError } from "next-auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {

    
    console.log(Object.fromEntries(formData));
    await signIn("credentials", Object.fromEntries(formData));


  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
