import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

/** Vite configuration for the React frontend application. */
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
    },
    preview: {
        port: 5173,
    },
});
