-- DropForeignKey
ALTER TABLE `MainBudget` DROP FOREIGN KEY `MainBudget_userId_fkey`;

-- CreateTable
CREATE TABLE `ExpensePlan` (
    `id_expensePlan` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `maxExpanse` INTEGER NOT NULL,
    `remainderBudget` INTEGER NOT NULL,
    `idMainBudget` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_expensePlan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MainBudget` ADD CONSTRAINT `MainBudget_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExpensePlan` ADD CONSTRAINT `ExpensePlan_idMainBudget_fkey` FOREIGN KEY (`idMainBudget`) REFERENCES `MainBudget`(`id_main_budget`) ON DELETE CASCADE ON UPDATE CASCADE;
