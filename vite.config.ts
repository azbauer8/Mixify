import { vitePlugin as remix } from "@remix-run/dev"
import { installGlobals } from "@remix-run/node"
import { remixRoutes } from "remix-routes/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

import router from "./app/router"

installGlobals()

export default defineConfig({
  plugins: [
    remix({
      routes: (defineRoutes) => router(defineRoutes),
    }),
    remixRoutes({
      outDir: "app/types",
    }),
    tsconfigPaths(),
  ],
})
