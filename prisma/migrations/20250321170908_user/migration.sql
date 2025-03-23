-- AlterTable
ALTER TABLE "User" ADD COLUMN     "departamento" TEXT,
ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "direccion2" TEXT,
ADD COLUMN     "municipio" TEXT,
ADD COLUMN     "pais" TEXT NOT NULL DEFAULT 'Colombia';
