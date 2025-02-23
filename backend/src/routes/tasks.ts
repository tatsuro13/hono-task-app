import { Hono } from "hono";

const tasks = new Hono();

const mockTasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false }
];

tasks.get("/", (c) => c.json(mockTasks));

export default tasks;