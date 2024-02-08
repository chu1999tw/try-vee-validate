import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  plugins: [vue()],
};
