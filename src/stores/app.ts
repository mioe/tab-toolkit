import { acceptHMRUpdate, defineStore } from 'pinia'

const APP_PREFIX = 'tab-toolkit'

export const useAppStore = defineStore('app', () => {
	const settings = useStorage(`${APP_PREFIX}:settings`, {
		strings: 6,
		leftHand: true,
	})
	const soloMode = useStorage(`${APP_PREFIX}:solo-mode`, false)

	const currentNote = useStorage<{
		id: string
		name: string
		bars: any
	}>(`${APP_PREFIX}:current-note`, {
		id: crypto.randomUUID(),
		name: 'Song',
		bars: [{}],
	})
	const currentBarIdx = ref(0)

	const { history, commit, undo, redo } = useManualRefHistory(currentNote, { clone: true, capacity: 30 })

	function nextBar() {
		const size = currentNote.value.bars.length
		if (currentBarIdx.value + 1 < size) {
			currentBarIdx.value += 1
		}
	}

	function prevBar() {
		if (currentBarIdx.value - 1 >= 0) {
			currentBarIdx.value -= 1
		}
	}

	function setCurrentBarIdx(idx: number) {
		currentBarIdx.value = idx
	}

	function setBar() {
		currentNote.value.bars.push({})
		commit()
	}

	function deleteBar() {
		if (currentNote.value.bars.length === 1) { return }
		currentNote.value.bars.splice(currentBarIdx.value, 1)
		commit()
	}

	return {
		settings,
		soloMode,
		currentNote,
		currentBarIdx,
		history,

		undo,
		redo,
		nextBar,
		prevBar,
		setCurrentBarIdx,
		setBar,
		deleteBar,
	}
})

/**
 * HMR (Hot Module Replacement)
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
