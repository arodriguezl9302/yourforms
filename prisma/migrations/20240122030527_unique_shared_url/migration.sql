/*
  Warnings:

  - A unique constraint covering the columns `[sharedUrl]` on the table `forms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `forms_sharedUrl_key` ON `forms`(`sharedUrl`);
