import { boolean, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const tasks = mysqlTable(
    'tasks',
    {
        id: serial('id').primaryKey(),
        title: varchar('title', { length: 255 }).notNull(),
        completed: boolean('completed').notNull().default(false),
    }
)

export const users = mysqlTable(
    'users',
    {
        id: serial('id').primaryKey(),
        name: varchar('name', { length: 255 }).unique().notNull(),
        passwordHash: varchar('password_hash', { length: 255 }).unique().notNull(),
    }
)