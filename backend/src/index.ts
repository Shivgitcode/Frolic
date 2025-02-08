import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { config } from "dotenv";
import videoupload from "./routes/uploads";

config();
const app = new Hono();

app.route("/api/v1", videoupload);
app.get("/", (c) => {
  return c.text("hello");
});

serve(
  {
    fetch: app.fetch,
    port: process.env.PORT,
  },
  (i) => {
    console.log(`server running on port ${i.port}`);
  }
);
