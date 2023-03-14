/*
  Warnings:

  - You are about to drop the column `batchId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_batchId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "batchId";

-- CreateTable
CREATE TABLE "_BatchToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BatchToTag_AB_unique" ON "_BatchToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_BatchToTag_B_index" ON "_BatchToTag"("B");

-- AddForeignKey
ALTER TABLE "_BatchToTag" ADD CONSTRAINT "_BatchToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchToTag" ADD CONSTRAINT "_BatchToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
