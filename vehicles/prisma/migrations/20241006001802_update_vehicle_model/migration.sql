/*
  Warnings:

  - You are about to drop the column `cilindraje` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `fechaEntrada` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `fechaSalida` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `numPuertas` on the `Vehiculo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vehiculoID]` on the table `Carro` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vehiculoID]` on the table `Moto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carro" ADD COLUMN "numPuertas" INTEGER;

-- AlterTable
ALTER TABLE "Moto" ADD COLUMN "cilindraje" INTEGER;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehiculo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "atributo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Vehiculo" ("color", "id", "marca", "modelo", "placa", "tipo") SELECT "color", "id", "marca", "modelo", "placa", "tipo" FROM "Vehiculo";
DROP TABLE "Vehiculo";
ALTER TABLE "new_Vehiculo" RENAME TO "Vehiculo";
CREATE UNIQUE INDEX "Vehiculo_placa_key" ON "Vehiculo"("placa");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Carro_vehiculoID_key" ON "Carro"("vehiculoID");

-- CreateIndex
CREATE UNIQUE INDEX "Moto_vehiculoID_key" ON "Moto"("vehiculoID");
