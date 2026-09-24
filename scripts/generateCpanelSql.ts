import fs from "fs";
import path from "path";

const dataStorePath = path.resolve(process.cwd(), "server", "data-store.json");
const dataStore = JSON.parse(fs.readFileSync(dataStorePath, "utf-8"));

function esc(val: any): string {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? "1" : "0";
  if (typeof val === "number") return val.toString();
  if (typeof val === "object") {
    return `'${JSON.stringify(val).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case "\0": return "\\0";
        case "\x08": return "\\b";
        case "\x09": return "\\t";
        case "\x1a": return "\\z";
        case "\n": return "\\n";
        case "\r": return "\\r";
        case "\"": case "'": case "\\": case "%":
          return "\\" + char;
        default: return char;
      }
    })}'`;
  }
  return `'${val.toString().replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case "\0": return "\\0";
      case "\x08": return "\\b";
      case "\x09": return "\\t";
      case "\x1a": return "\\z";
      case "\n": return "\\n";
      case "\r": return "\\r";
      case "\"": case "'": case "\\": case "%":
        return "\\" + char;
      default: return char;
    }
  })}'`;
}

let sql = `-- ==============================================================================
-- Babui Shop / Ghorer Bazar - Complete MySQL Database Schema & Seed Data
-- Designed for cPanel / phpMyAdmin / MySQL 5.7+ / MySQL 8.0+ / MariaDB 10.3+
-- Character set: utf8mb4 / utf8mb4_unicode_ci
-- ==============================================================================
--
-- CPANEL QUICK IMPORT INSTRUCTIONS:
-- 1. In cPanel, navigate to "MySQL® Databases" and create a database (e.g., youruser_babuishop).
-- 2. Create a database user, set a password, and grant "ALL PRIVILEGES" on the database.
-- 3. Open "phpMyAdmin" in cPanel, select your newly created database on the left panel.
-- 4. Click the "Import" tab at the top, choose this file (cpanel_database.sql), and click "Go".
-- 5. All tables, relations, and full catalog seed data will be created instantly.
-- ==============================================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- Table structure for \`system_settings\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`system_settings\` (
  \`id\` int(11) NOT NULL,
  \`siteName\` varchar(255) DEFAULT 'Babui Shop',
  \`siteTitle\` varchar(255) DEFAULT NULL,
  \`metaDescription\` text DEFAULT NULL,
  \`siteLogo\` text DEFAULT NULL,
  \`darkLogo\` text DEFAULT NULL,
  \`siteFavicon\` text DEFAULT NULL,
  \`siteEmail\` varchar(255) DEFAULT NULL,
  \`sitePhone\` varchar(50) DEFAULT NULL,
  \`siteWhatsApp\` varchar(50) DEFAULT NULL,
  \`siteAddress\` text DEFAULT NULL,
  \`businessHours\` varchar(255) DEFAULT NULL,
  \`googleMapsUrl\` text DEFAULT NULL,
  \`facebookUrl\` text DEFAULT NULL,
  \`instagramUrl\` text DEFAULT NULL,
  \`youtubeUrl\` text DEFAULT NULL,
  \`tiktokUrl\` text DEFAULT NULL,
  \`messengerUrl\` text DEFAULT NULL,
  \`shippingInsideDhaka\` decimal(10,2) DEFAULT 70.00,
  \`shippingOutsideDhaka\` decimal(10,2) DEFAULT 130.00,
  \`freeShippingThreshold\` decimal(10,2) DEFAULT 1500.00,
  \`currency\` varchar(10) DEFAULT 'BDT',
  \`currencySymbol\` varchar(10) DEFAULT '৳',
  \`taxPercentage\` decimal(5,2) DEFAULT 0.00,
  \`maintenanceMode\` tinyint(1) DEFAULT 0,
  \`defaultLanguage\` varchar(10) DEFAULT 'bn',
  \`announcementText\` text DEFAULT NULL,
  \`announcementEnabled\` tinyint(1) DEFAULT 1,
  \`headerHotlineEnabled\` tinyint(1) DEFAULT 1,
  \`headerWhatsAppEnabled\` tinyint(1) DEFAULT 1,
  \`headerWishlistEnabled\` tinyint(1) DEFAULT 1,
  \`headerCartEnabled\` tinyint(1) DEFAULT 1,
  \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

// Settings insert
const s = dataStore.settings;
sql += `--
-- Dumping data for table \`system_settings\`
--
REPLACE INTO \`system_settings\` (\`id\`, \`siteName\`, \`siteTitle\`, \`metaDescription\`, \`siteLogo\`, \`darkLogo\`, \`siteFavicon\`, \`siteEmail\`, \`sitePhone\`, \`siteWhatsApp\`, \`siteAddress\`, \`businessHours\`, \`googleMapsUrl\`, \`facebookUrl\`, \`instagramUrl\`, \`youtubeUrl\`, \`tiktokUrl\`, \`messengerUrl\`, \`shippingInsideDhaka\`, \`shippingOutsideDhaka\`, \`freeShippingThreshold\`, \`currency\`, \`currencySymbol\`, \`taxPercentage\`, \`maintenanceMode\`, \`defaultLanguage\`, \`announcementText\`, \`announcementEnabled\`, \`headerHotlineEnabled\`, \`headerWhatsAppEnabled\`, \`headerWishlistEnabled\`, \`headerCartEnabled\`) VALUES
(1, ${esc(s.siteName)}, ${esc(s.siteTitle)}, ${esc(s.metaDescription)}, ${esc(s.siteLogo)}, ${esc(s.darkLogo)}, ${esc(s.siteFavicon)}, ${esc(s.siteEmail)}, ${esc(s.sitePhone)}, ${esc(s.siteWhatsApp)}, ${esc(s.siteAddress)}, ${esc(s.businessHours)}, ${esc(s.googleMapsUrl)}, ${esc(s.facebookUrl)}, ${esc(s.instagramUrl)}, ${esc(s.youtubeUrl)}, ${esc(s.tiktokUrl)}, ${esc(s.messengerUrl)}, ${esc(s.shippingInsideDhaka)}, ${esc(s.shippingOutsideDhaka)}, ${esc(s.freeShippingThreshold)}, ${esc(s.currency)}, ${esc(s.currencySymbol)}, ${esc(s.taxPercentage)}, ${esc(s.maintenanceMode)}, ${esc(s.defaultLanguage)}, ${esc(s.announcementText)}, ${esc(s.announcementEnabled)}, ${esc(s.headerHotlineEnabled)}, ${esc(s.headerWhatsAppEnabled)}, ${esc(s.headerWishlistEnabled)}, ${esc(s.headerCartEnabled)});\n\n`;

