import { acceptHMRUpdate, defineStore } from 'pinia'

const APP_PREFIX = 'tab-toolkit'

export const useAppStore = defineStore('app', () => {
	const settings = useStorage(`${APP_PREFIX}:settings`, {
		strings: 6,
		leftHand: true,
	})

	const soloMode = useStorage(`${APP_PREFIX}:solo-mode`, false)

	return {
		settings,
		soloMode,
	}
})

/**
 * HMR (Hot Module Replacement)
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
