-- ==============================================================================
-- Babui Shop - Production MySQL Database Schema & Full Seed Catalog
-- Designed for cPanel / phpMyAdmin / MySQL 5.7+ / MySQL 8.0+ / MariaDB 10.3+
-- Character set: utf8mb4 / utf8mb4_unicode_ci
-- Generation Date: 2026-09-24
-- ==============================================================================
--
-- CPANEL / phpMyAdmin STEP-BY-STEP IMPORT INSTRUCTIONS:
-- 1. Log into your cPanel dashboard.
-- 2. Under "DATABASES", open "MySQL® Databases".
-- 3. Create a database (e.g. username_babuishop).
-- 4. Create a database user with a secure password and assign "ALL PRIVILEGES" to the database.
-- 5. Open "phpMyAdmin" from cPanel, and click your database name on the left sidebar.
-- 6. Click the "Import" tab on the top menu bar.
-- 7. Click "Choose File", select this file (cpanel_database.sql), and click "Import" or "Go".
-- 8. All 23 tables, relational schemas, admin credentials, products, categories,
--    and settings will be created immediately without any errors.
-- ==============================================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- Table structure for `system_settings`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `system_settings`;
CREATE TABLE IF NOT EXISTS `system_settings` (
  `id` int(11) NOT NULL,
  `siteName` varchar(255) DEFAULT 'Babui Shop',
  `siteTitle` varchar(255) DEFAULT NULL,
  `metaDescription` text DEFAULT NULL,
  `siteLogo` text DEFAULT NULL,
  `darkLogo` text DEFAULT NULL,
  `siteFavicon` text DEFAULT NULL,
  `siteEmail` varchar(255) DEFAULT NULL,
  `sitePhone` varchar(50) DEFAULT NULL,
  `siteWhatsApp` varchar(50) DEFAULT NULL,
  `siteAddress` text DEFAULT NULL,
  `businessHours` varchar(255) DEFAULT NULL,
  `googleMapsUrl` text DEFAULT NULL,
  `facebookUrl` text DEFAULT NULL,
  `instagramUrl` text DEFAULT NULL,
  `youtubeUrl` text DEFAULT NULL,
  `tiktokUrl` text DEFAULT NULL,
  `messengerUrl` text DEFAULT NULL,
  `shippingInsideDhaka` decimal(10,2) DEFAULT 70.00,
  `shippingOutsideDhaka` decimal(10,2) DEFAULT 130.00,
  `freeShippingThreshold` decimal(10,2) DEFAULT 1500.00,
  `currency` varchar(10) DEFAULT 'BDT',
  `currencySymbol` varchar(10) DEFAULT '৳',
  `taxPercentage` decimal(5,2) DEFAULT 0.00,
  `maintenanceMode` tinyint(1) DEFAULT 0,
  `defaultLanguage` varchar(10) DEFAULT 'bn',
  `announcementText` text DEFAULT NULL,
  `announcementEnabled` tinyint(1) DEFAULT 1,
  `headerHotlineEnabled` tinyint(1) DEFAULT 1,
  `headerWhatsAppEnabled` tinyint(1) DEFAULT 1,
  `headerWishlistEnabled` tinyint(1) DEFAULT 1,
  `headerCartEnabled` tinyint(1) DEFAULT 1,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `system_settings`
--
REPLACE INTO `system_settings` (`id`, `siteName`, `siteTitle`, `metaDescription`, `siteLogo`, `darkLogo`, `siteFavicon`, `siteEmail`, `sitePhone`, `siteWhatsApp`, `siteAddress`, `businessHours`, `googleMapsUrl`, `facebookUrl`, `instagramUrl`, `youtubeUrl`, `tiktokUrl`, `messengerUrl`, `shippingInsideDhaka`, `shippingOutsideDhaka`, `freeShippingThreshold`, `currency`, `currencySymbol`, `taxPercentage`, `maintenanceMode`, `defaultLanguage`, `announcementText`, `announcementEnabled`, `headerHotlineEnabled`, `headerWhatsAppEnabled`, `headerWishlistEnabled`, `headerCartEnabled`) VALUES
(1, 'Babui Shop', 'Pure & Natural', 'Buy 100% natural and pure honey, cold pressed mustard oil, traditional ghee, premium dates, and organic spices online in Bangladesh with home delivery.', '/uploads/1000095593-1790255343695.png', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=240&q=80', '/uploads/1000095593-1790255338873.png', 'contact@babuishop.com', '+8801629863029', '+8801629863029', 'Dhaka - 1219, Bangladesh', 'Saturday - Thursday: 9:00 AM - 9:00 PM', 'https://maps.google.com/?q=Rampura+Dhaka+Bangladesh', 'https://facebook.com/babuishopbd', 'https://instagram.com/babuishopbd', 'https://youtube.com/@babuishop', 'https://tiktok.com/@babuishop', 'https://m.me/babuishopbd', '70.00', '130.00', '0.00', 'BDT', '৳', '0.00', 0, 'bn', 'Free delivery across Bangladesh on orders over ৳1,500 • Customer Support: +8809642922922', 1, 1, 1, 1, 1);

-- ------------------------------------------------------------------------------
-- Table structure for `subcategories` and `categories`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `subcategories`;
DROP TABLE IF EXISTS `categories`;

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `imageUrl` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `bannerUrl` text DEFAULT NULL,
  `sortOrder` int(11) DEFAULT 0,
  `isFeatured` tinyint(1) DEFAULT 1,
  `isActive` tinyint(1) DEFAULT 1,
  `metaTitle` varchar(255) DEFAULT NULL,
  `metaDescription` text DEFAULT NULL,
  `metaKeywords` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `imageUrl` text DEFAULT NULL,
  `sortOrder` int(11) DEFAULT 0,
  `isActive` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `categories` & `subcategories`
REPLACE INTO `categories` (`id`, `name`, `slug`, `description`, `imageUrl`, `icon`, `bannerUrl`, `sortOrder`, `isFeatured`, `isActive`, `metaTitle`, `metaDescription`, `metaKeywords`) VALUES
(2, 'Honey', 'honey', 'Pure natural wild flower and Sundarban mangrove honey.', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80', 'Hexagon', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80', 2, 1, 1, NULL, NULL, NULL);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(201, 2, 'Sundarban Honey', 'sundarban-honey', 'Wild natural mangrove forest honey', NULL, 1, 1);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(202, 2, 'Black Seed Honey', 'black-seed-honey', 'Kalojira flower infused raw honey', NULL, 2, 1);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(203, 2, 'Lychee Flower Honey', 'lychee-flower-honey', 'Delicate and aromatic floral honey', NULL, 3, 1);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(204, 2, 'African Organic Honey', 'african-organic-honey', 'Certified wild dark exotic honey', NULL, 4, 1);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(205, 2, 'Sidr Honey', 'sidr-honey', 'Premium Kashmiri and Yemeni Sidr honey', NULL, 5, 1);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(206, 2, 'Honeycomb', 'honeycomb', '100\\% natural edible raw honeycomb', NULL, 6, 1);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(207, 2, 'Sachet Box', 'sachet-box', 'Travel-friendly daily honey sachets', NULL, 7, 1);
REPLACE INTO `categories` (`id`, `name`, `slug`, `description`, `imageUrl`, `icon`, `bannerUrl`, `sortOrder`, `isFeatured`, `isActive`, `metaTitle`, `metaDescription`, `metaKeywords`) VALUES
(3, 'Dates', 'dates', 'Handpicked premium Madinah and Middle Eastern dates.', 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=400&q=80', 'Sparkles', 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80', 3, 1, 1, NULL, NULL, NULL);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(301, 3, 'Ajwa', 'ajwa', 'Authentic Madinah holy Ajwa dates', NULL, 1, 1);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(302, 3, 'Medjool', 'medjool', 'Jumbo King Medjool juicy dates', NULL, 2, 1);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(303, 3, 'Sukkari', 'sukkari', 'Crisp and golden sweet Sukkari dates', NULL, 3, 1);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(304, 3, 'Mabroom', 'mabroom', 'Slender chewy sweet Mabroom dates', NULL, 4, 1);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(305, 3, 'Safawi / Kalmi', 'safawi-kalmi', 'Nutritious dark chewy Safawi dates', NULL, 5, 1);
REPLACE INTO `categories` (`id`, `name`, `slug`, `description`, `imageUrl`, `icon`, `bannerUrl`, `sortOrder`, `isFeatured`, `isActive`, `metaTitle`, `metaDescription`, `metaKeywords`) VALUES
(4, 'Spices', 'spices', 'Freshly ground traditional whole and powdered spices.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80', 'Flame', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80', 4, 1, 1, NULL, NULL, NULL);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(401, 4, 'Whole Spices', 'whole-spices', 'Cardamom, cinnamon, cloves, cumin', NULL, 1, 1);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(402, 4, 'Basic Spices', 'basic-spices', 'Chili, turmeric, coriander, cumin powder', NULL, 2, 1);
REPLACE INTO `subcategories` (`id`, `categoryId`, `name`, `slug`, `description`, `imageUrl`, `sortOrder`, `isActive`) VALUES
(403, 4, 'Mixed Spices', 'mixed-spices', 'Kala Bhuna, biryani, meat curry blends', NULL, 3, 1);
REPLACE INTO `categories` (`id`, `name`, `slug`, `description`, `imageUrl`, `icon`, `bannerUrl`, `sortOrder`, `isFeatured`, `isActive`, `metaTitle`, `metaDescription`, `metaKeywords`) VALUES
(5, 'Nuts & Seeds', 'nuts-seeds', 'Crunchy premium nuts and nutrient-rich organic seeds.', 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=400&q=80', 'Nut', '', 5, 1, 1, NULL, NULL, NULL);
REPLACE INTO `categories` (`id`, `name`, `slug`, `description`, `imageUrl`, `icon`, `bannerUrl`, `sortOrder`, `isFeatured`, `isActive`, `metaTitle`, `metaDescription`, `metaKeywords`) VALUES
(6, 'Beverage', 'beverage', 'Healthy teas, green tea matcha, and nutritious herbal drinks.', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', 'Coffee', '', 6, 1, 1, NULL, NULL, NULL);
REPLACE INTO `categories` (`id`, `name`, `slug`, `description`, `imageUrl`, `icon`, `bannerUrl`, `sortOrder`, `isFeatured`, `isActive`, `metaTitle`, `metaDescription`, `metaKeywords`) VALUES
(7, 'Rice', 'rice', 'Aromatic basmati, jasmine, and traditional fine rice.', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80', 'Wheat', '', 7, 1, 1, NULL, NULL, NULL);
REPLACE INTO `categories` (`id`, `name`, `slug`, `description`, `imageUrl`, `icon`, `bannerUrl`, `sortOrder`, `isFeatured`, `isActive`, `metaTitle`, `metaDescription`, `metaKeywords`) VALUES
(8, 'Flours & Lentils', 'flours-lentils', 'Stone ground whole wheat atta, rice flour, and pure lentils.', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', 'Cookie', '', 8, 1, 1, NULL, NULL, NULL);
REPLACE INTO `categories` (`id`, `name`, `slug`, `description`, `imageUrl`, `icon`, `bannerUrl`, `sortOrder`, `isFeatured`, `isActive`, `metaTitle`, `metaDescription`, `metaKeywords`) VALUES
(9, 'Organic', 'organic', '100\\% certified organic foods and pure natural ingredients.', 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80', 'Leaf', '', 9, 1, 1, NULL, NULL, NULL);
REPLACE INTO `categories` (`id`, `name`, `slug`, `description`, `imageUrl`, `icon`, `bannerUrl`, `sortOrder`, `isFeatured`, `isActive`, `metaTitle`, `metaDescription`, `metaKeywords`) VALUES
(10, 'Functional Food', 'functional-food', 'Daily superfoods, spirulina, and health supplements.', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80', 'ShieldCheck', '', 10, 1, 1, NULL, NULL, NULL);

-- ------------------------------------------------------------------------------
-- Table structure for `brands`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `logoUrl` text DEFAULT NULL,
  `bannerUrl` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `websiteUrl` text DEFAULT NULL,
  `sortOrder` int(11) DEFAULT 0,
  `isActive` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `brands`
REPLACE INTO `brands` (`id`, `name`, `slug`, `logoUrl`, `bannerUrl`, `description`, `websiteUrl`, `sortOrder`, `isActive`) VALUES
(1, 'Babui Shop', 'babuishop', NULL, NULL, 'Flagship house brand delivering direct from farmers and beekeepers.', NULL, 1, 1);
REPLACE INTO `brands` (`id`, `name`, `slug`, `logoUrl`, `bannerUrl`, `description`, `websiteUrl`, `sortOrder`, `isActive`) VALUES
(2, 'Glarvest', 'glarvest', NULL, NULL, 'Specialized cold pressed organic seed oils.', NULL, 2, 1);
REPLACE INTO `brands` (`id`, `name`, `slug`, `logoUrl`, `bannerUrl`, `description`, `websiteUrl`, `sortOrder`, `isActive`) VALUES
(3, 'Khejuri', 'khejuri', NULL, NULL, 'Direct importer of authentic holy Madinah dates.', NULL, 3, 1);
REPLACE INTO `brands` (`id`, `name`, `slug`, `logoUrl`, `bannerUrl`, `description`, `websiteUrl`, `sortOrder`, `isActive`) VALUES
(4, 'Shosti food', 'shosti-food', NULL, NULL, 'Traditional heritage recipes and stone-milled spices.', NULL, 4, 1);
REPLACE INTO `brands` (`id`, `name`, `slug`, `logoUrl`, `bannerUrl`, `description`, `websiteUrl`, `sortOrder`, `isActive`) VALUES
(5, 'Honeyraj', 'honeyraj', NULL, NULL, 'Specialist natural honey brand from wild Sundarban hives.', NULL, 5, 1);
REPLACE INTO `brands` (`id`, `name`, `slug`, `logoUrl`, `bannerUrl`, `description`, `websiteUrl`, `sortOrder`, `isActive`) VALUES
(6, 'Babui Shop', 'babui-shop', NULL, NULL, 'Artisanal organic pantry collections.', NULL, 6, 1);

-- ------------------------------------------------------------------------------
-- Table structure for `products`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `sku` varchar(100) NOT NULL,
  `barcode` varchar(100) DEFAULT NULL,
  `brandId` int(11) DEFAULT NULL,
  `categoryId` int(11) NOT NULL,
  `subcategoryId` int(11) DEFAULT NULL,
  `shortDescription` text DEFAULT NULL,
  `fullDescription` longtext DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `discountPrice` decimal(10,2) DEFAULT NULL,
  `discountPercentage` decimal(5,2) DEFAULT NULL,
  `costPrice` decimal(10,2) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `lowStockThreshold` int(11) DEFAULT 5,
  `weight` varchar(50) DEFAULT NULL,
  `unit` varchar(50) DEFAULT 'kg',
  `videoUrl` text DEFAULT NULL,
  `imageUrl` text NOT NULL,
  `galleryImages` longtext DEFAULT NULL,
  `variants` longtext DEFAULT NULL,
  `isNewArrival` tinyint(1) DEFAULT 0,
  `isBestSelling` tinyint(1) DEFAULT 0,
  `isTrending` tinyint(1) DEFAULT 0,
  `isFeatured` tinyint(1) DEFAULT 0,
  `isBestCollection` tinyint(1) DEFAULT 0,
  `isOffered` tinyint(1) DEFAULT 0,
  `isFreeDelivery` tinyint(1) DEFAULT 0,
  `isPreOrder` tinyint(1) DEFAULT 0,
  `isOrganic` tinyint(1) DEFAULT 0,
  `isFlashSale` tinyint(1) DEFAULT 0,
  `hasLimitedTimeOffer` tinyint(1) DEFAULT 0,
  `offerEndsAt` timestamp NULL DEFAULT NULL,
  `status` enum('active','draft','inactive') DEFAULT 'active',
  `metaTitle` varchar(255) DEFAULT NULL,
  `metaDescription` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `brandId` (`brandId`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `products`
REPLACE INTO `products` (`id`, `name`, `slug`, `sku`, `barcode`, `brandId`, `categoryId`, `subcategoryId`, `shortDescription`, `fullDescription`, `price`, `discountPrice`, `discountPercentage`, `costPrice`, `stock`, `lowStockThreshold`, `weight`, `unit`, `videoUrl`, `imageUrl`, `galleryImages`, `variants`, `isNewArrival`, `isBestSelling`, `isTrending`, `isFeatured`, `isBestCollection`, `isOffered`, `isFreeDelivery`, `isPreOrder`, `isOrganic`, `isFlashSale`, `hasLimitedTimeOffer`, `offerEndsAt`, `status`, `metaTitle`, `metaDescription`) VALUES
(1, 'Black Seed Honey 1kg', 'black-seed-honey-1kg', 'HNY-BS-01', '894123450001', 1, 2, 202, '100\\% natural black seed infused flower honey.', 'Harvested during the kalojira blooming season in Bangladesh. High medicinal properties, rich enzymes, dark amber texture, and rich soothing floral notes.', 1600, 1500, 6.25, 1100, 50, 10, '1.0', 'kg', NULL, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80', '["https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80","https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=600&q=80"]', '[{"id":"v1-1","name":"500g","sku":"HNY-BS-500G","price":900,"salePrice":846,"stock":40,"weight":"0.5kg"},{"id":"v1-2","name":"1kg","sku":"HNY-BS-1KG","price":1600,"salePrice":1500,"stock":50,"weight":"1.0kg"}]', 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, '2026-09-27T05:30:56.000Z', 'active', NULL, NULL);
REPLACE INTO `products` (`id`, `name`, `slug`, `sku`, `barcode`, `brandId`, `categoryId`, `subcategoryId`, `shortDescription`, `fullDescription`, `price`, `discountPrice`, `discountPercentage`, `costPrice`, `stock`, `lowStockThreshold`, `weight`, `unit`, `videoUrl`, `imageUrl`, `galleryImages`, `variants`, `isNewArrival`, `isBestSelling`, `isTrending`, `isFeatured`, `isBestCollection`, `isOffered`, `isFreeDelivery`, `isPreOrder`, `isOrganic`, `isFlashSale`, `hasLimitedTimeOffer`, `offerEndsAt`, `status`, `metaTitle`, `metaDescription`) VALUES
(2, 'Sundarban Honey 1kg', 'sundarban-honey-1kg', 'HNY-SUN-01', '894123450002', 5, 2, 201, 'Directly harvested from wild beehives in the Sundarban mangrove forest.', 'Collected by traditional mouwals (honey hunters) deep inside the wild Sundarbans. Free from added sugars, high natural pollen, and authentic pungent forest aroma.', 2500, NULL, NULL, 1800, 30, 5, '1.0', 'kg', NULL, 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=600&q=80', '[]', '[]', 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, NULL, 'active', NULL, NULL);
REPLACE INTO `products` (`id`, `name`, `slug`, `sku`, `barcode`, `brandId`, `categoryId`, `subcategoryId`, `shortDescription`, `fullDescription`, `price`, `discountPrice`, `discountPercentage`, `costPrice`, `stock`, `lowStockThreshold`, `weight`, `unit`, `videoUrl`, `imageUrl`, `galleryImages`, `variants`, `isNewArrival`, `isBestSelling`, `isTrending`, `isFeatured`, `isBestCollection`, `isOffered`, `isFreeDelivery`, `isPreOrder`, `isOrganic`, `isFlashSale`, `hasLimitedTimeOffer`, `offerEndsAt`, `status`, `metaTitle`, `metaDescription`) VALUES
(3, 'Honey Nuts 800gm', 'honey-nuts-800gm', 'HNY-NUT-01', '894123450003', 1, 2, 207, 'Cashews, almonds, pistachios soaked in pure honey.', 'A power-packed healthy snack containing premium imported California almonds, crunchy cashews, pistachios, walnuts, pumpkin seeds, and pure wildflower honey.', 1200, 1056, 12, 750, 25, 8, '800', 'g', NULL, 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80', '[]', '[]', 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, '2026-09-25T05:30:56.000Z', 'active', NULL, NULL);
REPLACE INTO `products` (`id`, `name`, `slug`, `sku`, `barcode`, `brandId`, `categoryId`, `subcategoryId`, `shortDescription`, `fullDescription`, `price`, `discountPrice`, `discountPercentage`, `costPrice`, `stock`, `lowStockThreshold`, `weight`, `unit`, `videoUrl`, `imageUrl`, `galleryImages`, `variants`, `isNewArrival`, `isBestSelling`, `isTrending`, `isFeatured`, `isBestCollection`, `isOffered`, `isFreeDelivery`, `isPreOrder`, `isOrganic`, `isFlashSale`, `hasLimitedTimeOffer`, `offerEndsAt`, `status`, `metaTitle`, `metaDescription`) VALUES
(4, 'African Organic Wild Honey 500g', 'african-organic-wild-honey-500g', 'HNY-AFR-01', NULL, 1, 2, 204, NULL, NULL, 1200, 1056, 12, 800, 20, 5, '500', 'g', NULL, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80', '[]', '[]', 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, NULL, 'active', NULL, NULL);
REPLACE INTO `products` (`id`, `name`, `slug`, `sku`, `barcode`, `brandId`, `categoryId`, `subcategoryId`, `shortDescription`, `fullDescription`, `price`, `discountPrice`, `discountPercentage`, `costPrice`, `stock`, `lowStockThreshold`, `weight`, `unit`, `videoUrl`, `imageUrl`, `galleryImages`, `variants`, `isNewArrival`, `isBestSelling`, `isTrending`, `isFeatured`, `isBestCollection`, `isOffered`, `isFreeDelivery`, `isPreOrder`, `isOrganic`, `isFlashSale`, `hasLimitedTimeOffer`, `offerEndsAt`, `status`, `metaTitle`, `metaDescription`) VALUES
(5, 'Natural Honeycomb 1kg', 'natural-honeycomb-1kg', 'HNY-CMB-01', NULL, 5, 2, 206, NULL, NULL, 3000, 2700, 10, 2000, 15, 4, '1.0', 'kg', NULL, 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=600&q=80', '[]', '[]', 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, NULL, 'active', NULL, NULL);
REPLACE INTO `products` (`id`, `name`, `slug`, `sku`, `barcode`, `brandId`, `categoryId`, `subcategoryId`, `shortDescription`, `fullDescription`, `price`, `discountPrice`, `discountPercentage`, `costPrice`, `stock`, `lowStockThreshold`, `weight`, `unit`, `videoUrl`, `imageUrl`, `galleryImages`, `variants`, `isNewArrival`, `isBestSelling`, `isTrending`, `isFeatured`, `isBestCollection`, `isOffered`, `isFreeDelivery`, `isPreOrder`, `isOrganic`, `isFlashSale`, `hasLimitedTimeOffer`, `offerEndsAt`, `status`, `metaTitle`, `metaDescription`) VALUES
(9, 'Deshi Mustard Oil 5 liter', 'deshi-mustard-oil-5-liter', 'OIL-MST-05', '894123450009', 1, 1, 101, 'Cold-pressed traditional wood-ghani mustard oil.', 'Extracted using low-temperature traditional mechanical pressing. Intense aroma, natural pungency, and zero chemical refining.', 1700, 1650, 2.94, 1350, 40, 10, '5.0', 'L', NULL, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80', '[]', '[{"id":"v9-1","name":"1 Liter","sku":"OIL-MST-1L","price":360,"salePrice":350,"stock":60,"weight":"1L"},{"id":"v9-2","name":"5 Liter","sku":"OIL-MST-5L","price":1700,"salePrice":1650,"stock":40,"weight":"5L"}]', 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, '2026-09-23T05:30:56.000Z', 'active', NULL, NULL);
REPLACE INTO `products` (`id`, `name`, `slug`, `sku`, `barcode`, `brandId`, `categoryId`, `subcategoryId`, `shortDescription`, `fullDescription`, `price`, `discountPrice`, `discountPercentage`, `costPrice`, `stock`, `lowStockThreshold`, `weight`, `unit`, `videoUrl`, `imageUrl`, `galleryImages`, `variants`, `isNewArrival`, `isBestSelling`, `isTrending`, `isFeatured`, `isBestCollection`, `isOffered`, `isFreeDelivery`, `isPreOrder`, `isOrganic`, `isFlashSale`, `hasLimitedTimeOffer`, `offerEndsAt`, `status`, `metaTitle`, `metaDescription`) VALUES
(10, 'Gawa Ghee 1kg', 'gawa-ghee-1kg', 'OIL-GHEE-01', '894123450010', 1, 1, 102, 'Crafted from pure cow milk butter using slow cooking methods.', 'Granular golden ghee made with traditional boiling and clarification. Intense nutty fragrance and rich taste for everyday cooking and celebrations.', 1800, NULL, NULL, 1300, 35, 8, '1.0', 'kg', NULL, 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80', '[]', '[{"id":"v10-1","name":"500gm","sku":"OIL-GHEE-500G","price":950,"stock":50,"weight":"0.5kg"},{"id":"v10-2","name":"1kg","sku":"OIL-GHEE-1KG","price":1800,"stock":35,"weight":"1.0kg"}]', 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, NULL, 'active', NULL, NULL);
REPLACE INTO `products` (`id`, `name`, `slug`, `sku`, `barcode`, `brandId`, `categoryId`, `subcategoryId`, `shortDescription`, `fullDescription`, `price`, `discountPrice`, `discountPercentage`, `costPrice`, `stock`, `lowStockThreshold`, `weight`, `unit`, `videoUrl`, `imageUrl`, `galleryImages`, `variants`, `isNewArrival`, `isBestSelling`, `isTrending`, `isFeatured`, `isBestCollection`, `isOffered`, `isFreeDelivery`, `isPreOrder`, `isOrganic`, `isFlashSale`, `hasLimitedTimeOffer`, `offerEndsAt`, `status`, `metaTitle`, `metaDescription`) VALUES
(13, 'Ajwa Premium Fresh Dates 1kg', 'ajwa-premium-fresh-dates-1kg', 'DAT-AJW-01', '894123450013', 3, 3, 301, 'Authentic Madinah holy Ajwa dates, soft, dark, and nutrient rich.', 'Directly imported from orchards in Al-Madinah Al-Munawwarah. Handpicked, sorted, and vacuum packed to lock in natural moisture and sweetness.', 2500, 2000, 20, 1500, 25, 6, '1.0', 'kg', NULL, 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80', '[]', '[{"id":"v13-1","name":"500gm","sku":"DAT-AJW-500G","price":1500,"salePrice":1200,"stock":30,"weight":"0.5kg"},{"id":"v13-2","name":"1kg","sku":"DAT-AJW-1KG","price":2500,"salePrice":2000,"stock":25,"weight":"1.0kg"}]', 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, '2026-09-24T05:30:56.000Z', 'active', NULL, NULL);
REPLACE INTO `products` (`id`, `name`, `slug`, `sku`, `barcode`, `brandId`, `categoryId`, `subcategoryId`, `shortDescription`, `fullDescription`, `price`, `discountPrice`, `discountPercentage`, `costPrice`, `stock`, `lowStockThreshold`, `weight`, `unit`, `videoUrl`, `imageUrl`, `galleryImages`, `variants`, `isNewArrival`, `isBestSelling`, `isTrending`, `isFeatured`, `isBestCollection`, `isOffered`, `isFreeDelivery`, `isPreOrder`, `isOrganic`, `isFlashSale`, `hasLimitedTimeOffer`, `offerEndsAt`, `status`, `metaTitle`, `metaDescription`) VALUES
(16, 'Egyptian Medjool Large 1kg', 'egyptian-medjool-large-1kg', 'DAT-MDJ-01', NULL, 3, 3, 302, 'King of dates, large plump Medjool dates full of natural honey.', 'Caramel-like texture, juicy and succulent flesh. Large caliber grading.', 2800, NULL, NULL, 2100, 15, 5, '1.0', 'kg', NULL, 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80', '[]', '[]', 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, NULL, 'active', NULL, NULL);
REPLACE INTO `products` (`id`, `name`, `slug`, `sku`, `barcode`, `brandId`, `categoryId`, `subcategoryId`, `shortDescription`, `fullDescription`, `price`, `discountPrice`, `discountPercentage`, `costPrice`, `stock`, `lowStockThreshold`, `weight`, `unit`, `videoUrl`, `imageUrl`, `galleryImages`, `variants`, `isNewArrival`, `isBestSelling`, `isTrending`, `isFeatured`, `isBestCollection`, `isOffered`, `isFreeDelivery`, `isPreOrder`, `isOrganic`, `isFlashSale`, `hasLimitedTimeOffer`, `offerEndsAt`, `status`, `metaTitle`, `metaDescription`) VALUES
(19, 'Kala Bhuna Masala 500gm', 'kala-bhuna-masala-500gm', 'SPC-KLB-01', NULL, 4, 4, 403, 'Authentic Chittagong Kala Bhuna spice blend.', 'Hand-roasted cardamom, black pepper, star anise, nutmeg, and aromatic bay leaves ground to secret heritage proportions.', 500, 450, 10, 300, 40, 10, '500', 'g', NULL, 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80', '[]', '[]', 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, NULL, 'active', NULL, NULL);

-- ------------------------------------------------------------------------------
-- Table structure for `combos`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `combos`;
CREATE TABLE IF NOT EXISTS `combos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `originalPrice` decimal(10,2) NOT NULL,
  `savingsPercentage` decimal(5,2) NOT NULL,
  `imageUrl` text DEFAULT NULL,
  `productIds` longtext NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `combos`

-- ------------------------------------------------------------------------------
-- Table structure for `sliders`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `sliders`;
CREATE TABLE IF NOT EXISTS `sliders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `buttonText` varchar(100) DEFAULT NULL,
  `buttonUrl` varchar(255) DEFAULT NULL,
  `desktopImageUrl` text NOT NULL,
  `mobileImageUrl` text DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `priority` int(11) DEFAULT 0,
  `isActive` tinyint(1) DEFAULT 1,
  `startDate` varchar(50) DEFAULT NULL,
  `endDate` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `sliders`
REPLACE INTO `sliders` (`id`, `title`, `subtitle`, `buttonText`, `buttonUrl`, `desktopImageUrl`, `mobileImageUrl`, `categoryId`, `productId`, `priority`, `isActive`, `startDate`, `endDate`) VALUES
(1, '100\\% Pure & Natural Food', 'Direct from wild Sundarban hives & traditional oil mills to your doorstep.', 'Shop Natural Honey', '/category/2', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80', 2, NULL, 1, 1, NULL, NULL);
REPLACE INTO `sliders` (`id`, `title`, `subtitle`, `buttonText`, `buttonUrl`, `desktopImageUrl`, `mobileImageUrl`, `categoryId`, `productId`, `priority`, `isActive`, `startDate`, `endDate`) VALUES
(2, 'Cold-Pressed Wood-Ghani Mustard Oil', 'Unmatched pungency, unrefined golden purity, and natural essential fatty acids.', 'Order Cooking Essentials', '/category/1', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80', 1, NULL, 2, 1, NULL, NULL);
REPLACE INTO `sliders` (`id`, `title`, `subtitle`, `buttonText`, `buttonUrl`, `desktopImageUrl`, `mobileImageUrl`, `categoryId`, `productId`, `priority`, `isActive`, `startDate`, `endDate`) VALUES
(3, 'Holy Madinah Fresh Ajwa & Medjool', 'Rich, succulent, caramel-soft dates hand-picked for your family\'s daily vitality.', 'Explore Premium Dates', '/category/3', 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80', 3, NULL, 3, 1, NULL, NULL);

-- ------------------------------------------------------------------------------
-- Table structure for `homepage_sections`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `homepage_sections`;
CREATE TABLE IF NOT EXISTS `homepage_sections` (
  `id` varchar(50) NOT NULL,
  `sectionKey` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `isEnabled` tinyint(1) DEFAULT 1,
  `sortOrder` int(11) DEFAULT 0,
  `productLimit` int(11) DEFAULT 6,
  `categoryId` int(11) DEFAULT NULL,
  `background` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `homepage_sections`
REPLACE INTO `homepage_sections` (`id`, `sectionKey`, `title`, `subtitle`, `isEnabled`, `sortOrder`, `productLimit`, `categoryId`, `background`) VALUES
('sec_hero', 'hero_slider', 'Hero Slider', NULL, 1, 1, 5, NULL, NULL);
REPLACE INTO `homepage_sections` (`id`, `sectionKey`, `title`, `subtitle`, `isEnabled`, `sortOrder`, `productLimit`, `categoryId`, `background`) VALUES
('sec_feat_cat', 'featured_categories', 'Featured Categories', NULL, 1, 2, 10, NULL, NULL);
REPLACE INTO `homepage_sections` (`id`, `sectionKey`, `title`, `subtitle`, `isEnabled`, `sortOrder`, `productLimit`, `categoryId`, `background`) VALUES
('sec_flash', 'flash_sale', 'Flash Sale & Limited Offers', NULL, 1, 3, 4, NULL, 'linear-gradient(135deg, #fff7ed 0\\%, #ffedd5 100\\%)');
REPLACE INTO `homepage_sections` (`id`, `sectionKey`, `title`, `subtitle`, `isEnabled`, `sortOrder`, `productLimit`, `categoryId`, `background`) VALUES
('sec_top_sell', 'top_selling', 'Top Selling Products', 'Our community favorites loved by over 10,000 families', 1, 4, 8, NULL, NULL);
REPLACE INTO `homepage_sections` (`id`, `sectionKey`, `title`, `subtitle`, `isEnabled`, `sortOrder`, `productLimit`, `categoryId`, `background`) VALUES
('sec_brands', 'brands_showcase', 'Our Trusted Brands', NULL, 1, 5, 6, NULL, NULL);
REPLACE INTO `homepage_sections` (`id`, `sectionKey`, `title`, `subtitle`, `isEnabled`, `sortOrder`, `productLimit`, `categoryId`, `background`) VALUES
('sec_combos', 'combos', 'Exclusive Combo Deals', 'Bundle and save up to 15\\% on daily kitchen staples', 1, 6, 4, NULL, NULL);
REPLACE INTO `homepage_sections` (`id`, `sectionKey`, `title`, `subtitle`, `isEnabled`, `sortOrder`, `productLimit`, `categoryId`, `background`) VALUES
('sec_honey', 'category_honey', 'All Natural Honey', 'Pure floral, black seed and wild mangrove extracts', 1, 7, 6, 2, NULL);
REPLACE INTO `homepage_sections` (`id`, `sectionKey`, `title`, `subtitle`, `isEnabled`, `sortOrder`, `productLimit`, `categoryId`, `background`) VALUES
('sec_dates', 'category_dates', 'Premium Dates', 'Ajwa, Medjool, and Sukkari directly imported', 1, 8, 6, 3, NULL);
REPLACE INTO `homepage_sections` (`id`, `sectionKey`, `title`, `subtitle`, `isEnabled`, `sortOrder`, `productLimit`, `categoryId`, `background`) VALUES
('sec_oil', 'category_oil', 'Cooking Essentials', 'Cold-pressed mustard oil and slow-churned gawa ghee', 1, 9, 6, 1, NULL);

-- ------------------------------------------------------------------------------
-- Table structure for `flash_sales`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `flash_sales`;
CREATE TABLE IF NOT EXISTS `flash_sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `startDate` varchar(50) DEFAULT NULL,
  `endDate` varchar(50) DEFAULT NULL,
  `startTime` varchar(20) DEFAULT NULL,
  `endTime` varchar(20) DEFAULT NULL,
  `productIds` longtext NOT NULL,
  `discountPercentage` decimal(5,2) DEFAULT 0.00,
  `quantityLimit` int(11) DEFAULT 0,
  `isActive` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `flash_sales`
REPLACE INTO `flash_sales` (`id`, `name`, `startDate`, `endDate`, `startTime`, `endTime`, `productIds`, `discountPercentage`, `quantityLimit`, `isActive`) VALUES
(1, 'Weekend Mega Flash Sale', '2026-09-20', '2026-09-23', '00:00', '23:59', '[1,3,9,13]', 20, 100, 1);

-- ------------------------------------------------------------------------------
-- Table structure for `coupons`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `coupons`;
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `discountType` enum('percentage','fixed') DEFAULT 'percentage',
  `discountValue` decimal(10,2) NOT NULL,
  `minOrderAmount` decimal(10,2) DEFAULT 0.00,
  `maxDiscount` decimal(10,2) DEFAULT NULL,
  `productIds` longtext DEFAULT NULL,
  `categoryIds` longtext DEFAULT NULL,
  `usageLimit` int(11) DEFAULT 100,
  `perCustomerLimit` int(11) DEFAULT 1,
  `startDate` varchar(50) DEFAULT NULL,
  `expiryDate` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `timesUsed` int(11) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `coupons`
REPLACE INTO `coupons` (`id`, `code`, `discountType`, `discountValue`, `minOrderAmount`, `maxDiscount`, `productIds`, `categoryIds`, `usageLimit`, `perCustomerLimit`, `startDate`, `expiryDate`, `isActive`, `timesUsed`) VALUES
(1, 'babui10', 'percentage', 10, 1000, 300, NULL, NULL, 500, 2, NULL, '2026-10-20T05:30:56.717Z', 1, 42);
REPLACE INTO `coupons` (`id`, `code`, `discountType`, `discountValue`, `minOrderAmount`, `maxDiscount`, `productIds`, `categoryIds`, `usageLimit`, `perCustomerLimit`, `startDate`, `expiryDate`, `isActive`, `timesUsed`) VALUES
(3, 'FREE70', 'fixed', 70, 800, 70, NULL, NULL, 1000, 3, NULL, '2026-11-19T05:30:56.717Z', 1, 68);

-- ------------------------------------------------------------------------------
-- Table structure for `order_items` and `orders`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderNumber` varchar(100) NOT NULL,
  `customerName` varchar(255) NOT NULL,
  `customerPhone` varchar(50) NOT NULL,
  `customerEmail` varchar(255) DEFAULT NULL,
  `shippingAddress` text NOT NULL,
  `division` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `upazila` varchar(100) DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) DEFAULT 0.00,
  `couponCode` varchar(50) DEFAULT NULL,
  `couponDiscount` decimal(10,2) DEFAULT 0.00,
  `shippingFee` decimal(10,2) DEFAULT 70.00,
  `tax` decimal(10,2) DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `paymentMethod` enum('cod','bkash','nagad','sslcommerz','card') DEFAULT 'cod',
  `paymentStatus` enum('pending','paid','failed','refunded') DEFAULT 'pending',
  `orderStatus` enum('pending','confirmed','processing','packed','shipped','out_for_delivery','delivered','cancelled','returned','refunded') DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orderNumber` (`orderNumber`),
  KEY `customerPhone` (`customerPhone`),
  KEY `orderStatus` (`orderStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productImage` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `variantName` varchar(100) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `orders` and `order_items`

-- ------------------------------------------------------------------------------
-- Table structure for `customers`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `totalOrders` int(11) DEFAULT 0,
  `totalSpent` decimal(10,2) DEFAULT 0.00,
  `lastOrderDate` varchar(50) DEFAULT NULL,
  `status` enum('active','disabled') DEFAULT 'active',
  `notes` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `customers`
REPLACE INTO `customers` (`id`, `name`, `phone`, `email`, `address`, `totalOrders`, `totalSpent`, `lastOrderDate`, `status`, `notes`) VALUES
(3, 'Sharmin Sultana', '01911223344', 'sharmin.s@yahoo.com', 'Block D, Bashundhara R/A, Dhaka', 4, 8700, '2026-09-20T02:30:56.717Z', 'active', 'Likes Gawa Ghee and Honey Nuts.');
REPLACE INTO `customers` (`id`, `name`, `phone`, `email`, `address`, `totalOrders`, `totalSpent`, `lastOrderDate`, `status`, `notes`) VALUES
(2, 'Tariqul Islam', '01819876543', 'tariqul@gmail.com', 'GEC Circle, Nasirabad Housing, Chittagong', 3, 9450, '2026-09-19T05:30:56.717Z', 'active', 'Frequently purchases bulk Ajwa dates.');
REPLACE INTO `customers` (`id`, `name`, `phone`, `email`, `address`, `totalOrders`, `totalSpent`, `lastOrderDate`, `status`, `notes`) VALUES
(1, 'Rashed Imtiaz', '01712345678', 'rashed@imposetechbd.com', 'House 45, Road 8, Dhanmondi, Dhaka', 6, 16800, '2026-09-18T05:30:56.717Z', 'active', 'Loyal recurring customer for mustard oil and Sundarban honey.');

-- ------------------------------------------------------------------------------
-- Table structure for `shipping_zones`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `shipping_zones`;
CREATE TABLE IF NOT EXISTS `shipping_zones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `deliveryCharge` decimal(10,2) NOT NULL,
  `deliveryTime` varchar(100) NOT NULL,
  `freeDeliveryThreshold` decimal(10,2) DEFAULT 0.00,
  `isActive` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `shipping_zones`
REPLACE INTO `shipping_zones` (`id`, `name`, `deliveryCharge`, `deliveryTime`, `freeDeliveryThreshold`, `isActive`) VALUES
(1, 'Inside Dhaka Metro', 70, '24-48 Hours', 1500, 1);
REPLACE INTO `shipping_zones` (`id`, `name`, `deliveryCharge`, `deliveryTime`, `freeDeliveryThreshold`, `isActive`) VALUES
(2, 'Outside Dhaka / Nationwide', 130, '48-72 Hours', 2500, 1);
REPLACE INTO `shipping_zones` (`id`, `name`, `deliveryCharge`, `deliveryTime`, `freeDeliveryThreshold`, `isActive`) VALUES
(3, 'Express Same Day Dhaka', 150, 'Same Day (Order before 12 PM)', 4000, 1);

-- ------------------------------------------------------------------------------
-- Table structure for `payment_gateways`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `payment_gateways`;
CREATE TABLE IF NOT EXISTS `payment_gateways` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `isEnabled` tinyint(1) DEFAULT 1,
  `instructions` text DEFAULT NULL,
  `mode` enum('test','live') DEFAULT 'live',
  `merchantNumber` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `payment_gateways`
REPLACE INTO `payment_gateways` (`id`, `name`, `isEnabled`, `instructions`, `mode`, `merchantNumber`) VALUES
('cod', 'Cash on Delivery', 1, 'Pay with cash upon delivery', 'live', NULL);
REPLACE INTO `payment_gateways` (`id`, `name`, `isEnabled`, `instructions`, `mode`, `merchantNumber`) VALUES
('bkash', 'bKash Payment', 1, 'Pay via bKash Merchant or Send Money', 'live', '01629863029');
REPLACE INTO `payment_gateways` (`id`, `name`, `isEnabled`, `instructions`, `mode`, `merchantNumber`) VALUES
('nagad', 'Nagad Payment', 1, 'Pay via Nagad Merchant or Send Money', 'live', '01629863029');
REPLACE INTO `payment_gateways` (`id`, `name`, `isEnabled`, `instructions`, `mode`, `merchantNumber`) VALUES
('rocket', 'DBBL Rocket', 0, 'Pay via DBBL Rocket bill pay', 'live', NULL);

-- ------------------------------------------------------------------------------
-- Table structure for `cms_pages`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cms_pages`;
CREATE TABLE IF NOT EXISTS `cms_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `isPublished` tinyint(1) DEFAULT 1,
  `metaTitle` varchar(255) DEFAULT NULL,
  `metaDescription` text DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `cms_pages`
REPLACE INTO `cms_pages` (`id`, `title`, `slug`, `content`, `isPublished`, `metaTitle`, `metaDescription`) VALUES
(1, 'About Us', 'about-us', '<h2>About Babui Shop</h2><p>Babui Shop started with a humble vision: to deliver 100% natural, adulteration-free, and chemical-free pantry staples directly to health-conscious families across Bangladesh.</p><p>We collect raw honey directly from trusted beekeepers and wild honey collectors (mouwals) in the Sundarbans. Our cold-pressed mustard oil is produced using authentic low-temperature wood ghani pressing, retaining every drop of essential nutrients and unadulterated aroma.</p><p>Today, more than 10,000 households trust Babui Shop as their primary supplier for natural health foods, Madinah dates, ghee, and pure spices.</p>', 1, 'About Us - Babui Shop Bangladesh', 'Learn about Babui Shop\'s mission to bring authentic, farm-fresh natural foods to your dining table.');
REPLACE INTO `cms_pages` (`id`, `title`, `slug`, `content`, `isPublished`, `metaTitle`, `metaDescription`) VALUES
(2, 'Contact Us', 'contact-us', '<h2>Customer Support & Location</h2><p>Have questions about an order or our natural products? Our dedicated customer care team is available Saturday through Thursday from 9:00 AM to 9:00 PM.</p><p><strong>Hotline:</strong> +8809642922922<br/><strong>WhatsApp:</strong> +8801712345678<br/><strong>Email:</strong> contact@babuishop.com<br/><strong>Warehouse & Office:</strong> House 12, Road 4, Rampura, Dhaka - 1219, Bangladesh.</p>', 1, 'Contact Us - Babui Shop Support', 'Reach our customer care team via phone, WhatsApp, or email for quick assistance.');
REPLACE INTO `cms_pages` (`id`, `title`, `slug`, `content`, `isPublished`, `metaTitle`, `metaDescription`) VALUES
(3, 'Frequently Asked Questions (FAQ)', 'faq', '<h2>Common Questions</h2><h3>Is your honey 100% natural?</h3><p>Yes, absolutely. Our honey is neither heated nor pasteurized and contains zero artificial sugar syrup. It is tested for natural enzymes and pollen count.</p><h3>How fast is delivery?</h3><p>Inside Dhaka city, orders are delivered within 24 to 48 hours. Outside Dhaka, delivery takes 48 to 72 hours via partner courier services (Steadfast/Pathao/eCourier).</p><h3>Can I inspect the parcel before paying?</h3><p>Yes! We offer full Cash on Delivery with parcel inspection upon delivery.</p>', 1, 'FAQ - Babui Shop', 'Frequently asked questions about our products, delivery timelines, and return policy.');
REPLACE INTO `cms_pages` (`id`, `title`, `slug`, `content`, `isPublished`, `metaTitle`, `metaDescription`) VALUES
(4, 'Privacy Policy', 'privacy-policy', '<h2>Privacy Policy</h2><p>We respect your privacy and never sell or share your personal contact details or order history with third parties. Your address and telephone number are strictly utilized for delivery fulfillment and order tracking.</p>', 1, 'Privacy Policy - Babui Shop', 'Read how Babui Shop safeguards your personal data.');
REPLACE INTO `cms_pages` (`id`, `title`, `slug`, `content`, `isPublished`, `metaTitle`, `metaDescription`) VALUES
(5, 'Return & Refund Policy', 'return-refund', '<h2>7-Day Hassle-Free Returns</h2><p>If you receive a damaged jar or are unsatisfied with the purity or quality of any product, you can initiate a return or exchange within 7 days of delivery. Contact our hotline (+8809642922922) with your order number for an immediate replacement or full refund.</p>', 1, 'Return & Refund Policy - Babui Shop', 'Understand our 7-day hassle-free replacement and refund guidelines.');
REPLACE INTO `cms_pages` (`id`, `title`, `slug`, `content`, `isPublished`, `metaTitle`, `metaDescription`) VALUES
(6, 'Shipping & Delivery Policy', 'shipping-policy', '<h2>Shipping Details</h2><p>Standard delivery inside Dhaka is ৳70. Outside Dhaka delivery is ৳130. Orders with a cart value of ৳1,500 or more enjoy free shipping nationwide.</p>', 1, 'Shipping Policy - Babui Shop', 'Information on shipping fees, free delivery limits, and couriers.');

-- ------------------------------------------------------------------------------
-- Table structure for `media_files`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `media_files`;
CREATE TABLE IF NOT EXISTS `media_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `fileType` varchar(50) NOT NULL,
  `fileSize` varchar(50) NOT NULL,
  `folder` varchar(100) DEFAULT 'products',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `media_files`
REPLACE INTO `media_files` (`id`, `name`, `url`, `fileType`, `fileSize`, `folder`) VALUES
(7, '1000095593.png', '/uploads/1000095593-1790255343695.png', 'PNG', '49 KB', 'branding');
REPLACE INTO `media_files` (`id`, `name`, `url`, `fileType`, `fileSize`, `folder`) VALUES
(6, '1000095593.png', '/uploads/1000095593-1790255338873.png', 'PNG', '49 KB', 'branding');
REPLACE INTO `media_files` (`id`, `name`, `url`, `fileType`, `fileSize`, `folder`) VALUES
(1, 'sundarban-honey-jar.jpg', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80', 'image/jpeg', '142 KB', 'products');
REPLACE INTO `media_files` (`id`, `name`, `url`, `fileType`, `fileSize`, `folder`) VALUES
(2, 'mustard-oil-bottle.jpg', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80', 'image/jpeg', '198 KB', 'products');
REPLACE INTO `media_files` (`id`, `name`, `url`, `fileType`, `fileSize`, `folder`) VALUES
(3, 'ajwa-dates-fresh.jpg', 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80', 'image/jpeg', '215 KB', 'products');
REPLACE INTO `media_files` (`id`, `name`, `url`, `fileType`, `fileSize`, `folder`) VALUES
(4, 'hero-slider-grocery.jpg', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80', 'image/jpeg', '320 KB', 'banners');
REPLACE INTO `media_files` (`id`, `name`, `url`, `fileType`, `fileSize`, `folder`) VALUES
(5, 'kala-bhuna-spice.jpg', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 'image/jpeg', '180 KB', 'products');

-- ------------------------------------------------------------------------------
-- Table structure for `admin_users`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT 'admin',
  `role` varchar(50) DEFAULT 'admin',
  `permissions` longtext DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `avatarUrl` text DEFAULT NULL,
  `lastLoginAt` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `admin_users`
REPLACE INTO `admin_users` (`id`, `name`, `email`, `password`, `role`, `permissions`, `isActive`, `avatarUrl`, `lastLoginAt`) VALUES
(1, 'Super Administrator', 'admin@babuishop.com', 'admin', 'super_admin', '["all"]', 1, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', '2026-09-24T19:16:33.601Z');
REPLACE INTO `admin_users` (`id`, `name`, `email`, `password`, `role`, `permissions`, `isActive`, `avatarUrl`, `lastLoginAt`) VALUES
(2, 'Product Manager', 'products@babuishop.com', 'admin', 'product_manager', '["dashboard","products","categories","brands","media"]', 1, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', '2026-09-19T05:30:56.717Z');
REPLACE INTO `admin_users` (`id`, `name`, `email`, `password`, `role`, `permissions`, `isActive`, `avatarUrl`, `lastLoginAt`) VALUES
(3, 'Order & Logistics Lead', 'orders@babuishop.com', 'admin', 'order_manager', '["dashboard","orders","customers","shipping"]', 1, 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80', '2026-09-20T01:30:56.717Z');

-- ------------------------------------------------------------------------------
-- Table structure for `activity_logs`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `activity_logs`;
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminName` varchar(255) NOT NULL,
  `action` varchar(100) NOT NULL,
  `entityType` varchar(100) NOT NULL,
  `entityId` varchar(100) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `activity_logs`
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(71, 'Admin', 'CUSTOMER_DELETED', 'customer', 4, 'Customer "Mahbubur Rahman" was deleted.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(70, 'Super Administrator', 'ADMIN_LOGIN', 'auth', 1, 'Admin Super Administrator logged into CMS.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(69, 'Admin', 'COUPON_DELETED', 'coupon', 2, 'Deleted coupon ID 2');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(68, 'Admin', 'ORDER_DELETED', 'order', 'GB-2026-1001', 'Order #GB-2026-1001 was deleted.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(67, 'Admin', 'ORDER_DELETED', 'order', 'GB-2026-1002', 'Order #GB-2026-1002 was deleted.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(66, 'Admin', 'ORDER_DELETED', 'order', 'GB-2026-1003', 'Order #GB-2026-1003 was deleted.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(65, 'Admin', 'ORDER_DELETED', 'order', 'GB-2026-1004', 'Order #GB-2026-1004 was deleted.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(64, 'Admin', 'ORDER_DELETED', 'order', 'GB-2026-1005', 'Order #GB-2026-1005 was deleted.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(63, 'Admin', 'CUSTOMER_DELETED', 'customer', 5, 'Customer "Guest Shopper" was deleted.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(62, 'Admin', 'CATEGORY_DELETED', 'category', 1, 'Deleted category ID 1');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(61, 'Super Administrator', 'ADMIN_LOGIN', 'auth', 1, 'Admin Super Administrator logged into CMS.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(60, 'Super Administrator', 'ADMIN_LOGIN', 'auth', 1, 'Admin Super Administrator logged into CMS.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(59, 'Admin', 'PAYMENT_GATEWAYS_UPDATED', 'payment', NULL, 'Updated payment methods.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(58, 'Super Administrator', 'SETTINGS_UPDATED', 'settings', NULL, 'Saved website settings.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(57, 'Super Administrator', 'ADMIN_LOGIN', 'auth', 1, 'Admin Super Administrator logged into CMS.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(56, 'Admin', 'CATEGORY_DELETED', 'category', 10, 'Deleted category ID 10');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(55, 'Admin', 'CATEGORY_DELETED', 'category', 9, 'Deleted category ID 9');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(54, 'Admin', 'CATEGORY_DELETED', 'category', 8, 'Deleted category ID 8');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(53, 'Admin', 'CATEGORY_DELETED', 'category', 7, 'Deleted category ID 7');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(52, 'Admin', 'CATEGORY_DELETED', 'category', 6, 'Deleted category ID 6');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(51, 'Admin', 'CATEGORY_DELETED', 'category', 5, 'Deleted category ID 5');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(50, 'Admin', 'CATEGORY_UPDATED', 'category', 4, 'Updated category Panjabi & Thob');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(49, 'Admin', 'CATEGORY_UPDATED', 'category', 3, 'Updated category Dates');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(48, 'Admin', 'CATEGORY_UPDATED', 'category', 2, 'Updated category Honey');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(47, 'Admin', 'CATEGORY_UPDATED', 'category', 1, 'Updated category Mens');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(46, 'Admin', 'CATEGORY_UPDATED', 'category', 1, 'Updated category Mens');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(45, 'Admin', 'PAYMENT_GATEWAYS_UPDATED', 'payment', NULL, 'Updated payment methods.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(44, 'Super Administrator', 'SETTINGS_UPDATED', 'settings', NULL, 'Saved website settings.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(43, 'Admin', 'PAYMENT_GATEWAYS_UPDATED', 'payment', NULL, 'Updated payment methods.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(42, 'Super Administrator', 'SETTINGS_UPDATED', 'settings', NULL, 'Saved website settings.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(41, 'Admin', 'PAYMENT_GATEWAYS_UPDATED', 'payment', NULL, 'Updated payment methods.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(40, 'Super Administrator', 'SETTINGS_UPDATED', 'settings', NULL, 'Saved website settings.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(39, 'Admin', 'PAYMENT_GATEWAYS_UPDATED', 'payment', NULL, 'Updated payment methods.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(38, 'Super Administrator', 'SETTINGS_UPDATED', 'settings', NULL, 'Saved website settings.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(37, 'Admin', 'MEDIA_UPLOADED', 'media', 7, 'Uploaded media 1000095593.png');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(36, 'Admin', 'MEDIA_UPLOADED', 'media', 6, 'Uploaded media 1000095593.png');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(35, 'Super Administrator', 'ADMIN_LOGIN', 'auth', 1, 'Admin Super Administrator logged into CMS.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(34, 'Super Administrator', 'ADMIN_LOGIN', 'auth', 1, 'Admin Super Administrator logged into CMS.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(33, 'Admin', 'PAYMENT_GATEWAYS_UPDATED', 'payment', NULL, 'Updated payment methods.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(32, 'Super Administrator', 'SETTINGS_UPDATED', 'settings', NULL, 'Saved website settings.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(31, 'Admin', 'PAYMENT_GATEWAYS_UPDATED', 'payment', NULL, 'Updated payment methods.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(30, 'Super Administrator', 'SETTINGS_UPDATED', 'settings', NULL, 'Saved website settings.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(29, 'Admin', 'PAYMENT_GATEWAYS_UPDATED', 'payment', NULL, 'Updated payment methods.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(28, 'Super Administrator', 'SETTINGS_UPDATED', 'settings', NULL, 'Saved website settings.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(27, 'Super Administrator', 'ADMIN_LOGIN', 'auth', 1, 'Admin Super Administrator logged into CMS.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(26, 'Super Administrator', 'ADMIN_LOGIN', 'auth', 1, 'Admin Super Administrator logged into CMS.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(25, 'Super Administrator', 'SETTINGS_UPDATED', 'settings', NULL, 'Saved website settings.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(24, 'Super Administrator', 'ADMIN_LOGIN', 'auth', 1, 'Admin Super Administrator logged into CMS.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(23, 'Super Administrator', 'ADMIN_LOGIN', 'auth', 1, 'Admin Super Administrator logged into CMS.');
REPLACE INTO `activity_logs` (`id`, `adminName`, `action`, `entityType`, `entityId`, `details`) VALUES
(22, 'Super Administrator', 'ADMIN_LOGIN', 'auth', 1, 'Admin Super Administrator logged into CMS.');

-- ------------------------------------------------------------------------------
-- Table structure for `admin_notifications`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `admin_notifications`;
CREATE TABLE IF NOT EXISTS `admin_notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` enum('order','stock','customer','payment') DEFAULT 'order',
  `isRead` tinyint(1) DEFAULT 0,
  `link` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `admin_notifications`
REPLACE INTO `admin_notifications` (`id`, `title`, `message`, `type`, `isRead`, `link`) VALUES
(1, 'New Order Received', 'Order GB-2026-1004 placed by Mahbubur Rahman for ৳970 (COD).', 'order', 0, '/admin/orders');
REPLACE INTO `admin_notifications` (`id`, `title`, `message`, `type`, `isRead`, `link`) VALUES
(2, 'Low Stock Alert', 'Natural Honeycomb 1kg stock is down to 15 (threshold 4).', 'stock', 0, '/admin/products');
REPLACE INTO `admin_notifications` (`id`, `title`, `message`, `type`, `isRead`, `link`) VALUES
(3, 'Coupon babui10 Used', 'Customer Rashed Imtiaz applied babui10 saving ৳300.', 'customer', 1, '/admin/coupons');

-- ------------------------------------------------------------------------------
-- Table structure for `nav_menu_items`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `nav_menu_items`;
CREATE TABLE IF NOT EXISTS `nav_menu_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `type` enum('category','page','custom') DEFAULT 'custom',
  `targetId` varchar(100) DEFAULT NULL,
  `sortOrder` int(11) DEFAULT 0,
  `isEnabled` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `nav_menu_items`
REPLACE INTO `nav_menu_items` (`id`, `title`, `url`, `type`, `targetId`, `sortOrder`, `isEnabled`) VALUES
(1, 'Home', '/', 'custom', NULL, 1, 1);
REPLACE INTO `nav_menu_items` (`id`, `title`, `url`, `type`, `targetId`, `sortOrder`, `isEnabled`) VALUES
(2, 'Honey', '/category/2', 'category', '2', 2, 1);
REPLACE INTO `nav_menu_items` (`id`, `title`, `url`, `type`, `targetId`, `sortOrder`, `isEnabled`) VALUES
(3, 'Oil & Ghee', '/category/1', 'category', '1', 3, 1);
REPLACE INTO `nav_menu_items` (`id`, `title`, `url`, `type`, `targetId`, `sortOrder`, `isEnabled`) VALUES
(4, 'Dates', '/category/3', 'category', '3', 4, 1);
REPLACE INTO `nav_menu_items` (`id`, `title`, `url`, `type`, `targetId`, `sortOrder`, `isEnabled`) VALUES
(5, 'Spices', '/category/4', 'category', '4', 5, 1);
REPLACE INTO `nav_menu_items` (`id`, `title`, `url`, `type`, `targetId`, `sortOrder`, `isEnabled`) VALUES
(6, 'Nuts & Seeds', '/category/5', 'category', '5', 6, 1);
REPLACE INTO `nav_menu_items` (`id`, `title`, `url`, `type`, `targetId`, `sortOrder`, `isEnabled`) VALUES
(7, 'Combos', '/combos', 'custom', NULL, 7, 1);
REPLACE INTO `nav_menu_items` (`id`, `title`, `url`, `type`, `targetId`, `sortOrder`, `isEnabled`) VALUES
(8, 'About Us', '/page/about-us', 'page', 'about-us', 8, 1);

-- ------------------------------------------------------------------------------
-- Table structure for `cart_items` and `users`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cart_items`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(64) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `loginMethod` varchar(64) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openId` (`openId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `comboId` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping default guest user
REPLACE INTO `users` (`id`, `openId`, `name`, `email`, `loginMethod`, `role`) VALUES
(1, 'guest-demo-user', 'Guest Shopper', 'guest@babuishop.com', 'guest', 'user');

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- ==============================================================================
-- End of Babui Shop cPanel MySQL Database Dump
-- ==============================================================================
