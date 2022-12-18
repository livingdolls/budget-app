/*
  Warnings:

  - You are about to drop the column `remainderBudget` on the `ExpensePlan` table. All the data in the column will be lost.
  - Added the required column `usage` to the `ExpensePlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ExpensePlan` DROP COLUMN `remainderBudget`,
    ADD COLUMN `usage` INTEGER NOT NULL;
