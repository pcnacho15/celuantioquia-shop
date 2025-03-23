/*
  Warnings:

  - You are about to drop the column `departamento` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `municipio` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "departamento",
DROP COLUMN "municipio",
ADD COLUMN     "municipioId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "Municipio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