// Categories and subcategories
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`categories\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`categories\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`slug\` varchar(255) NOT NULL,
  \`description\` text DEFAULT NULL,
  \`imageUrl\` text DEFAULT NULL,
  \`icon\` varchar(100) DEFAULT NULL,
  \`bannerUrl\` text DEFAULT NULL,
  \`sortOrder\` int(11) DEFAULT 0,
  \`isFeatured\` tinyint(1) DEFAULT 1,
  \`isActive\` tinyint(1) DEFAULT 1,
  \`metaTitle\` varchar(255) DEFAULT NULL,
  \`metaDescription\` text DEFAULT NULL,
  \`metaKeywords\` text DEFAULT NULL,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`slug\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table structure for \`subcategories\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`subcategories\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`categoryId\` int(11) NOT NULL,
  \`name\` varchar(255) NOT NULL,
  \`slug\` varchar(255) NOT NULL,
  \`description\` text DEFAULT NULL,
  \`imageUrl\` text DEFAULT NULL,
  \`sortOrder\` int(11) DEFAULT 0,
  \`isActive\` tinyint(1) DEFAULT 1,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`categoryId\` (\`categoryId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

// Insert categories
sql += `-- Dumping data for table \`categories\`\n`;
for (const c of dataStore.categories || []) {
  sql += `REPLACE INTO \`categories\` (\`id\`, \`name\`, \`slug\`, \`description\`, \`imageUrl\`, \`icon\`, \`bannerUrl\`, \`sortOrder\`, \`isFeatured\`, \`isActive\`, \`metaTitle\`, \`metaDescription\`, \`metaKeywords\`) VALUES
(${c.id}, ${esc(c.name)}, ${esc(c.slug)}, ${esc(c.description)}, ${esc(c.imageUrl)}, ${esc(c.icon)}, ${esc(c.bannerUrl)}, ${esc(c.sortOrder)}, ${esc(c.isFeatured)}, ${esc(c.isActive)}, ${esc(c.metaTitle)}, ${esc(c.metaDescription)}, ${esc(c.metaKeywords)});\n`;

  if (c.subcategories && Array.isArray(c.subcategories)) {
    for (const sub of c.subcategories) {
      sql += `REPLACE INTO \`subcategories\` (\`id\`, \`categoryId\`, \`name\`, \`slug\`, \`description\`, \`imageUrl\`, \`sortOrder\`, \`isActive\`) VALUES
(${sub.id}, ${c.id}, ${esc(sub.name)}, ${esc(sub.slug)}, ${esc(sub.description)}, ${esc(sub.imageUrl)}, ${esc(sub.sortOrder)}, ${esc(sub.isActive)});\n`;
    }
  }
}
sql += "\n";

