-- CreateTable
CREATE TABLE "Vehiculo" (
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

-- CreateTable
CREATE TABLE "Carro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vehiculoID" INTEGER NOT NULL,
    "numPuertas" INTEGER,
    CONSTRAINT "Carro_vehiculoID_fkey" FOREIGN KEY ("vehiculoID") REFERENCES "Vehiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Moto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vehiculoID" INTEGER NOT NULL,
    "cilindraje" INTEGER,
    CONSTRAINT "Moto_vehiculoID_fkey" FOREIGN KEY ("vehiculoID") REFERENCES "Vehiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_placa_key" ON "Vehiculo"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Carro_vehiculoID_key" ON "Carro"("vehiculoID");

-- CreateIndex
CREATE UNIQUE INDEX "Moto_vehiculoID_key" ON "Moto"("vehiculoID");
