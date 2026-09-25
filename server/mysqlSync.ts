import { getMysqlPool } from "./mysqlClient";
import type { CMSDataStore } from "./dataStore";

export async function loadStateFromMysql(): Promise<Partial<CMSDataStore> | null> {
  const pool = getMysqlPool();
  if (!pool) return null;

  try {
    // Check if tables exist
    const [tables] = await pool.query<any[]>(
      "SHOW TABLES LIKE 'system_settings'"
    );
    if (!tables || tables.length === 0) {
      console.log("[MySQL] Tables not yet created in database. Please import cpanel_database.sql in phpMyAdmin.");
      return null;
    }

    const state: Partial<CMSDataStore> = {};

    // 1. Settings
    try {
      const [settingsRows] = await pool.query<any[]>("SELECT * FROM system_settings LIMIT 1");
      if (settingsRows && settingsRows.length > 0) {
        state.settings = settingsRows[0];
      }
    } catch (e) {
      console.warn("[MySQL] Failed to load settings:", e);
    }

    // 2. Categories & Subcategories
    try {
      const [catRows] = await pool.query<any[]>("SELECT * FROM categories ORDER BY sortOrder ASC, id ASC");
      const [subRows] = await pool.query<any[]>("SELECT * FROM subcategories ORDER BY sortOrder ASC, id ASC");

      if (catRows && catRows.length > 0) {
        state.categories = catRows.map((cat) => ({
          ...cat,
          isFeatured: Boolean(cat.isFeatured),
          isActive: Boolean(cat.isActive),
          subcategories: (subRows || [])
            .filter((sub) => sub.categoryId === cat.id)
            .map((sub) => ({
              ...sub,
              isActive: Boolean(sub.isActive),
            })),
        }));
      }
    } catch (e) {
      console.warn("[MySQL] Failed to load categories:", e);
    }

    // 3. Brands
    try {
      const [brandRows] = await pool.query<any[]>("SELECT * FROM brands ORDER BY sortOrder ASC, id ASC");
      if (brandRows && brandRows.length > 0) {
        state.brands = brandRows.map((b) => ({
          ...b,
          isActive: Boolean(b.isActive),
        }));
      }
    } catch (e) {
      console.warn("[MySQL] Failed to load brands:", e);
    }

    // 4. Products
    try {
      const [prodRows] = await pool.query<any[]>("SELECT * FROM products ORDER BY id ASC");
      if (prodRows && prodRows.length > 0) {
        state.products = prodRows.map((p) => {
          let galleryImages: string[] = [];
          let variants: any[] = [];
          try {
            if (p.galleryImages) {
              galleryImages = typeof p.galleryImages === "string" ? JSON.parse(p.galleryImages) : p.galleryImages;
            }
          } catch {}
          try {
            if (p.variants) {
              variants = typeof p.variants === "string" ? JSON.parse(p.variants) : p.variants;
            }
          } catch {}

          return {
            ...p,
            price: Number(p.price) || 0,
            discountPrice: p.discountPrice !== null ? Number(p.discountPrice) : null,
            discountPercentage: p.discountPercentage !== null ? Number(p.discountPercentage) : null,
            costPrice: p.costPrice !== null ? Number(p.costPrice) : undefined,
            galleryImages,
            variants,
            isNewArrival: Boolean(p.isNewArrival),
            isBestSelling: Boolean(p.isBestSelling),
            isTrending: Boolean(p.isTrending),
            isFeatured: Boolean(p.isFeatured),
            isBestCollection: Boolean(p.isBestCollection),
            isOffered: Boolean(p.isOffered),
            isFreeDelivery: Boolean(p.isFreeDelivery),
            isPreOrder: Boolean(p.isPreOrder),
            isOrganic: Boolean(p.isOrganic),
            isFlashSale: Boolean(p.isFlashSale),
            hasLimitedTimeOffer: Boolean(p.hasLimitedTimeOffer),
          };
        });
      }
    } catch (e) {
      console.warn("[MySQL] Failed to load products:", e);
    }

    // 5. Sliders
    try {
      const [sliderRows] = await pool.query<any[]>("SELECT * FROM sliders ORDER BY priority ASC, id ASC");
      if (sliderRows && sliderRows.length > 0) {
        state.sliders = sliderRows.map((s) => ({
          ...s,
          isActive: Boolean(s.isActive),
        }));
      }
    } catch (e) {
      console.warn("[MySQL] Failed to load sliders:", e);
    }

    // 7. Homepage Sections
    try {
      const [secRows] = await pool.query<any[]>("SELECT * FROM homepage_sections ORDER BY sortOrder ASC");
      if (secRows && secRows.length > 0) {
        state.homepageSections = secRows.map((s) => ({
          ...s,
          isEnabled: Boolean(s.isEnabled),
        }));
      }
    } catch (e) {
      console.warn("[MySQL] Failed to load homepage sections:", e);
    }

    // 8. Coupons
    try {
      const [couponRows] = await pool.query<any[]>("SELECT * FROM coupons ORDER BY id ASC");
      if (couponRows && couponRows.length > 0) {
        state.coupons = couponRows.map((c) => {
          let productIds: number[] | undefined;
          let categoryIds: number[] | undefined;
          try {
            if (c.productIds) productIds = typeof c.productIds === "string" ? JSON.parse(c.productIds) : c.productIds;
          } catch {}
          try {
            if (c.categoryIds) categoryIds = typeof c.categoryIds === "string" ? JSON.parse(c.categoryIds) : c.categoryIds;
          } catch {}
          return {
            ...c,
            discountValue: Number(c.discountValue) || 0,
            minOrderAmount: Number(c.minOrderAmount) || 0,
            maxDiscount: c.maxDiscount ? Number(c.maxDiscount) : undefined,
            productIds,
            categoryIds,
            isActive: Boolean(c.isActive),
          };
        });
      }
    } catch (e) {
      console.warn("[MySQL] Failed to load coupons:", e);
    }

    // 9. Orders & Order Items
    try {
      const [orderRows] = await pool.query<any[]>("SELECT * FROM orders ORDER BY id DESC");
      const [itemRows] = await pool.query<any[]>("SELECT * FROM order_items ORDER BY id ASC");

      if (orderRows && orderRows.length > 0) {
        state.orders = orderRows.map((o) => ({
          ...o,
          createdAt: o.createdAt instanceof Date ? o.createdAt.toISOString() : String(o.createdAt || new Date().toISOString()),
          updatedAt: o.updatedAt instanceof Date ? o.updatedAt.toISOString() : String(o.updatedAt || new Date().toISOString()),
          subtotal: Number(o.subtotal) || 0,
          discount: Number(o.discount) || 0,
          couponDiscount: Number(o.couponDiscount) || 0,
          shippingFee: Number(o.shippingFee) || 0,
          tax: Number(o.tax) || 0,
          total: Number(o.total) || 0,
          items: (itemRows || [])
            .filter((i) => i.orderId === o.id)
            .map((i) => ({
              productId: i.productId,
              productName: i.productName,
              productImage: i.productImage || "",
              price: Number(i.price) || 0,
              quantity: Number(i.quantity) || 1,
              variantName: i.variantName,
              total: Number(i.total) || 0,
            })),
        }));
      }
    } catch (e) {
      console.warn("[MySQL] Failed to load orders:", e);
    }

    // 10. Customers
    try {
      const [custRows] = await pool.query<any[]>("SELECT * FROM customers ORDER BY id DESC");
      if (custRows && custRows.length > 0) {
        state.customers = custRows.map((c) => ({
          ...c,
          createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : String(c.createdAt || new Date().toISOString()),
          updatedAt: c.updatedAt instanceof Date ? c.updatedAt.toISOString() : String(c.updatedAt || new Date().toISOString()),
          totalOrders: Number(c.totalOrders) || 0,
          totalSpent: Number(c.totalSpent) || 0,
        }));
      }
    } catch (e) {
      console.warn("[MySQL] Failed to load customers:", e);
    }

    // 11. Nav Menu Items
    try {
      const [navRows] = await pool.query<any[]>("SELECT * FROM nav_menu_items ORDER BY sortOrder ASC, id ASC");
      if (navRows && navRows.length > 0) {
        state.navMenuItems = navRows.map((n) => ({
          id: n.id,
          title: n.title,
          url: n.url,
          type: n.type,
          targetId: n.targetId,
          order: n.sortOrder,
          isEnabled: Boolean(n.isEnabled),
        }));
      }
    } catch (e) {
      console.warn("[MySQL] Failed to load nav menu:", e);
    }

    console.log("[MySQL] Successfully synced data state from cPanel MySQL database.");
    return state;
  } catch (err) {
    console.warn("[MySQL] Error querying database during state sync:", err);
    return null;
  }
}

