import mysql from "mysql2/promise";
import type { Pool, PoolOptions, RowDataPacket } from "mysql2/promise";

let pool: Pool | null = null;
let isInitialized = false;

export interface MysqlConfig {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
  socketPath?: string;
  uri?: string;
}

export function getMysqlConfig(): MysqlConfig | null {
  const dbUrl = process.env.DATABASE_URL;

  // Check if DATABASE_URL is provided and is a MySQL connection string
  if (dbUrl && (dbUrl.startsWith("mysql://") || dbUrl.startsWith("mysql2://"))) {
    return { uri: dbUrl };
  }

  // Check individual environment variables (typical for cPanel NodeJS App setup)
  const host = process.env.DB_HOST || (process.env.DB_NAME ? "localhost" : undefined);
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD || process.env.DB_PASS;
  const database = process.env.DB_NAME || process.env.DB_DATABASE;
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
  const socketPath = process.env.DB_SOCKET_PATH;

  if (database && user) {
    return {
      host: socketPath ? undefined : (host || "localhost"),
      port: socketPath ? undefined : port,
      user,
      password: password || "",
      database,
      socketPath: socketPath || undefined,
    };
  }

  return null;
}

export function getMysqlPool(): Pool | null {
  if (pool) return pool;
  if (isInitialized) return null;

  const config = getMysqlConfig();
  if (!config) {
    isInitialized = true;
    console.log("[MySQL] No MySQL credentials configured in environment. Using disk JSON store fallback.");
    return null;
  }

  try {
    const poolOptions: PoolOptions = {
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      charset: "utf8mb4",
    };

    if (config.uri) {
      pool = mysql.createPool({ ...poolOptions, uri: config.uri });
    } else {
      pool = mysql.createPool({
        ...poolOptions,
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
        socketPath: config.socketPath,
      });
    }

    isInitialized = true;
    console.log(
      `[MySQL] Initialized MySQL connection pool for database: ${config.database || (config.uri ? "DATABASE_URL" : "default")}`
    );
    return pool;
  } catch (err) {
    console.warn("[MySQL] Failed to initialize MySQL pool:", err);
    isInitialized = true;
    return null;
  }
}

export async function testMysqlConnection(): Promise<{ success: boolean; message: string; version?: string }> {
  const p = getMysqlPool();
  if (!p) {
    return {
      success: false,
      message: "MySQL is not configured. Set DB_USER, DB_NAME, DB_PASSWORD or DATABASE_URL in your environment.",
    };
  }

  try {
    const [rows] = await p.query<RowDataPacket[]>("SELECT VERSION() AS version, 1 AS ping");
    const version = rows[0]?.version || "Unknown";
    return {
      success: true,
      message: `Successfully connected to MySQL database on cPanel (Server Version: ${version})`,
      version,
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Connection error: ${err.message || String(err)}`,
    };
  }
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const p = getMysqlPool();
  if (!p) throw new Error("MySQL pool not initialized");
  const [results] = await p.query(sql, params);
  return results as T[];
}

export async function execute(sql: string, params?: any[]): Promise<any> {
  const p = getMysqlPool();
  if (!p) throw new Error("MySQL pool not initialized");
  const [result] = await p.execute(sql, params);
  return result;
}
