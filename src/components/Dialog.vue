<script setup lang="ts">
import Progress from '~/components/_common/Progress.vue'
const appStore = useAppStore()
const { removeIdbNote, selectIdbNote } = appStore
const dialogRef = shallowRef<HTMLDialogElement | undefined>()

const selectedNoteId = ref<string | null>(null)

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
}
onLongPress(btnEditRef, onLongPressEditCallback, { delay: 1100 })

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
						<p class="text-[8px] text-sky">
							{{ appStore.currentNote.id }}
						</p>
					</button>
				</header>

				<div
					v-if="appStore.db.length"
					class="flex flex-col gap-[8px]"
				>
					<div class="pb-[8px] flex gap-[16px] items-center justify-between">
						<h2 class="text-center">
							saved:
						</h2>
						<div class="flex flex-wrap gap-[8px]">
							<button
								disabled
								class="btn"
							>
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
								edit
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
						class="p-[8px] border border-gray-200 rounded-xl flex gap-[16px] justify-between"
					>
						<label
							:for="note.id"
							class="flex flex-1 flex-col cursor-pointer justify-center"
						>
							<header>
								<p>{{ note.name }}</p>
								<p
									v-if="note.savedAt"
									class="text-[8px]"
								>
									saved at: {{ new Date(note.savedAt).toLocaleString() }}
								</p>
							</header>
							<footer>
								<p class="text-[8px] text-sky">
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

				<footer class="mt-auto flex bottom-[16px] justify-center sticky">
					<p class="text-[10px] px-[8px] py-[1px] rounded-full bg-white shadow">
						tab-toolkit_v0
						<a
							href="https://github.com/mioe/tab-toolkit"
							target="_blank"
							class="text-green-600 underline underline-dashed"
						>
							by mioe
						</a>
					</p>
				</footer>
			</div>
		</dialog>
	</Teleport>
</template>
