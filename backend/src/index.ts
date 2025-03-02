import { Hono } from "hono";
import { serve } from "@hono/node-server";
import tasks from "./routes/tasks";
import { cors } from 'hono/cors'

const app = new Hono();

app.use(
    cors({
        origin: "http://localhost:5173",
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type"],
    })
);

app.get("/", (c) => c.text("Hello Hono!") );

// tasks endpoint
app.route("/tasks", tasks);

// serve the app
serve({
    fetch: app.fetch,
    port: 9000,
})

console.log("Server running on http://localhost:9000");