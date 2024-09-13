import prisma from "@/lib/prisma";

interface Props {
    category: string;
}

export const getCategoryWithId = async({ category }: Props) => {

    if (!category) return;

    const categoryDb = await prisma.category.findUnique({
      where: {
        name: category,
      },
    });

    return categoryDb;
}