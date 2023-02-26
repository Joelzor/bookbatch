/*
  Warnings:

  - You are about to drop the column `batchId` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_batchId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "batchId";

-- CreateTable
CREATE TABLE "_BatchToBook" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BatchToBook_AB_unique" ON "_BatchToBook"("A", "B");

-- CreateIndex
CREATE INDEX "_BatchToBook_B_index" ON "_BatchToBook"("B");

-- AddForeignKey
ALTER TABLE "_BatchToBook" ADD CONSTRAINT "_BatchToBook_A_fkey" FOREIGN KEY ("A") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchToBook" ADD CONSTRAINT "_BatchToBook_B_fkey" FOREIGN KEY ("B") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
