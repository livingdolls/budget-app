-- CreateTable
CREATE TABLE `Expense` (
    `id_expense` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `budget` INTEGER NOT NULL,
    `idExpensePlan` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_expense`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_idExpensePlan_fkey` FOREIGN KEY (`idExpensePlan`) REFERENCES `ExpensePlan`(`id_expensePlan`) ON DELETE CASCADE ON UPDATE CASCADE;
