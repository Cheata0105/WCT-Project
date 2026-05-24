import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/src/main.tsx"],
            refresh: [
                "resources/views/**/*.blade.php",
                "resources/src/**/*.{js,jsx,ts,tsx,css}",
            ],
        }),
        react(),
    ],
});
