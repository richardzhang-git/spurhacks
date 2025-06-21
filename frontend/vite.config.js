import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss()
	],
	build: {
		rollupOptions: {
			input: {
				main: 'index.html',
				bestbefore: 'bestbefore/index.html',
				getitem: 'getitem/index.html',
				home: 'home/index.html'
			},
		},
	},
});