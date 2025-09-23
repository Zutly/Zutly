import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dyadComponentTagger from '@dyad-sh/react-vite-component-tagger';
import history from 'connect-history-api-fallback'; // Import connect-history-api-fallback

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    // Add middleware for history API fallback
    // This ensures that all non-static file requests fall back to index.html
    // allowing client-side routing to work on refresh.
    middleware: [
      history(),
    ],
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));