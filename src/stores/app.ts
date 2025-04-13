import { acceptHMRUpdate, defineStore } from 'pinia'
import { DEFAULT_NAME, DEFAULT_STRING, DEFAULT_BARS, DEFAULT_BAR_IDX } from '~/consts'

const APP_PREFIX = 'tab-toolkit'
const FINGERS = 5

export const useAppStore = defineStore('app', () => {
	const soloMode = useStorage(`${APP_PREFIX}:solo-mode`, false)

	const currentNote = useStorage<{
		id: string
		name: string
		strings: number
		bars: any
	}>(`${APP_PREFIX}:current-note`, {
		id: crypto.randomUUID(),
		name: DEFAULT_NAME,
		strings: DEFAULT_STRING,
		bars: DEFAULT_BARS,
	})
	const currentBarIdx = ref(DEFAULT_BAR_IDX)
	const currentFingerIdx = ref(0)

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

	function setBar(size = 1) {
		if (size > 10) { return }
		for (let i=0; i < size; i++) {
			currentNote.value.bars.push({})
		}
		commit()
	}

	function deleteBar() {
		if (currentNote.value.bars.length === 1) { return }
		if (currentBarIdx.value === currentNote.value.bars.length - 1) {
			currentBarIdx.value--
			currentNote.value.bars.splice(currentNote.value.bars.length - 1, 1)
		} else {
			currentNote.value.bars.splice(currentBarIdx.value, 1)
		}
		commit()
	}

	function setTabInCurrentBarIdx(str: number, tab: any) {
		const currentBar = currentNote.value.bars[currentBarIdx.value]
		const tabWithColor = tab
		if (currentFingerIdx.value > 0 && currentFingerIdx.value < FINGERS) {
			tabWithColor['finger'] = currentFingerIdx.value
		}

		if (currentBar) {
			if (currentBar[`${str}`] && JSON.stringify(currentBar[`${str}`]) === JSON.stringify(tabWithColor)) {
				delete currentBar[`${str}`]
			} else {
				currentBar[`${str}`] = tabWithColor
				if (soloMode.value) {
					if (currentBarIdx.value === currentNote.value.bars.length - 1) {
						setBar()
					}
					nextBar()
				}
			}
			commit()
		}
	}

	function clearBar() {
		currentNote.value.bars[currentBarIdx.value] = {}
		commit()
	}

	function nextFinger() {
		if (currentFingerIdx.value < FINGERS - 1) {
			currentFingerIdx.value++
		} else {
			currentFingerIdx.value = 0
		}
	}

	function setFinger(idx: number) {
		if (currentFingerIdx.value >= FINGERS) { return }
		currentFingerIdx.value = idx
	}

	return {
		soloMode,
		currentNote,
		currentBarIdx,
		history,
		currentFingerIdx,

		undo,
		redo,
		nextBar,
		prevBar,
		setCurrentBarIdx,
		setBar,
		deleteBar,
		setTabInCurrentBarIdx,
		clearBar,
		nextFinger,
		setFinger,
	}
})

/**
 * HMR (Hot Module Replacement)
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
