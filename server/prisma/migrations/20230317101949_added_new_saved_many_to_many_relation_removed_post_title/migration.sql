/*
  Warnings:

  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "title";

-- CreateTable
CREATE TABLE "_BatchToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BatchToUser_AB_unique" ON "_BatchToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BatchToUser_B_index" ON "_BatchToUser"("B");

-- AddForeignKey
ALTER TABLE "_BatchToUser" ADD CONSTRAINT "_BatchToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchToUser" ADD CONSTRAINT "_BatchToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
