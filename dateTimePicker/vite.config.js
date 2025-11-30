import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: "src/index.js", // 直接寫字串
            name: "DatePicker",
            fileName: "index",
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
});
