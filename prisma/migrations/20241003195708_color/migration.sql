/*
  Warnings:

  - You are about to drop the column `codeColor` on the `ProductImages` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `ProductImages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "color" TEXT;

-- AlterTable
ALTER TABLE "ProductImages" DROP COLUMN "codeColor",
DROP COLUMN "color";