// Brands
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`brands\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`brands\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`slug\` varchar(255) NOT NULL,
  \`logoUrl\` text DEFAULT NULL,
  \`bannerUrl\` text DEFAULT NULL,
  \`description\` text DEFAULT NULL,
  \`websiteUrl\` text DEFAULT NULL,
  \`sortOrder\` int(11) DEFAULT 0,
  \`isActive\` tinyint(1) DEFAULT 1,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`slug\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`brands\`\n`;
for (const b of dataStore.brands || []) {
  sql += `REPLACE INTO \`brands\` (\`id\`, \`name\`, \`slug\`, \`logoUrl\`, \`bannerUrl\`, \`description\`, \`websiteUrl\`, \`sortOrder\`, \`isActive\`) VALUES
(${b.id}, ${esc(b.name)}, ${esc(b.slug)}, ${esc(b.logoUrl)}, ${esc(b.bannerUrl)}, ${esc(b.description)}, ${esc(b.websiteUrl)}, ${esc(b.sortOrder)}, ${esc(b.isActive)});\n`;
}
sql += "\n";

// Products
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`products\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`products\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`slug\` varchar(255) NOT NULL,
  \`sku\` varchar(100) NOT NULL,
  \`barcode\` varchar(100) DEFAULT NULL,
  \`brandId\` int(11) DEFAULT NULL,
  \`categoryId\` int(11) NOT NULL,
  \`subcategoryId\` int(11) DEFAULT NULL,
  \`shortDescription\` text DEFAULT NULL,
  \`fullDescription\` longtext DEFAULT NULL,
  \`price\` decimal(10,2) NOT NULL,
  \`discountPrice\` decimal(10,2) DEFAULT NULL,
  \`discountPercentage\` decimal(5,2) DEFAULT NULL,
  \`costPrice\` decimal(10,2) DEFAULT NULL,
  \`stock\` int(11) NOT NULL DEFAULT 0,
  \`lowStockThreshold\` int(11) DEFAULT 5,
  \`weight\` varchar(50) DEFAULT NULL,
  \`unit\` varchar(50) DEFAULT 'kg',
  \`videoUrl\` text DEFAULT NULL,
  \`imageUrl\` text NOT NULL,
  \`galleryImages\` longtext DEFAULT NULL,
  \`variants\` longtext DEFAULT NULL,
  \`isNewArrival\` tinyint(1) DEFAULT 0,
  \`isBestSelling\` tinyint(1) DEFAULT 0,
  \`isTrending\` tinyint(1) DEFAULT 0,
  \`isFeatured\` tinyint(1) DEFAULT 0,
  \`isBestCollection\` tinyint(1) DEFAULT 0,
  \`isOffered\` tinyint(1) DEFAULT 0,
  \`isFreeDelivery\` tinyint(1) DEFAULT 0,
  \`isPreOrder\` tinyint(1) DEFAULT 0,
  \`isOrganic\` tinyint(1) DEFAULT 0,
  \`isFlashSale\` tinyint(1) DEFAULT 0,
  \`hasLimitedTimeOffer\` tinyint(1) DEFAULT 0,
  \`offerEndsAt\` timestamp NULL DEFAULT NULL,
  \`status\` enum('active','draft','inactive') DEFAULT 'active',
  \`metaTitle\` varchar(255) DEFAULT NULL,
  \`metaDescription\` text DEFAULT NULL,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`categoryId\` (\`categoryId\`),
  KEY \`brandId\` (\`brandId\`),
  KEY \`status\` (\`status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`products\`\n`;
