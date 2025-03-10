"use server"
import { signOut } from "@/utils";

export const logout = async () => {
  await signOut({ redirect: false });
};
