-- CreateTable
CREATE TABLE "Vehiculo" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "atributo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carro" (
    "id" SERIAL NOT NULL,
    "vehiculoID" INTEGER NOT NULL,
    "numPuertas" INTEGER,

    CONSTRAINT "Carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moto" (
    "id" SERIAL NOT NULL,
    "vehiculoID" INTEGER NOT NULL,
    "cilindraje" INTEGER,

    CONSTRAINT "Moto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_placa_key" ON "Vehiculo"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Carro_vehiculoID_key" ON "Carro"("vehiculoID");

-- CreateIndex
CREATE UNIQUE INDEX "Moto_vehiculoID_key" ON "Moto"("vehiculoID");

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_vehiculoID_fkey" FOREIGN KEY ("vehiculoID") REFERENCES "Vehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moto" ADD CONSTRAINT "Moto_vehiculoID_fkey" FOREIGN KEY ("vehiculoID") REFERENCES "Vehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;