for (const p of dataStore.products || []) {
  sql += `REPLACE INTO \`products\` (\`id\`, \`name\`, \`slug\`, \`sku\`, \`barcode\`, \`brandId\`, \`categoryId\`, \`subcategoryId\`, \`shortDescription\`, \`fullDescription\`, \`price\`, \`discountPrice\`, \`discountPercentage\`, \`costPrice\`, \`stock\`, \`lowStockThreshold\`, \`weight\`, \`unit\`, \`videoUrl\`, \`imageUrl\`, \`galleryImages\`, \`variants\`, \`isNewArrival\`, \`isBestSelling\`, \`isTrending\`, \`isFeatured\`, \`isBestCollection\`, \`isOffered\`, \`isFreeDelivery\`, \`isPreOrder\`, \`isOrganic\`, \`isFlashSale\`, \`hasLimitedTimeOffer\`, \`offerEndsAt\`, \`status\`, \`metaTitle\`, \`metaDescription\`) VALUES
(${p.id}, ${esc(p.name)}, ${esc(p.slug)}, ${esc(p.sku)}, ${esc(p.barcode)}, ${esc(p.brandId)}, ${esc(p.categoryId)}, ${esc(p.subcategoryId)}, ${esc(p.shortDescription)}, ${esc(p.fullDescription)}, ${esc(p.price)}, ${esc(p.discountPrice)}, ${esc(p.discountPercentage)}, ${esc(p.costPrice)}, ${esc(p.stock)}, ${esc(p.lowStockThreshold)}, ${esc(p.weight)}, ${esc(p.unit)}, ${esc(p.videoUrl)}, ${esc(p.imageUrl)}, ${esc(p.galleryImages)}, ${esc(p.variants)}, ${esc(p.isNewArrival)}, ${esc(p.isBestSelling)}, ${esc(p.isTrending)}, ${esc(p.isFeatured)}, ${esc(p.isBestCollection)}, ${esc(p.isOffered)}, ${esc(p.isFreeDelivery)}, ${esc(p.isPreOrder)}, ${esc(p.isOrganic)}, ${esc(p.isFlashSale)}, ${esc(p.hasLimitedTimeOffer)}, ${p.offerEndsAt ? esc(p.offerEndsAt) : "NULL"}, ${esc(p.status)}, ${esc(p.metaTitle)}, ${esc(p.metaDescription)});\n`;
}
sql += "\n";

// Combos
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`combos\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`combos\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`description\` text DEFAULT NULL,
  \`price\` decimal(10,2) NOT NULL,
  \`originalPrice\` decimal(10,2) NOT NULL,
  \`savingsPercentage\` decimal(5,2) NOT NULL,
  \`imageUrl\` text DEFAULT NULL,
  \`productIds\` longtext NOT NULL,
  \`stock\` int(11) NOT NULL DEFAULT 0,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`combos\`\n`;
for (const combo of dataStore.combos || []) {
  sql += `REPLACE INTO \`combos\` (\`id\`, \`name\`, \`description\`, \`price\`, \`originalPrice\`, \`savingsPercentage\`, \`imageUrl\`, \`productIds\`, \`stock\`) VALUES
(${combo.id}, ${esc(combo.name)}, ${esc(combo.description)}, ${esc(combo.price)}, ${esc(combo.originalPrice)}, ${esc(combo.savingsPercentage)}, ${esc(combo.imageUrl)}, ${esc(combo.productIds)}, ${esc(combo.stock)});\n`;
}
sql += "\n";

// Sliders
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`sliders\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`sliders\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) NOT NULL,
  \`subtitle\` varchar(255) DEFAULT NULL,
  \`buttonText\` varchar(100) DEFAULT NULL,
  \`buttonUrl\` varchar(255) DEFAULT NULL,
  \`desktopImageUrl\` text NOT NULL,
  \`mobileImageUrl\` text DEFAULT NULL,
  \`categoryId\` int(11) DEFAULT NULL,
  \`productId\` int(11) DEFAULT NULL,
  \`priority\` int(11) DEFAULT 0,
  \`isActive\` tinyint(1) DEFAULT 1,
  \`startDate\` varchar(50) DEFAULT NULL,
  \`endDate\` varchar(50) DEFAULT NULL,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`sliders\`\n`;
for (const slider of dataStore.sliders || []) {
  sql += `REPLACE INTO \`sliders\` (\`id\`, \`title\`, \`subtitle\`, \`buttonText\`, \`buttonUrl\`, \`desktopImageUrl\`, \`mobileImageUrl\`, \`categoryId\`, \`productId\`, \`priority\`, \`isActive\`, \`startDate\`, \`endDate\`) VALUES
(${slider.id}, ${esc(slider.title)}, ${esc(slider.subtitle)}, ${esc(slider.buttonText)}, ${esc(slider.buttonUrl)}, ${esc(slider.desktopImageUrl)}, ${esc(slider.mobileImageUrl)}, ${esc(slider.categoryId)}, ${esc(slider.productId)}, ${esc(slider.priority)}, ${esc(slider.isActive)}, ${esc(slider.startDate)}, ${esc(slider.endDate)});\n`;
}
sql += "\n";

