/*
  Warnings:

  - Added the required column `estado` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('nuevo', 'exhibicion');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "bateria" DOUBLE PRECISION,
ADD COLUMN     "estado" "Estado" NOT NULL;
