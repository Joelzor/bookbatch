/*
  Warnings:

  - A unique constraint covering the columns `[batchId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_batchId_key" ON "Post"("batchId");
