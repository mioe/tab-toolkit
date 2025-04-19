<script setup lang="ts">
const dialogRef = shallowRef<HTMLDialogElement | undefined>()

function open(barIdx: number) {
	console.log('🦕 barIdx', barIdx, isNaN(barIdx))
	if (isNaN(barIdx)) { return }
	dialogRef.value?.showModal()
}
function close() { dialogRef.value?.close() }

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
		<div class="flex flex-col">
			<button
				class="btn"
				@click="close"
			>
				close comment
			</button>
		</div>
	</dialog>
</template>
