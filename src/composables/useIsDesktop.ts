export function useIsDesktop() {
	const isDesktop = ref(false)

	onMounted(() => {
		const userAgent = navigator.userAgent.toLowerCase()
		const isMobileUA = /android|iphone|ipad|ipod|mobile|touch/.test(userAgent)

		const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
		const hasMouse = matchMedia('(pointer: fine)').matches

		isDesktop.value = !isMobileUA && hasMouse && !hasTouch
	})

	return { isDesktop }
}
