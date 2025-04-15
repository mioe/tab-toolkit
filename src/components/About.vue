<script setup lang="ts">
import packageJson from '../../package.json'

const dialogRef = shallowRef<HTMLDialogElement | undefined>()

function open() { dialogRef.value?.showModal() }
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
		<div class="flex flex-col items-center justify-center">
			<button
				class="btn"
				@click="close"
			>
				close about
			</button>

			<img
				src="/tab-toolkit.webp"
				alt="app-icon"
				class="w-[200px]"
			/>

			<div class="text-center">
				<h2>tab-toolkit</h2>
				<p class="text-[8px]">
					v{{ packageJson.version }}
				</p>
				<a
					href="https://github.com/mioe/tab-toolkit"
					target="_blank"
					class="link"
				>
					source
				</a>
			</div>
		</div>
	</dialog>
</template>
