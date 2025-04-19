<script setup lang="ts">
import Progress from '~/components/_common/Progress.vue'
import packageJson from '../../package.json'
const emit = defineEmits<{
	(e: 'close'): void
}>()

const buildDate = import.meta.env.VITE_BUILD_DATE
const appStore = useAppStore()
const { resetDebugSettings } = appStore

const dialogRef = shallowRef<HTMLDialogElement | undefined>()

function open() { dialogRef.value?.showModal() }
function close() { dialogRef.value?.close() }

const btnLogoRef = shallowRef()
const { pressed: btnLogoPressed } = useMousePressed({ target: btnLogoRef })
async function onLongPressLogoCallback() {
	btnLogoPressed.value = false
	if (appStore.debugSettings.isOpenPanel) {
		resetDebugSettings()
	} else {
		appStore.debugSettings.isOpenPanel = true
	}
	emit('close')
	close()
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
			<div class="flex flex-1">
				<button
					class="btn px-[8px] rounded-l-xl rounded-r-none flex-1"
					@click="close"
				>
					close about
				</button>

				<button
					ref="btnLogoRef"
					class="btn px-[16px] rounded-l-none rounded-r-xl border-l-none relative"
				>
					<Progress
						v-if="btnLogoPressed"
						class="text-gray-900 border-black rounded-xl"
					/>

					debug
				</button>
			</div>

			<img
				src="/tab-toolkit.webp"
				alt="app-icon"
				class="w-[200px]"
			/>

			<div class="text-center">
				<h2>tab-toolkit</h2>
				<p class="text-[8px]">
					v{{ packageJson.version }} - upd: {{ useTimeAgo(new Date(buildDate)) }}
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
