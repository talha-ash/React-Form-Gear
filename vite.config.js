// vite.config.ts
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import createExternal from "vite-plugin-external";

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    createExternal({
      externals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    }),
  ],
  // resolve: {
  //   alias: {
  //     react: path.resolve(__dirname, "./node_modules/react"),
  //     "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
  //   },
  // },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "react-form-gear",
      fileName: "react-form-gear",
      formats: ["es", "umd"],
    },
    // rollupOptions: {
    //   external: ["react", "react-dom"],
    //   output: {
    //     globals: {
    //       react: "React",
    //       "react-dom": "ReactDOM",
    //     },
    //   },
    // },
  },
});
