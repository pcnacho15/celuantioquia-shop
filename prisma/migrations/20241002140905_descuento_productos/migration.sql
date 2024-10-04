/*
  Warnings:

  - You are about to drop the column `priceCompare` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "priceCompare",
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0;
