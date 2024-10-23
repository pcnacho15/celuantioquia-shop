/*
  Warnings:

  - Added the required column `celular` to the `OrderAdress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `OrderAdress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroDocumento` to the `OrderAdress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoDocumento` to the `OrderAdress` table without a default value. This is not possible if the table is not empty.
  - Made the column `direccion2` on table `OrderAdress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrderAdress" ADD COLUMN     "celular" TEXT NOT NULL,
ADD COLUMN     "correo" TEXT NOT NULL,
ADD COLUMN     "numeroDocumento" TEXT NOT NULL,
ADD COLUMN     "tipoDocumento" TEXT NOT NULL,
ALTER COLUMN "direccion2" SET NOT NULL;
