/*
  Warnings:

  - You are about to drop the column `year` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "year",
ADD COLUMN     "pageCount" INTEGER,
ADD COLUMN     "yearPublished" TEXT;
