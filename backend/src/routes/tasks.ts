import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db/connection";
import { tasks } from "../db/schema";
import { eq } from "drizzle-orm";

const taskRouter = new Hono();

let mockTasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false }
];

// task validator
const taskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    completed: z.boolean().optional().default(false)
});

// Create a task(POST / tasks)
taskRouter.post('/',
    zValidator('json',taskSchema), async (c) => {
        const { title, completed } = c.req.valid('json');
        const [insertedTask] = await db.insert(tasks).values({ title, completed });
        return c.json(insertedTask, 201);
    }
);

// Get all tasks(GET /tasks)
taskRouter.get('/', async (c) => {
    const allTasks = await db.select().from(tasks);
    return c.json(allTasks);
});

// Update a task(PUT /tasks/:id)
taskRouter.put('/:id',
    zValidator('json',taskSchema), async (c) => {
        const id = Number(c.req.param('id'));
        const { title, completed } = c.req.valid('json');

        await db.update(tasks).set({ title, completed }).where(eq(tasks.id,(id)));
        return c.json({ success: true })
    }
);

// Delete a task(DELETE /tasks/:id)
taskRouter.delete('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    await db.delete(tasks).where(eq(tasks.id,(id)));
    return c.json({ success: true });
});

export default taskRouter;