import { entries as entriesIdb, set as setIdb, del as delIdb, update as updateIdb } from 'idb-keyval'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Note, Bar, Tab } from '~/consts'
import { DEFAULT_NAME, DEFAULT_STRING, DEFAULT_BARS, DEFAULT_BAR_IDX } from '~/consts'

const APP_PREFIX = 'tab-toolkit'
const FINGERS = 5

const DEFAULT_NOTE_STRING_WITHOUT_ID = JSON.stringify({
	name: DEFAULT_NAME,
	strings: DEFAULT_STRING,
	savedAt: null,
	bars: DEFAULT_BARS,
})

export const useAppStore = defineStore('app', () => {
	const params = useUrlSearchParams('history')

	const db = ref<Note[]>([])

	const soloMode = useStorage(`${APP_PREFIX}:solo-mode`, false)

	const currentNote = useStorage<Note>(`${APP_PREFIX}:current-note`, {
		id: crypto.randomUUID(),
		name: DEFAULT_NAME,
		strings: DEFAULT_STRING,
		savedAt: null,
		bars: JSON.parse(DEFAULT_NOTE_STRING_WITHOUT_ID).bars,
	})
	const currentBarIdx = ref(DEFAULT_BAR_IDX)
	const currentFingerIdx = ref(0)
	const sharedNote = ref<Note | null>(null)

	const historyRef = useManualRefHistory(currentNote, { clone: true, capacity: 30 })
	const { commit } = historyRef

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

	function setSeparator() {
		const currentBar = currentNote.value.bars[currentBarIdx.value]
		if (currentBar) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			currentNote.value.bars[currentBarIdx.value] = {
				separator: true,
			}
			commit()
		}
	}

	function setTabInCurrentBarIdx(str: number, tab: Tab) {
		const currentBar = currentNote.value.bars[currentBarIdx.value]
		const tabWithColor = tab
		if (currentFingerIdx.value > 0 && currentFingerIdx.value < FINGERS) {
			tabWithColor['finger'] = currentFingerIdx.value
		}

		if (currentBar.separator) {
			delete currentBar.separator
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

	function setNote(
		name: string,
		strings: number,
		bars: Bar[],
		id: string = crypto.randomUUID(),
		savedAt: number | null = null,
	) {
		currentNote.value.id = id
		currentNote.value.name = name
		currentNote.value.strings = strings
		currentNote.value.savedAt = savedAt
		currentNote.value.bars = bars

		currentBarIdx.value = DEFAULT_BAR_IDX

		historyRef.clear()
	}

	function setDefaultNote() {
		setNote(DEFAULT_NAME, DEFAULT_STRING, JSON.parse(DEFAULT_NOTE_STRING_WITHOUT_ID).bars)
	}

	async function getIdbNotes() {
		const result = await entriesIdb()
		result.forEach(([key, val]) => {
			const note = { id: key, ...val } as Note
			db.value.push(note)
		})
	}

	function getCloneCurrentNote(withoutId = true) {
		const clone = JSON.parse(JSON.stringify(currentNote.value))
		if (withoutId) { delete clone.id }
		return clone
	}

	async function savedDraftNote() {
		if (!currentNote.value.savedAt) {
			const cloneCurrentNote = getCloneCurrentNote()
			if (JSON.stringify(cloneCurrentNote) !== DEFAULT_NOTE_STRING_WITHOUT_ID) {
				currentNote.value.name = `[draft] ${currentNote.value.name}`
				await saveIdbNote()
			}
		} else {
			const fNote = db.value.find((note) => note.id === currentNote.value.id)
			const cloneStrFNote = JSON.stringify(fNote)
			const cloneStrCurrentNote = JSON.stringify(getCloneCurrentNote(false))
			if (cloneStrFNote !== cloneStrCurrentNote) {
				await updateIdbNote()
			}
		}
	}

	async function createNewNote() {
		await savedDraftNote()
		setDefaultNote()
	}

	async function saveIdbNote() {
		currentNote.value.savedAt = Date.now()
		const clone = getCloneCurrentNote()
		await setIdb(currentNote.value.id, clone)
		db.value.push(JSON.parse(JSON.stringify(currentNote.value)))
		setDefaultNote()
	}

	async function updateIdbNote() {
		currentNote.value.savedAt = Date.now()
		const clone = getCloneCurrentNote()
		await updateIdb(currentNote.value.id, (val) => ({
			...val,
			name: clone.name,
			strings: clone.strings,
			bars: clone.bars,
			savedAt: clone.savedAt,
		}))
		const fNote = db.value.find((note) => note.id === currentNote.value.id)
		if (fNote) {
			fNote.name = currentNote.value.name
			fNote.strings = currentNote.value.strings
			fNote.bars = currentNote.value.bars
			fNote.savedAt = Date.now()
		}
	}

	async function removeIdbNote(noteId: string) {
		const fNoteIdx = db.value.findIndex((note) => note.id === noteId)
		db.value.splice(fNoteIdx, 1)
		await delIdb(noteId)
		if (noteId === currentNote.value.id) {
			setDefaultNote()
		}
	}

	async function selectIdbNote(noteId: string) {
		await savedDraftNote()

		const fNote = db.value.find((note) => note.id === noteId)
		if (fNote) {
			setNote(fNote.name, fNote.strings, fNote.bars, fNote.id, fNote.savedAt)
		}
	}

	async function importToIdbNote(base64: string) {
		await savedDraftNote()

		try {
			if (base64) {
				const note = JSON.parse(atob(decodeURIComponent(base64)))
				if (note && note.bars && note.name && note.strings) {
					const newNoteId = crypto.randomUUID()
					const newNote = {
						name: `[via import] ${note.name}`,
						strings: note.strings,
						savedAt: Date.now(),
						bars: note.bars,
					}
					await setIdb(newNoteId, newNote)
					db.value.push({
						id: newNoteId,
						...newNote,
					})
				}
			}
		} catch (err) {
			console.error(err)
		}
	}

	async function encodedNote(noteId: string) {
		await savedDraftNote()

		const fNote = db.value.find((note) => note.id === noteId)
		if (fNote) {
			const cloneStrFNote = JSON.stringify(fNote)
			const encoded = btoa(cloneStrFNote)
			params.n = encoded
		}
	}

	async function decodedNote() {
		try {
			if (params?.n) {
				const strNote = atob(decodeURIComponent(params.n as string))
				sharedNote.value = JSON.parse(strNote)
			}
		} catch (err) {
			console.error(err)
			delete params.n
		}
	}

	return {
		params,
		db,
		soloMode,
		currentNote,
		currentBarIdx,
		historyRef,
		currentFingerIdx,
		sharedNote,

		nextBar,
		prevBar,
		setCurrentBarIdx,
		setBar,
		deleteBar,
		setTabInCurrentBarIdx,
		clearBar,
		nextFinger,
		setFinger,
		saveIdbNote,
		getIdbNotes,
		removeIdbNote,
		selectIdbNote,
		updateIdbNote,
		createNewNote,
		encodedNote,
		decodedNote,
		setSeparator,
		importToIdbNote,
	}
})

/**
 * HMR (Hot Module Replacement)
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
