-- CreateTable
CREATE TABLE "Vehiculo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "fechaEntrada" DATETIME NOT NULL,
    "fechaSalida" DATETIME,
    "tipo" TEXT NOT NULL,
    "numPuertas" INTEGER,
    "cilindraje" INTEGER
);

-- CreateTable
CREATE TABLE "Carro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vehiculoID" INTEGER NOT NULL,
    CONSTRAINT "Carro_vehiculoID_fkey" FOREIGN KEY ("vehiculoID") REFERENCES "Vehiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Moto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vehiculoID" INTEGER NOT NULL,
    CONSTRAINT "Moto_vehiculoID_fkey" FOREIGN KEY ("vehiculoID") REFERENCES "Vehiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_placa_key" ON "Vehiculo"("placa");