// Homepage Sections
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`homepage_sections\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`homepage_sections\` (
  \`id\` varchar(50) NOT NULL,
  \`sectionKey\` varchar(100) NOT NULL,
  \`title\` varchar(255) NOT NULL,
  \`subtitle\` varchar(255) DEFAULT NULL,
  \`isEnabled\` tinyint(1) DEFAULT 1,
  \`sortOrder\` int(11) DEFAULT 0,
  \`productLimit\` int(11) DEFAULT 6,
  \`categoryId\` int(11) DEFAULT NULL,
  \`background\` varchar(100) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`homepage_sections\`\n`;
for (const sec of dataStore.homepageSections || []) {
  sql += `REPLACE INTO \`homepage_sections\` (\`id\`, \`sectionKey\`, \`title\`, \`subtitle\`, \`isEnabled\`, \`sortOrder\`, \`productLimit\`, \`categoryId\`, \`background\`) VALUES
(${esc(sec.id)}, ${esc(sec.sectionKey)}, ${esc(sec.title)}, ${esc(sec.subtitle)}, ${esc(sec.isEnabled)}, ${esc(sec.sortOrder)}, ${esc(sec.productLimit)}, ${esc(sec.categoryId)}, ${esc(sec.background)});\n`;
}
sql += "\n";

// Flash Sale
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`flash_sales\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`flash_sales\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`startDate\` varchar(50) DEFAULT NULL,
  \`endDate\` varchar(50) DEFAULT NULL,
  \`startTime\` varchar(20) DEFAULT NULL,
  \`endTime\` varchar(20) DEFAULT NULL,
  \`productIds\` longtext NOT NULL,
  \`discountPercentage\` decimal(5,2) DEFAULT 0.00,
  \`quantityLimit\` int(11) DEFAULT 0,
  \`isActive\` tinyint(1) DEFAULT 1,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

if (dataStore.flashSale) {
  const fsItem = dataStore.flashSale;
  sql += `-- Dumping data for table \`flash_sales\`\n`;
  sql += `REPLACE INTO \`flash_sales\` (\`id\`, \`name\`, \`startDate\`, \`endDate\`, \`startTime\`, \`endTime\`, \`productIds\`, \`discountPercentage\`, \`quantityLimit\`, \`isActive\`) VALUES
(${fsItem.id}, ${esc(fsItem.name)}, ${esc(fsItem.startDate)}, ${esc(fsItem.endDate)}, ${esc(fsItem.startTime)}, ${esc(fsItem.endTime)}, ${esc(fsItem.productIds)}, ${esc(fsItem.discountPercentage)}, ${esc(fsItem.quantityLimit)}, ${esc(fsItem.isActive)});\n\n`;
}

// Coupons
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`coupons\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`coupons\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`code\` varchar(50) NOT NULL,
  \`discountType\` enum('percentage','fixed') DEFAULT 'percentage',
  \`discountValue\` decimal(10,2) NOT NULL,
  \`minOrderAmount\` decimal(10,2) DEFAULT 0.00,
  \`maxDiscount\` decimal(10,2) DEFAULT NULL,
  \`productIds\` longtext DEFAULT NULL,
  \`categoryIds\` longtext DEFAULT NULL,
  \`usageLimit\` int(11) DEFAULT 100,
  \`perCustomerLimit\` int(11) DEFAULT 1,
  \`startDate\` varchar(50) DEFAULT NULL,
  \`expiryDate\` varchar(50) DEFAULT NULL,
  \`isActive\` tinyint(1) DEFAULT 1,
  \`timesUsed\` int(11) DEFAULT 0,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`code\` (\`code\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`coupons\`\n`;
for (const coup of dataStore.coupons || []) {
  sql += `REPLACE INTO \`coupons\` (\`id\`, \`code\`, \`discountType\`, \`discountValue\`, \`minOrderAmount\`, \`maxDiscount\`, \`productIds\`, \`categoryIds\`, \`usageLimit\`, \`perCustomerLimit\`, \`startDate\`, \`expiryDate\`, \`isActive\`, \`timesUsed\`) VALUES
(${coup.id}, ${esc(coup.code)}, ${esc(coup.discountType)}, ${esc(coup.discountValue)}, ${esc(coup.minOrderAmount)}, ${esc(coup.maxDiscount)}, ${esc(coup.productIds)}, ${esc(coup.categoryIds)}, ${esc(coup.usageLimit)}, ${esc(coup.perCustomerLimit)}, ${esc(coup.startDate)}, ${esc(coup.expiryDate)}, ${esc(coup.isActive)}, ${esc(coup.timesUsed)});\n`;
}
sql += "\n";

