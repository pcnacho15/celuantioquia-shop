import { auth } from "@/utils";
import { redirect } from "next/navigation";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100 px-5">
      {children}
    </main>
  );
}
