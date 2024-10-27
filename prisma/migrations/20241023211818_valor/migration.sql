/*
  Warnings:

  - Added the required column `envio` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "envio" DOUBLE PRECISION NOT NULL;
