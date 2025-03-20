/*
  Warnings:

  - The `isPaid` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "StatusOrder" ADD VALUE 'rechazado';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isPaid",
ADD COLUMN     "isPaid" "StatusOrder" NOT NULL DEFAULT 'pendiente';
