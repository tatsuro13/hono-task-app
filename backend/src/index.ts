import { Hono } from "hono";
import { serve } from "@hono/node-server";
import tasks from "./routes/tasks";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!") );

// tasks endpoint
app.route("/tasks", tasks);

// serve the app
serve({
    fetch: app.fetch,
    port: 9000,
})

console.log("Server running on http://localhost:9000");