import { serve } from "bun";
import index from "./index.html";
import { renderServerSideTest } from "./components/serverside/ServerSideTest";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,
    "/serverside": async (req) => {
      const stream = await renderServerSideTest("Hello from server!")
      return new Response(stream, {
          headers: { "Content-Type": "text/html" },
      })
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
