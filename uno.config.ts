import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import {
	defineConfig,
	presetIcons,
	presetWind4,
} from 'unocss'

export default defineConfig({
	shortcuts: [
		['btn', 'rounded bg-blue-700 px-4 py-1 text-white'],
	],
	rules: [
		['scrolling-touch', { '-webkit-overflow-scrolling': 'touch' }],
	],
	presets: [
		presetWind4(),
		presetIcons({
			warn: true,
			collections: {
				mi: FileSystemIconLoader('./src/assets/icons'),
			},
		}),
	],
})