// Orders and Order Items
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`orders\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`orders\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`orderNumber\` varchar(100) NOT NULL,
  \`customerName\` varchar(255) NOT NULL,
  \`customerPhone\` varchar(50) NOT NULL,
  \`customerEmail\` varchar(255) DEFAULT NULL,
  \`shippingAddress\` text NOT NULL,
  \`division\` varchar(100) NOT NULL,
  \`district\` varchar(100) NOT NULL,
  \`upazila\` varchar(100) DEFAULT NULL,
  \`subtotal\` decimal(10,2) NOT NULL,
  \`discount\` decimal(10,2) DEFAULT 0.00,
  \`couponCode\` varchar(50) DEFAULT NULL,
  \`couponDiscount\` decimal(10,2) DEFAULT 0.00,
  \`shippingFee\` decimal(10,2) DEFAULT 70.00,
  \`tax\` decimal(10,2) DEFAULT 0.00,
  \`total\` decimal(10,2) NOT NULL,
  \`paymentMethod\` enum('cod','bkash','nagad','sslcommerz','card') DEFAULT 'cod',
  \`paymentStatus\` enum('pending','paid','failed','refunded') DEFAULT 'pending',
  \`orderStatus\` enum('pending','confirmed','processing','packed','shipped','out_for_delivery','delivered','cancelled','returned','refunded') DEFAULT 'pending',
  \`notes\` text DEFAULT NULL,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`orderNumber\` (\`orderNumber\`),
  KEY \`customerPhone\` (\`customerPhone\`),
  KEY \`orderStatus\` (\`orderStatus\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table structure for \`order_items\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`order_items\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`orderId\` int(11) NOT NULL,
  \`productId\` int(11) NOT NULL,
  \`productName\` varchar(255) NOT NULL,
  \`productImage\` text DEFAULT NULL,
  \`price\` decimal(10,2) NOT NULL,
  \`quantity\` int(11) NOT NULL,
  \`variantName\` varchar(100) DEFAULT NULL,
  \`total\` decimal(10,2) NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`orderId\` (\`orderId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`orders\` and \`order_items\`\n`;
let orderItemId = 1;
for (const ord of dataStore.orders || []) {
  sql += `REPLACE INTO \`orders\` (\`id\`, \`orderNumber\`, \`customerName\`, \`customerPhone\`, \`customerEmail\`, \`shippingAddress\`, \`division\`, \`district\`, \`upazila\`, \`subtotal\`, \`discount\`, \`couponCode\`, \`couponDiscount\`, \`shippingFee\`, \`tax\`, \`total\`, \`paymentMethod\`, \`paymentStatus\`, \`orderStatus\`, \`notes\`) VALUES
(${ord.id}, ${esc(ord.orderNumber)}, ${esc(ord.customerName)}, ${esc(ord.customerPhone)}, ${esc(ord.customerEmail)}, ${esc(ord.shippingAddress)}, ${esc(ord.division)}, ${esc(ord.district)}, ${esc(ord.upazila)}, ${esc(ord.subtotal)}, ${esc(ord.discount)}, ${esc(ord.couponCode)}, ${esc(ord.couponDiscount)}, ${esc(ord.shippingFee)}, ${esc(ord.tax)}, ${esc(ord.total)}, ${esc(ord.paymentMethod)}, ${esc(ord.paymentStatus)}, ${esc(ord.orderStatus)}, ${esc(ord.notes)});\n`;

  if (ord.items && Array.isArray(ord.items)) {
    for (const item of ord.items) {
      sql += `REPLACE INTO \`order_items\` (\`id\`, \`orderId\`, \`productId\`, \`productName\`, \`productImage\`, \`price\`, \`quantity\`, \`variantName\`, \`total\`) VALUES
(${orderItemId++}, ${ord.id}, ${esc(item.productId)}, ${esc(item.productName)}, ${esc(item.productImage)}, ${esc(item.price)}, ${esc(item.quantity)}, ${esc(item.variantName)}, ${esc(item.total)});\n`;
    }
  }
}
sql += "\n";

// Customers
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`customers\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`customers\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`phone\` varchar(50) NOT NULL,
  \`email\` varchar(255) DEFAULT NULL,
  \`address\` text DEFAULT NULL,
  \`totalOrders\` int(11) DEFAULT 0,
  \`totalSpent\` decimal(10,2) DEFAULT 0.00,
  \`lastOrderDate\` varchar(50) DEFAULT NULL,
  \`status\` enum('active','disabled') DEFAULT 'active',
  \`notes\` text DEFAULT NULL,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`phone\` (\`phone\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`customers\`\n`;
