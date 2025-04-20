<script setup lang="ts">
const appStore = useAppStore()
const { setComment } = appStore
const dialogRef = shallowRef<HTMLDialogElement | undefined>()

const comment = ref('')
const currentBarIdx = ref()

function open(barIdx: number) {
	if (isNaN(barIdx)) { return }
	currentBarIdx.value = barIdx
	comment.value = appStore.currentNote.bars[barIdx].comment ?? ''
	dialogRef.value?.showModal()
}
function close() { dialogRef.value?.close() }

function clearComment() {
	if (isNaN(currentBarIdx.value)) { return }
	setComment(currentBarIdx.value, '')
	close()
}

function updateComment() {
	if (isNaN(currentBarIdx.value)) { return }
	setComment(currentBarIdx.value, comment.value)
	close()
}

defineExpose({
	open,
	close,
})
</script>

<template>
	<dialog
		ref="dialogRef"
		class="m-auto p-[16px] border border-gray-200 rounded-2xl select-none shadow-2xl"
	>
		<div class="flex flex-col gap-[16px]">
			<div class="flex flex-1">
				<button
					class="btn px-[8px] rounded-l-xl rounded-r-none flex-1"
					@click="close"
				>
					close comment
				</button>

				<button
					class="btn px-[16px] rounded-l-none rounded-r-xl border-l-none relative"
					:disabled="!comment.length"
					@click="clearComment"
				>
					clear
				</button>
			</div>

			<form
				class="flex"
				@submit.prevent="updateComment"
			>
				<input
					v-model="comment"
					type="text"
					class="text-[18px] px-[8px] py-[4px] border border-gray-200 rounded-l-xl w-full"
					placeholder="comment"
				/>
				<button
					class="btn px-[16px] rounded-l-none rounded-r-xl border-l-none shrink-0 relative"
					:disabled="!comment.length"
					type="submit"
				>
					submit
				</button>
			</form>
		</div>
	</dialog>
</template>
