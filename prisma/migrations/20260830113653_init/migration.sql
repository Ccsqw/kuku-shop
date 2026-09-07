-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `iconUrl` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` FLOAT NOT NULL,
    `originalPrice` FLOAT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `images` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `categoryId` VARCHAR(255) NOT NULL,
    `stock` VARCHAR(255) NOT NULL,
    `rating` FLOAT NOT NULL,
    `reviewCount` INTEGER NOT NULL,
    `brand` VARCHAR(255) NOT NULL,
    `createdAt` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `tag` VARCHAR(255) NOT NULL,
    `productId` INTEGER NOT NULL,
    `spec` VARCHAR(255) NOT NULL,
    `specValue` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `productId` INTEGER NOT NULL,
    `count` INTEGER NOT NULL,
    `price` FLOAT NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `userId` INTEGER NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer` (
    `a_id` INTEGER NOT NULL AUTO_INCREMENT,
    `q_id` INTEGER NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `helpful` INTEGER NULL,

    INDEX `que`(`q_id`),
    PRIMARY KEY (`a_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question` (
    `q_id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `question` VARCHAR(255) NULL,

    PRIMARY KEY (`q_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag` VARCHAR(255) NULL,
    `isDefault` TINYINT NULL,
    `name` VARCHAR(255) NULL,
    `tel` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderNo` VARCHAR(32) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `status` ENUM('pending', 'shipped', 'completed', 'cancelled') NOT NULL,
    `statusLabel` VARCHAR(32) NOT NULL,
    `total` FLOAT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `spec` VARCHAR(255) NOT NULL,
    `qty` INTEGER NOT NULL DEFAULT 1,
    `price` FLOAT NOT NULL,
    `recipient` VARCHAR(64) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `payment` VARCHAR(64) NOT NULL,
    `express` VARCHAR(128) NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `orders_orderNo_key`(`orderNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_timeline` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL DEFAULT 1,
    `title` VARCHAR(64) NOT NULL,
    `desc` VARCHAR(255) NOT NULL,
    `time` VARCHAR(255) NOT NULL,

    INDEX `user_timeline_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `que` FOREIGN KEY (`q_id`) REFERENCES `question`(`q_id`) ON DELETE CASCADE ON UPDATE RESTRICT;
