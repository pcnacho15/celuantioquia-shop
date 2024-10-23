/*
  Warnings:

  - You are about to drop the column `codigoPostal` on the `OrderAdress` table. All the data in the column will be lost.
  - Added the required column `departamento` to the `OrderAdress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipio` to the `OrderAdress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderAdress" DROP COLUMN "codigoPostal",
ADD COLUMN     "departamento" TEXT NOT NULL,
ADD COLUMN     "municipio" TEXT NOT NULL;
