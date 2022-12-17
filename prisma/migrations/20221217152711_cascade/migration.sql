-- DropForeignKey
ALTER TABLE `Income` DROP FOREIGN KEY `Income_idMainBudget_fkey`;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_idMainBudget_fkey` FOREIGN KEY (`idMainBudget`) REFERENCES `MainBudget`(`id_main_budget`) ON DELETE CASCADE ON UPDATE CASCADE;