// Debounced async persistence to MySQL
let syncTimeout: NodeJS.Timeout | null = null;

export function triggerMysqlSync(data: CMSDataStore) {
  const pool = getMysqlPool();
  if (!pool) return;

  if (syncTimeout) {
    clearTimeout(syncTimeout);
  }

  syncTimeout = setTimeout(async () => {
    try {
      // Update system_settings
      if (data.settings) {
        const s = data.settings;
        await pool.query(
          `REPLACE INTO system_settings (id, siteName, siteTitle, metaDescription, siteLogo, darkLogo, siteFavicon, siteEmail, sitePhone, siteWhatsApp, siteAddress, businessHours, googleMapsUrl, facebookUrl, instagramUrl, youtubeUrl, tiktokUrl, messengerUrl, shippingInsideDhaka, shippingOutsideDhaka, freeShippingThreshold, currency, currencySymbol, taxPercentage, maintenanceMode, defaultLanguage, announcementText, announcementEnabled, headerHotlineEnabled, headerWhatsAppEnabled, headerWishlistEnabled, headerCartEnabled)
           VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            s.siteName,
            s.siteTitle,
            s.metaDescription,
            s.siteLogo,
            s.darkLogo,
            s.siteFavicon,
            s.siteEmail,
            s.sitePhone,
            s.siteWhatsApp,
            s.siteAddress,
            s.businessHours,
            s.googleMapsUrl,
            s.facebookUrl,
            s.instagramUrl,
            s.youtubeUrl,
            s.tiktokUrl,
            s.messengerUrl,
            s.shippingInsideDhaka,
            s.shippingOutsideDhaka,
            s.freeShippingThreshold,
            s.currency,
            s.currencySymbol,
            s.taxPercentage,
            s.maintenanceMode ? 1 : 0,
            s.defaultLanguage,
            s.announcementText,
            s.announcementEnabled ? 1 : 0,
            s.headerHotlineEnabled ? 1 : 0,
            s.headerWhatsAppEnabled ? 1 : 0,
            s.headerWishlistEnabled ? 1 : 0,
            s.headerCartEnabled ? 1 : 0,
          ]
        );
      }
    } catch (err) {
      console.warn("[MySQL] Background sync to MySQL failed:", err);
    }
  }, 1000);
}

export async function deleteOrderFromMysql(orderId: number): Promise<boolean> {
  const pool = getMysqlPool();
  if (!pool) return false;
  try {
    await pool.query("DELETE FROM order_items WHERE orderId = ?", [orderId]);
    await pool.query("DELETE FROM orders WHERE id = ?", [orderId]);
    return true;
  } catch (err) {
    console.warn("[MySQL] Failed to delete order from MySQL:", err);
    return false;
  }
}

export async function deleteCustomerFromMysql(customerId: number): Promise<boolean> {
  const pool = getMysqlPool();
  if (!pool) return false;
  try {
    await pool.query("DELETE FROM customers WHERE id = ?", [customerId]);
    return true;
  } catch (err) {
    console.warn("[MySQL] Failed to delete customer from MySQL:", err);
    return false;
  }
}

