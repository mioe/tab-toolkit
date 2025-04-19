<script setup lang="ts">
import Progress from '~/components/_common/Progress.vue'
import packageJson from '../../package.json'
const appStore = useAppStore()

const dialogRef = shallowRef<HTMLDialogElement | undefined>()

function open() { dialogRef.value?.showModal() }
function close() { dialogRef.value?.close() }

const btnLogoRef = shallowRef()
const { pressed: btnLogoPressed } = useMousePressed({ target: btnLogoRef })
async function onLongPressLogoCallback() {
	btnLogoPressed.value = false
	appStore.debugSettings.isOpen = !appStore.debugSettings.isOpen
}
onLongPress(btnLogoRef, onLongPressLogoCallback, { delay: 1100 })

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

			<button
				ref="btnLogoRef"
				class="relative"
			>
				<Progress
					v-if="btnLogoPressed"
					class="text-blue-300 border-blue-700 rounded-xl"
				/>

				<img
					src="/tab-toolkit.webp"
					alt="app-icon"
					class="w-[200px]"
				/>
			</button>

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
