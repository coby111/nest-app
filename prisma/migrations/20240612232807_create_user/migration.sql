/*
  Warnings:

  - You are about to drop the column `activive` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "activive",
ADD COLUMN     "active" BOOLEAN DEFAULT true;
