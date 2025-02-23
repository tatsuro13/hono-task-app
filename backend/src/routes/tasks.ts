import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const tasks = new Hono();

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

// get all tasks endpoint
tasks.get("/", (c) => c.json(mockTasks));

// new task add endpoint
tasks.post("/", zValidator('json',taskSchema), (c) => {
    const { title, completed } =  c.req.valid('json');
    console.log('Received Body:', { title, completed });

    // create new task
    const newTask = {
        id: mockTasks.length + 1,
        title,
        completed
    };
    mockTasks.push(newTask);

    return c.json(newTask, 201); // 201 Created
});

export default tasks;