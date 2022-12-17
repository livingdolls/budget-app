/*
  Warnings:

  - You are about to drop the `Main_budget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Main_budget` DROP FOREIGN KEY `Main_budget_userId_fkey`;

-- DropTable
DROP TABLE `Main_budget`;

-- CreateTable
CREATE TABLE `MainBudget` (
    `id_main_budget` INTEGER NOT NULL AUTO_INCREMENT,
    `maxBudget` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `MainBudget_userId_key`(`userId`),
    PRIMARY KEY (`id_main_budget`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MainBudget` ADD CONSTRAINT `MainBudget_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
