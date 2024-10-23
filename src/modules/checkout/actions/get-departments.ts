'use server'

import prisma from "@/lib/prisma";
// import { departamentos } from "@/seed/seed-departamentos";

export const getDepartments = async () => {
  try {
    const departamentos = await prisma.departamento.findMany({
      orderBy: {
        nombre: "asc",
      },
    });

    return departamentos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDepartmentById = async (id: number) => {
  try {
    const departamentoById = await prisma.departamento.findFirst({
      select: {
        nombre: true,
      },
      where: {
        id: id,
      },
    });

    return departamentoById;
  } catch (error) {
    console.log(error);
    throw new Error("Ha ocurrido un error al buscar el departamento");
  }
};
