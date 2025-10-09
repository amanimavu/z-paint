import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    server: {
        host: true,
        port: 8000,
        watch: {
            usePolling: true,
            interval: 1000,
        },
    },
    plugins: [tailwindcss(), tsconfigPaths()],
});