for (const cust of dataStore.customers || []) {
  sql += `REPLACE INTO \`customers\` (\`id\`, \`name\`, \`phone\`, \`email\`, \`address\`, \`totalOrders\`, \`totalSpent\`, \`lastOrderDate\`, \`status\`, \`notes\`) VALUES
(${cust.id}, ${esc(cust.name)}, ${esc(cust.phone)}, ${esc(cust.email)}, ${esc(cust.address)}, ${esc(cust.totalOrders)}, ${esc(cust.totalSpent)}, ${esc(cust.lastOrderDate)}, ${esc(cust.status)}, ${esc(cust.notes)});\n`;
}
sql += "\n";

// Shipping Zones
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`shipping_zones\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`shipping_zones\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`deliveryCharge\` decimal(10,2) NOT NULL,
  \`deliveryTime\` varchar(100) NOT NULL,
  \`freeDeliveryThreshold\` decimal(10,2) DEFAULT 0.00,
  \`isActive\` tinyint(1) DEFAULT 1,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`shipping_zones\`\n`;
for (const sz of dataStore.shippingZones || []) {
  sql += `REPLACE INTO \`shipping_zones\` (\`id\`, \`name\`, \`deliveryCharge\`, \`deliveryTime\`, \`freeDeliveryThreshold\`, \`isActive\`) VALUES
(${sz.id}, ${esc(sz.name)}, ${esc(sz.deliveryCharge)}, ${esc(sz.deliveryTime)}, ${esc(sz.freeDeliveryThreshold)}, ${esc(sz.isActive)});\n`;
}
sql += "\n";

// Payment Gateways
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`payment_gateways\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`payment_gateways\` (
  \`id\` varchar(50) NOT NULL,
  \`name\` varchar(100) NOT NULL,
  \`isEnabled\` tinyint(1) DEFAULT 1,
  \`instructions\` text DEFAULT NULL,
  \`mode\` enum('test','live') DEFAULT 'live',
  \`merchantNumber\` varchar(100) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`payment_gateways\`\n`;
for (const pg of dataStore.paymentGateways || []) {
  sql += `REPLACE INTO \`payment_gateways\` (\`id\`, \`name\`, \`isEnabled\`, \`instructions\`, \`mode\`, \`merchantNumber\`) VALUES
(${esc(pg.id)}, ${esc(pg.name)}, ${esc(pg.isEnabled)}, ${esc(pg.instructions)}, ${esc(pg.mode)}, ${esc(pg.merchantNumber)});\n`;
}
sql += "\n";

// CMS Pages
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`cms_pages\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`cms_pages\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) NOT NULL,
  \`slug\` varchar(255) NOT NULL,
  \`content\` longtext NOT NULL,
  \`isPublished\` tinyint(1) DEFAULT 1,
  \`metaTitle\` varchar(255) DEFAULT NULL,
  \`metaDescription\` text DEFAULT NULL,
  \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`slug\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`cms_pages\`\n`;
for (const page of dataStore.pages || []) {
  sql += `REPLACE INTO \`cms_pages\` (\`id\`, \`title\`, \`slug\`, \`content\`, \`isPublished\`, \`metaTitle\`, \`metaDescription\`) VALUES
(${page.id}, ${esc(page.title)}, ${esc(page.slug)}, ${esc(page.content)}, ${esc(page.isPublished)}, ${esc(page.metaTitle)}, ${esc(page.metaDescription)});\n`;
}
sql += "\n";

// Media Files
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`media_files\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`media_files\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`url\` text NOT NULL,
  \`fileType\` varchar(50) NOT NULL,
  \`fileSize\` varchar(50) NOT NULL,
  \`folder\` varchar(100) DEFAULT 'products',
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`media_files\`\n`;
for (const m of dataStore.mediaFiles || []) {
  sql += `REPLACE INTO \`media_files\` (\`id\`, \`name\`, \`url\`, \`fileType\`, \`fileSize\`, \`folder\`) VALUES
(${m.id}, ${esc(m.name)}, ${esc(m.url)}, ${esc(m.fileType)}, ${esc(m.fileSize)}, ${esc(m.folder)});\n`;
}
sql += "\n";

// Admin Users
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`admin_users\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`admin_users\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`email\` varchar(255) NOT NULL,
  \`password\` varchar(255) DEFAULT NULL,
  \`role\` varchar(50) DEFAULT 'admin',
  \`permissions\` longtext DEFAULT NULL,
  \`isActive\` tinyint(1) DEFAULT 1,
  \`avatarUrl\` text DEFAULT NULL,
  \`lastLoginAt\` varchar(50) DEFAULT NULL,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`email\` (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`admin_users\`\n`;
