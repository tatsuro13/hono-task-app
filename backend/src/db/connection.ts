import mysql from 'mysql2/promise';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306, // Docker コンテナ上のポートに合わせる (例: 3306)
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'task_db',
});

export const db = drizzle(pool, {schema,mode: 'default'})