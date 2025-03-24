import { Title } from "@/modules";
import { getUserById } from "@/modules/users/actions/get-user-by-id";
import { auth, fontTitle } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FaUserAstronaut } from "react-icons/fa6";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const { ok, user } = await getUserById(session.user.id);

  if (!ok) {
    redirect("/");
  }

  return (
    <div className="px-36">
      <Title title="Perfil" />
      <div className="bg-white rounded-lg grid grid-cols-1">
        <div className="flex items-center gap-5 border rounded-xl p-5 m-10">
          {!user?.image ? (
            <div className="rounded-full bg-lime-600 p-3">
              <FaUserAstronaut
                size={30}
                className="text-white"
              />
            </div>
          ) : (
            <Image
              src={user?.image || ""}
              alt="imagen de perfil de usuario"
              width={60}
              height={60}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col">
            <span className="text-lg font-medium">{session.user.name}</span>
            <span className="text-sm capitalize text-gray-500">{`${user?.municipio?.nombre} - ${user?.pais}`}</span>
          </div>
        </div>
        <div className="border rounded-xl p-5 mx-10 mb-10">
          <span className={`${fontTitle.className} font-semibold`}>
            Información personal
          </span>
          <div>
            <div className="flex flex-col mt-3">
              <span className={`${fontTitle.className} text-sm text-gray-400`}>
                Nombre
              </span>
              <span className="text-base">{session.user.name}</span>
            </div>
            <div className="flex flex-col mt-3">
              <span className={`${fontTitle.className} text-sm text-gray-400`}>
                Correo
              </span>
              <div className="flex items-center gap-1">
                <span className="text-base">{user?.email} -</span>
                {user?.emailVerified ? (
                  <>
                    <span className="text-lime-600 text-sm pt-[1px]">
                      Verificado
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-red-600 text-sm pt-[1px]">
                      No verificado
                    </span>
                  </>
                )}
              </div>
            </div>
            <div>
              
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
