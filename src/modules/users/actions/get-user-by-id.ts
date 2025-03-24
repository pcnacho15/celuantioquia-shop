import prisma from "@/lib/prisma";

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        municipio: {
          select: {
            nombre: true,
          },
        },
      },
    });

    if (!user) {
      return {
        ok: false,
        message: `Lo sentimos, no se encontró el usuario con id ${id}`,
      };
    }

    const { password, ...resto } = user;

    return {
      ok: true,
      user: resto,
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Ha ocurrido un error consultando el usuario: ${error}`);
  }
};
