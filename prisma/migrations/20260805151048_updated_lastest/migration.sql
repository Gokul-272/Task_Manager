-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "workspaceinvites" (
    "id" UUID NOT NULL,
    "workspaceId" UUID NOT NULL,
    "invitedBy" UUID NOT NULL,
    "invitedUser" UUID NOT NULL,
    "status" "InviteStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspaceinvites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "workspaceinvites_workspaceId_idx" ON "workspaceinvites"("workspaceId");

-- CreateIndex
CREATE INDEX "workspaceinvites_invitedBy_idx" ON "workspaceinvites"("invitedBy");

-- CreateIndex
CREATE INDEX "workspaceinvites_invitedUser_idx" ON "workspaceinvites"("invitedUser");

-- CreateIndex
CREATE INDEX "workspaceinvites_status_idx" ON "workspaceinvites"("status");

-- CreateIndex
CREATE UNIQUE INDEX "workspaceinvites_workspaceId_invitedUser_key" ON "workspaceinvites"("workspaceId", "invitedUser");

-- AddForeignKey
ALTER TABLE "workspaceinvites" ADD CONSTRAINT "workspaceinvites_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceinvites" ADD CONSTRAINT "workspaceinvites_invitedBy_fkey" FOREIGN KEY ("invitedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaceinvites" ADD CONSTRAINT "workspaceinvites_invitedUser_fkey" FOREIGN KEY ("invitedUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
