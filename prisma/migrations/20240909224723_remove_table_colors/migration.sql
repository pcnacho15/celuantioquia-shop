/*
  Warnings:

  - You are about to drop the `ProductColors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductColors" DROP CONSTRAINT "ProductColors_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "colores" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "ProductColors";
