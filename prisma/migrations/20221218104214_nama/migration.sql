/*
  Warnings:

  - You are about to drop the column `maxExpanse` on the `ExpensePlan` table. All the data in the column will be lost.
  - Added the required column `maxExpense` to the `ExpensePlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ExpensePlan` DROP COLUMN `maxExpanse`,
    ADD COLUMN `maxExpense` INTEGER NOT NULL;
