// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers, Title } from "@/modules";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { TableUser } from "./ui/TableUser";

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/");
  }

  return (
    <>
      <Title title="Todas las órdenes" />

      <div className="mb-10">
        <TableUser users={users} />
      </div>
    </>
  );
}
