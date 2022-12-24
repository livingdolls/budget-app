-- DropIndex
DROP INDEX `Credential_token_key` ON `Credential`;

-- AlterTable
ALTER TABLE `Credential` MODIFY `token` TEXT NOT NULL;