for (const u of dataStore.adminUsers || []) {
  sql += `REPLACE INTO \`admin_users\` (\`id\`, \`name\`, \`email\`, \`password\`, \`role\`, \`permissions\`, \`isActive\`, \`avatarUrl\`, \`lastLoginAt\`) VALUES
(${u.id}, ${esc(u.name)}, ${esc(u.email)}, ${esc(u.password)}, ${esc(u.role)}, ${esc(u.permissions)}, ${esc(u.isActive)}, ${esc(u.avatarUrl)}, ${esc(u.lastLoginAt)});\n`;
}
sql += "\n";

// Activity Logs
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`activity_logs\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`activity_logs\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`adminName\` varchar(255) NOT NULL,
  \`action\` varchar(100) NOT NULL,
  \`entityType\` varchar(100) NOT NULL,
  \`entityId\` varchar(100) DEFAULT NULL,
  \`details\` text DEFAULT NULL,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`activity_logs\`\n`;
for (const log of dataStore.activityLogs || []) {
  sql += `REPLACE INTO \`activity_logs\` (\`id\`, \`adminName\`, \`action\`, \`entityType\`, \`entityId\`, \`details\`) VALUES
(${log.id}, ${esc(log.adminName)}, ${esc(log.action)}, ${esc(log.entityType)}, ${esc(log.entityId)}, ${esc(log.details)});\n`;
}
sql += "\n";

// Notifications
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`admin_notifications\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`admin_notifications\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) NOT NULL,
  \`message\` text NOT NULL,
  \`type\` enum('order','stock','customer','payment') DEFAULT 'order',
  \`isRead\` tinyint(1) DEFAULT 0,
  \`link\` varchar(255) DEFAULT NULL,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`admin_notifications\`\n`;
for (const notif of dataStore.notifications || []) {
  sql += `REPLACE INTO \`admin_notifications\` (\`id\`, \`title\`, \`message\`, \`type\`, \`isRead\`, \`link\`) VALUES
(${notif.id}, ${esc(notif.title)}, ${esc(notif.message)}, ${esc(notif.type)}, ${esc(notif.isRead)}, ${esc(notif.link)});\n`;
}
sql += "\n";

// Nav menu items
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`nav_menu_items\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`nav_menu_items\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) NOT NULL,
  \`url\` varchar(255) NOT NULL,
  \`type\` enum('category','page','custom') DEFAULT 'custom',
  \`targetId\` varchar(100) DEFAULT NULL,
  \`sortOrder\` int(11) DEFAULT 0,
  \`isEnabled\` tinyint(1) DEFAULT 1,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

sql += `-- Dumping data for table \`nav_menu_items\`\n`;
for (const nav of dataStore.navMenuItems || []) {
  sql += `REPLACE INTO \`nav_menu_items\` (\`id\`, \`title\`, \`url\`, \`type\`, \`targetId\`, \`sortOrder\`, \`isEnabled\`) VALUES
(${nav.id}, ${esc(nav.title)}, ${esc(nav.url)}, ${esc(nav.type)}, ${esc(nav.targetId)}, ${esc(nav.order || nav.sortOrder || 0)}, ${esc(nav.isEnabled)});\n`;
}
sql += "\n";

// Users & Cart Items
sql += `-- ------------------------------------------------------------------------------
-- Table structure for \`users\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`openId\` varchar(64) NOT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`email\` varchar(320) DEFAULT NULL,
  \`loginMethod\` varchar(64) DEFAULT NULL,
  \`role\` enum('user','admin') NOT NULL DEFAULT 'user',
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  \`lastSignedIn\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`openId\` (\`openId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table structure for \`cart_items\`
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`cart_items\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`userId\` int(11) NOT NULL,
  \`productId\` int(11) DEFAULT NULL,
  \`comboId\` int(11) DEFAULT NULL,
  \`quantity\` int(11) NOT NULL DEFAULT 1,
  \`price\` decimal(10,2) NOT NULL,
  \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`userId\` (\`userId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping default guest user
REPLACE INTO \`users\` (\`id\`, \`openId\`, \`name\`, \`email\`, \`loginMethod\`, \`role\`) VALUES
(1, 'guest-demo-user', 'Guest Shopper', 'guest@ghorerbazar.com', 'guest', 'user');

SET FOREIGN_KEY_CHECKS = 1;

-- ==============================================================================
-- End of Babui Shop cPanel MySQL Database Dump
-- ==============================================================================
`;

fs.writeFileSync(path.resolve(process.cwd(), "cpanel_database.sql"), sql, "utf-8");
console.log("Successfully generated cpanel_database.sql (Size: " + Buffer.byteLength(sql) + " bytes)");
