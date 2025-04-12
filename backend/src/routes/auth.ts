import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {z} from "zod";
import { db } from "../db/connection";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const authRouter = new Hono();

const registerSchema = z.object({
    userName: z.string().min(3, { message: "ユーザ名は3文字以上である必要があります" }),
    password: z.string().min(6, { message: "パスワードは6文字以上である必要があります" }),
});

authRouter.post(
    "/register",zValidator("json", registerSchema), async (c) => {
        const { userName, password } = c.req.valid("json");

        const existingUser = await db.select().from(users).where(eq(users.userName, userName))
        if(existingUser.length > 0) {
            return c.json({ message: "ユーザ名は既に使用されています" }, 400);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const [result] = await db.insert(users).values({
            userName,
            passwordHash,
        })

        //JWTを生成
        const token = jwt.sign({
            id: result.insertId,
            userName,
        }, process.env.JWT_SECRET! as string, {
            expiresIn: "1h",
        });
        return c.json({id: result.insertId,userName,token,}, 201);
    }
);

export default authRouter;