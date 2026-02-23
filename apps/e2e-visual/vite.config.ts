import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			// The components package uses `@/lib/utils` which maps to its own src/
			'@': path.resolve(__dirname, '../../packages/components/src'),
		},
	},
});
