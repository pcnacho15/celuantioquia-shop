-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('pendiente', 'pagado');

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "tax" SET DEFAULT 0,
ALTER COLUMN "envio" SET DEFAULT 0;
