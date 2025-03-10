"use server";

import { signIn } from "@/utils";


export async function googleSignIn() {
  await signIn("google");
}
