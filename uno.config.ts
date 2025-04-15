import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import {
	defineConfig,
	presetIcons,
	presetWind4,
} from 'unocss'

const BTN_BASE = 'rounded px-[4px] py-[2px] border  cursor-pointer'

export default defineConfig({
	shortcuts: [
		['btn', `${BTN_BASE} bg-white border-gray-200`],
		['btn-active', `${BTN_BASE} bg-blue-700 text-white`],
		['link', 'text-blue underline underline-dashed'],
	],
	rules: [
		['scrolling-touch', { '-webkit-overflow-scrolling': 'touch' }],
		['anime', { transition: 'var(--transition)' }],
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
