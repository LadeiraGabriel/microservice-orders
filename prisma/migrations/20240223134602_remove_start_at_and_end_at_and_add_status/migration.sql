/*
  Warnings:

  - You are about to drop the column `endAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('finish', 'ontheWay', 'null');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "endAt",
DROP COLUMN "startAt",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'null';
