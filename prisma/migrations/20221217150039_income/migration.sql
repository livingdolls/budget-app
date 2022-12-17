/*
  Warnings:

  - The primary key for the `MainBudget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `MainBudget` DROP FOREIGN KEY `MainBudget_userId_fkey`;

-- AlterTable
ALTER TABLE `MainBudget` DROP PRIMARY KEY,
    MODIFY `id_main_budget` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_main_budget`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id_user` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_user`);

-- CreateTable
CREATE TABLE `Income` (
    `id_income` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `budget` INTEGER NOT NULL,
    `idMainBudget` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_income`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MainBudget` ADD CONSTRAINT `MainBudget_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_idMainBudget_fkey` FOREIGN KEY (`idMainBudget`) REFERENCES `MainBudget`(`id_main_budget`) ON DELETE RESTRICT ON UPDATE CASCADE;
