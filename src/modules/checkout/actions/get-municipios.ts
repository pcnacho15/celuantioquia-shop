'use server'
import prisma from "@/lib/prisma";

export const getMunicipios = async () => {
  try {
    const municipios = await prisma.municipio.findMany({
      orderBy: {
        nombre: "asc",
      },
    });
    return municipios;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMunicipioById = async (id: number) => {
  try {
    const municipioById = await prisma.municipio.findFirst({
      select: {
        nombre: true,
      },
      where: {
        id: id,
      },
    });

    return municipioById;
  } catch (error) {
    console.log(error);
    throw new Error("Ha ocurrido un error al buscar el municipio");
  }
};
