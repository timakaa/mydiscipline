/*
  Warnings:

  - You are about to drop the `Chart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chart" DROP CONSTRAINT "Chart_userId_fkey";

-- DropTable
DROP TABLE "Chart";

-- CreateTable
CREATE TABLE "charts" (
    "id" TEXT NOT NULL,
    "data" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "userId" TEXT NOT NULL,
    "miniChartSettings" JSONB NOT NULL,
    "chartSettings" JSONB NOT NULL,
    "globalSettings" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "charts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "charts" ADD CONSTRAINT "charts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
