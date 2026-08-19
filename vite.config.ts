import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Runs the files in /api as Web-standard handlers during `npm run dev`, the way
 * Vercel runs them in production. Without this, /api/chat only exists after a
 * deploy and local development has no assistant.
 */
const apiDev = (): Plugin => ({
  name: "local-api-routes",
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req, res, next) => {
      if (!req.url?.startsWith("/api/")) return next();

      void (async () => {
        const route = req.url!.split("?")[0].replace(/^\/api\//, "").replace(/\/+$/, "");
        const file = path.resolve(__dirname, `api/${route}.ts`);
        try {
          const mod = await server.ssrLoadModule(file);
          const handler = mod.default as (r: Request) => Promise<Response>;

          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);

          const headers = new Headers();
          for (const [k, v] of Object.entries(req.headers)) {
            if (typeof v === "string") headers.set(k, v);
            else if (Array.isArray(v)) headers.set(k, v.join(", "));
          }

          const method = req.method ?? "GET";
          const response = await handler(
            new Request(`http://localhost${req.url}`, {
              method,
              headers,
              body: method === "GET" || method === "HEAD" ? undefined : Buffer.concat(chunks),
            })
          );

          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));

          if (response.body) {
            const reader = response.body.getReader();
            for (;;) {
              const { done, value } = await reader.read();
              if (done) break;
              res.write(Buffer.from(value));
              // flush each chunk so streaming is visible in dev
              (res as unknown as { flush?: () => void }).flush?.();
            }
          }
          res.end();
        } catch (err) {
          server.config.logger.error(`[local-api] ${route}: ${String(err)}`);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Local API route failed" }));
        }
      })();
    });
  },
});

export default defineConfig(({ mode }) => {
  // server-only vars (no VITE_ prefix) are not exposed to the client bundle;
  // load them into process.env so the local API routes can read them in dev
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of ["GEMINI_API_KEY", "CHAT_MODEL"]) {
    if (env[key]) process.env[key] = env[key];
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), apiDev(), mode === "development" && componentTagger()].filter(
      Boolean
    ),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
