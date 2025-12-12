/*
  Warnings:

  - You are about to drop the column `score` on the `property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `property` DROP COLUMN `score`;

-- CreateTable
CREATE TABLE `AiReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyId` INTEGER NOT NULL,
    `score` INTEGER NULL,
    `priceRange` VARCHAR(191) NULL,
    `verdict` VARCHAR(191) NULL,
    `summary` VARCHAR(191) NULL,
    `builderRating` VARCHAR(191) NULL,
    `rentalYield` VARCHAR(191) NULL,
    `appreciationForecast` VARCHAR(191) NULL,
    `localityInsights` JSON NULL,
    `news` JSON NULL,

    UNIQUE INDEX `AiReport_propertyId_key`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AiReport` ADD CONSTRAINT `AiReport_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
