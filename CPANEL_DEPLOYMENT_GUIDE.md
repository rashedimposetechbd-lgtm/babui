# cPanel & MySQL Deployment Guide for Babui Shop / Ghorer Bazar

This guide explains step-by-step how to deploy this e-commerce project on any standard **cPanel** hosting with a **MySQL** database.

---

## 📁 Included Files for cPanel

1. **`cpanel_database.sql`** (Root directory):
   Complete MySQL database dump with table schemas, primary/foreign keys, indexes, and full seed catalog (products, categories, subcategories, brands, sliders, admin settings, coupons, etc.). Compatible with MySQL 5.7+, 8.0+, and MariaDB 10.3+.
2. **`app.js` & `server.js`** (Root directory):
   Ready-to-use entry files configured for cPanel's Phusion Passenger / CloudLinux Node.js Selector.
3. **`.env.cpanel.example`**:
   Example environment variables for cPanel.

---

## Step 1: Create the MySQL Database & User in cPanel

1. Log into your **cPanel** control panel.
2. In the **Databases** section, click on **MySQL® Databases** (or **MySQL® Database Wizard**).
3. **Create New Database**:
   - For example, if your cPanel username is `myuser`, enter `babuishop`.
   - The full database name will be: `myuser_babuishop`.
4. **Create Database User**:
   - Enter a username (e.g., `dbadmin` -> full name: `myuser_dbadmin`).
   - Generate a strong password (copy it, you will need it in Step 4).
   - Click **Create User**.
5. **Add User to Database**:
   - Select User: `myuser_dbadmin`
   - Select Database: `myuser_babuishop`
   - Click **Add**.
   - Check the **"ALL PRIVILEGES"** box and click **Make Changes**.

---

## Step 2: Import the Database in phpMyAdmin

1. In cPanel, navigate back to the home page and click on **phpMyAdmin**.
2. On the left sidebar, click on your newly created database (`myuser_babuishop`).
3. Click the **Import** tab in the top navigation bar.
4. Under **File to import**, click **Choose File** and select **`cpanel_database.sql`**.
5. Keep Character set as `utf-8` and format as `SQL`.
6. Scroll to the bottom and click **Import** (or **Go**).
7. You will see a success message showing that all 23 tables have been imported with default products, categories, settings, and admin configuration!

---

## Step 3: Setup Node.js App in cPanel

1. In cPanel, search for and open **"Setup Node.js App"** (Phusion Passenger / CloudLinux).
2. Click **Create Application**.
3. Fill in the fields:
   - **Node.js version**: Select **Node 18.x**, **20.x**, or **22.x** (recommended: Node 20 or higher).
   - **Application mode**: **Production**.
   - **Application root**: Path to your project folder (e.g. `babuishop` or `public_html/shop` or `apps/babuishop`).
   - **Application URL**: Select your domain or subdomain (e.g. `yourdomain.com` or `shop.yourdomain.com`).
   - **Application startup file**: Type `app.js` (or `server.js`).
4. Click **Create** at the top right.

---

## Step 4: Configure Environment Variables in cPanel

In the **Setup Node.js App** page for your application, scroll down to the **Environment Variables** section and click **Add Variable** for each:

| Variable Name | Example Value | Notes |
|---|---|---|
| `NODE_ENV` | `production` | Enables production mode |
| `DB_HOST` | `localhost` | Usually `localhost` or `127.0.0.1` on cPanel |
| `DB_PORT` | `3306` | Default MySQL port |
| `DB_NAME` | `myuser_babuishop` | Your full database name from Step 1 |
| `DB_USER` | `myuser_dbadmin` | Your full database user from Step 1 |
| `DB_PASSWORD` | `YourPassword123!` | Password you set in Step 1 |
| `JWT_SECRET` | `a_long_random_64_char_secret_key` | Any secret string for tokens |

*(Alternative: You can also use a single `DATABASE_URL=mysql://myuser_dbadmin:YourPassword123!@localhost:3306/myuser_babuishop`)*

Click **Save** at the top after adding the variables.

---

## Step 5: Upload Project Files & Build

### Option A: Upload Pre-Built Project (Easiest & Fastest)
1. On your local computer, build the app:
   ```bash
   npm install
   npm run build
   ```
2. Zip all files (including `dist`, `server`, `client`, `package.json`, `app.js`, `server.js`, `node_modules`).
3. Upload the zip via cPanel **File Manager** into your Application Root directory and extract it.

### Option B: Build Directly inside cPanel Terminal
1. Open the cPanel **Terminal** or SSH into your server.
2. Activate your Node environment (cPanel provides the exact command at the top of the "Setup Node.js App" page, for example: `source /home/myuser/nodevenv/babuishop/20/bin/activate && cd /home/myuser/babuishop`).
3. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```

---

## Step 6: Restart & Test the Application

1. In cPanel, return to **"Setup Node.js App"**.
2. Click **Restart** on your application.
3. Click the **Open** URL link.
4. Your website is live with real MySQL database persistence!

---

## 🛠️ Admin Access
- **Admin URL**: `https://yourdomain.com/admin`
- **Default Admin Account**:
  - Email: `admin@ghorerbazar.com`
  - Role: Super Administrator (pre-seeded in `admin_users` table)
