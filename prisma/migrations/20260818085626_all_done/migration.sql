/*
  Warnings:

  - A unique constraint covering the columns `[boardId,position]` on the table `boardcolumns` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `boardcolumns` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'DELETED');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- DropIndex
DROP INDEX "tasks_boardId_idx";

-- DropIndex
DROP INDEX "tasks_columnId_idx";

-- AlterTable
ALTER TABLE "boardcolumns" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "position" INTEGER NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "priority" "TaskPriority" NOT NULL DEFAULT 'LOW';

-- CreateIndex
CREATE UNIQUE INDEX "boardcolumns_boardId_position_key" ON "boardcolumns"("boardId", "position");

-- CreateIndex
CREATE INDEX "tasks_deletedAt_idx" ON "tasks"("deletedAt");
