<script setup lang="ts">
const dialogRef = shallowRef<HTMLDialogElement | undefined>()

function open() { dialogRef.value?.showModal() }
function close() { dialogRef.value?.close() }

defineExpose({
	open,
	close,
})
</script>


<template>
	<Teleport to="body">
		<dialog
			ref="dialogRef"
			class="h-[100svh] w-full"
		>
			<div>
				<slot />
			</div>
		</dialog>
	</Teleport>
</template>
