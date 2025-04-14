import path from 'node:path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VitePWA } from 'vite-plugin-pwa'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	console.log('🦕 vite.config.ts/defineConfig', command, mode)

	return {
		base: mode === 'development' ? './' : '/tab-toolkit/',

		resolve: {
			alias: {
				'~/': `${path.resolve(__dirname, 'src')}/`,
			},
		},

		plugins: [
			vue(),

			// https://github.com/unocss/unocss
			Unocss(),

			// https://github.com/antfu/unplugin-auto-import
			AutoImport({
				imports: [
					'vue',
					'@vueuse/core',
				],
				dts: 'src/auto-imports.d.ts',
				dirs: [
					'src/composables',
					'src/stores',
				],
				vueTemplate: true,
			}),

			// https://github.com/antfu/vite-plugin-pwa
			VitePWA({
				registerType: 'autoUpdate',
				injectRegister: 'auto',
				includeAssets: [
					'assets/fonts/**/*.ttf',
					'favicons/*.png',
					'favicons/*.ico',
					'tab-toolkit.webp',
				],
				manifest: {
					name: 'tab-toolkit',
					short_name: 'tab-toolkit',
					theme_color: '#ffffff',
					icons: [
						{
							src: '/favicons/web-app-manifest-192x192.png',
							sizes: '192x192',
							type: 'image/png',
							purpose: 'maskable',
						},
						{
							src: '/favicons/web-app-manifest-512x512.png',
							sizes: '512x512',
							type: 'image/png',
							purpose: 'maskable',
						},
					],
				},
			}),
		],
	}
})
