/*
  Warnings:

  - You are about to drop the column `envio` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "envio",
ADD COLUMN     "costo_envio" DOUBLE PRECISION DEFAULT 0;
