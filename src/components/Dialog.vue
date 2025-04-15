<script setup lang="ts">
import Progress from '~/components/_common/Progress.vue'
import Badge from '~/components/_common/Badge.vue'
const appStore = useAppStore()
const { removeIdbNote, selectIdbNote, createNewNote, encodedNote, importToIdbNote } = appStore
const dialogRef = shallowRef<HTMLDialogElement | undefined>()

const selectedNoteId = ref<string | null>(null)

const btnNewNoteRef = shallowRef()
const { pressed: btnNewNotePressed } = useMousePressed({ target: btnNewNoteRef })
async function onLongPressNewNoteCallback() {
	btnNewNotePressed.value = false
	await createNewNote()
}
onLongPress(btnNewNoteRef, onLongPressNewNoteCallback, { delay: 1100 })

const btnRemoveRef = shallowRef()
const { pressed: btnRemovePressed } = useMousePressed({ target: btnRemoveRef })
async function onLongPressRemoveCallback() {
	btnRemovePressed.value = false
	if (!selectedNoteId.value) { return }
	await removeIdbNote(selectedNoteId.value)
	selectedNoteId.value = null
}
onLongPress(btnRemoveRef, onLongPressRemoveCallback, { delay: 1100 })

const btnEditRef = shallowRef()
const { pressed: btnEditPressed } = useMousePressed({ target: btnEditRef })
async function onLongPressEditCallback() {
	btnEditPressed.value = false
	if (!selectedNoteId.value) { return }
	await selectIdbNote(selectedNoteId.value)
	dialogRef.value?.close()
}
onLongPress(btnEditRef, onLongPressEditCallback, { delay: 1100 })

const btnShareRef = shallowRef()
const { pressed: btnSharePressed } = useMousePressed({ target: btnShareRef })
async function onLongPressShareCallback() {
	btnSharePressed.value = false
	if (!selectedNoteId.value) { return }
	await encodedNote(selectedNoteId.value)
}
onLongPress(btnShareRef, onLongPressShareCallback, { delay: 1100 })

const inputBase64 = ref('')
const btnImportRef = shallowRef()
const { pressed: btnImportPressed } = useMousePressed({ target: btnImportRef })
async function onLongPressImportCallback() {
	btnImportPressed.value = false
	await importToIdbNote(inputBase64.value)
}
onLongPress(btnImportRef, onLongPressImportCallback, { delay: 1100 })

function open() {
	selectedNoteId.value = null
	dialogRef.value?.showModal()
}

function close() {
	dialogRef.value?.close()
}

defineExpose({
	open,
	close,
})
</script>


<template>
	<Teleport to="body">
		<dialog
			ref="dialogRef"
			class="m-auto border border-gray-200 rounded-2xl h-[100svh] w-full select-none shadow-2xl"
		>
			<div class="p-[16px] flex flex-col gap-[24px]">
				<button
					class="btn px-[8px] rounded-xl flex-1"
					@click="close"
				>
					close dialog
				</button>

				<div class="bg-white flex flex-col">
					<h2 class="pb-[6px]">
						your info (optional):
					</h2>
					<input
						type="text"
						placeholder="author name"
						class="text-[18px] px-[8px] py-[4px] border border-gray-200 rounded-t-xl w-full"
					/>
					<input
						type="text"
						placeholder="author url"
						class="text-[18px] px-[8px] py-[4px] border-b border-l border-r border-gray-200 rounded-b-xl w-full"
					/>
				</div>

				<header class="flex top-[16px] sticky">
					<button
						class="p-[8px] text-center border border-gray-200 rounded-xl border-dashed bg-white flex flex-1 flex-col gap-[2px] cursor-pointer items-center justify-center"
						@click="close"
					>
						<p class="text-[10px] text-gray">
							-- current draft --
						</p>
						<p>
							{{ appStore.currentNote.name }}
						</p>
						<p class="text-[8px]">
							{{ appStore.currentNote.id }}
						</p>
					</button>
				</header>

				<button
					v-if="appStore.currentNote.savedAt"
					ref="btnNewNoteRef"
					class="btn px-[8px] rounded-xl flex-1 relative"
				>
					<Progress
						v-if="btnNewNotePressed"
						class="text-blue-300 border-blue-700 rounded-xl"
					/>
					create new note
				</button>

				<div
					v-if="appStore.db.length"
					class="flex flex-col gap-[8px]"
				>
					<div class="flex gap-[16px] items-center justify-between">
						<h2>saved:</h2>
						<div class="flex flex-wrap gap-[8px]">
							<button
								ref="btnShareRef"
								:disabled="!selectedNoteId"
								class="btn relative"
							>
								<Progress
									v-if="btnSharePressed"
									class="text-blue-300 border-blue-700"
								/>
								share
							</button>
							<button
								ref="btnEditRef"
								:disabled="!selectedNoteId"
								class="btn relative"
							>
								<Progress
									v-if="btnEditPressed"
									class="text-green-300 border-green-700"
								/>
								edit/view
							</button>
							<button
								ref="btnRemoveRef"
								:disabled="!selectedNoteId"
								class="btn relative"
							>
								<Progress
									v-if="btnRemovePressed"
									class="text-red-300 border-red-700"
								/>
								remove
							</button>
						</div>
					</div>
					<article
						v-for="note in appStore.db"
						:key="note.id"
						:class="[
							note.id === appStore.currentNote.id ? 'border-sky border-dashed bg-sky-100' : 'border-gray-200',
							'p-[8px] border rounded-xl flex gap-[16px] justify-between',
						]"
					>
						<label
							:for="note.id"
							class="flex flex-1 flex-col cursor-pointer justify-center"
						>
							<header>
								<p>
									{{ note.name }}
									<span
										v-if="note.id === appStore.currentNote.id"
										class="text-sky"
									>[wip]</span>
								</p>
								<p
									v-if="note.savedAt"
									class="text-[8px]"
								>
									saved at: {{ new Date(note.savedAt).toLocaleString() }}
								</p>
							</header>
							<footer>
								<p class="text-[8px]">
									{{ note.id }}
								</p>
							</footer>
						</label>
						<div class="flex shrink-0 items-center justify-center">
							<input
								:id="note.id"
								v-model="selectedNoteId"
								type="radio"
								:value="note.id"
								class="h-[20px] w-[20px]"
							/>
						</div>
					</article>
				</div>

				<div class="flex flex-col gap-[6px]">
					<h2>import note:</h2>
					<div class="flex">
						<input
							v-model="inputBase64"
							type="text"
							class="text-[18px] px-[8px] py-[4px] border border-gray-200 rounded-l-xl w-full"
							placeholder="paste base64..."
						/>
						<button
							ref="btnImportRef"
							class="btn px-[16px] rounded-l-none rounded-r-xl border-l-none shrink-0 relative"
						>
							<Progress
								v-if="btnImportPressed"
								class="text-green-300 border-green-700"
							/>
							submit
						</button>
					</div>
				</div>

				<Badge />
			</div>
		</dialog>
	</Teleport>
</template>
