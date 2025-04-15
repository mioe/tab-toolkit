<script setup lang="ts">
import Dialog from './Dialog.vue'
import Bars from '~/components/_common/Bars.vue'
const appStore = useAppStore()
const { setBar, setCurrentBarIdx, saveIdbNote, updateIdbNote } = appStore
const dialogRef = shallowRef<InstanceType<typeof Dialog> | undefined>()
</script>

<template>
	<main class="p-[16px] flex flex-col gap-[16px]">
		<button
			class="btn px-[8px] rounded-xl flex-1"
			@click="dialogRef?.open"
		>
			open dialog
		</button>

		<header class="flex gap-[8px]">
			<input
				v-model="appStore.currentNote.name"
				type="text"
				class="text-[18px] px-[8px] py-[4px] border border-gray-200 rounded-xl w-full"
				placeholder="note name"
			/>
			<button
				v-if="appStore.currentNote.savedAt"
				class="btn px-[8px] rounded-xl"
				@click="updateIdbNote"
			>
				update
			</button>
			<button
				v-else
				class="btn px-[8px] rounded-xl"
				@click="saveIdbNote"
			>
				save
			</button>
		</header>

		<Bars
			:bars="appStore.currentNote.bars"
			:strings="appStore.currentNote.strings"
			:current-bar-idx="appStore.currentBarIdx"
			@click-bar="setCurrentBarIdx($event)"
		>
			<div class="flex flex-col min-h-[130px]">
				<button
					class="btn flex-1"
					@click="setBar(10)"
				>
					+
				</button>
			</div>
		</Bars>

		<Dialog ref="dialogRef" />
	</main>
</template>
