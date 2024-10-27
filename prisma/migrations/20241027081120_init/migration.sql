-- CreateTable
CREATE TABLE "BusinessIdea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessIdea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCanvas" (
    "id" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessCanvas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessModule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "canvasId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessPoint" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessPoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessIdea_name_key" ON "BusinessIdea"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCanvas_ideaId_key" ON "BusinessCanvas"("ideaId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessModule_canvasId_name_key" ON "BusinessModule"("canvasId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessPoint_moduleId_content_key" ON "BusinessPoint"("moduleId", "content");

-- AddForeignKey
ALTER TABLE "BusinessCanvas" ADD CONSTRAINT "BusinessCanvas_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "BusinessIdea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessModule" ADD CONSTRAINT "BusinessModule_canvasId_fkey" FOREIGN KEY ("canvasId") REFERENCES "BusinessCanvas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessPoint" ADD CONSTRAINT "BusinessPoint_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "BusinessModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
