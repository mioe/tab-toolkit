<script setup lang="ts">
import Dialog from './Dialog.vue'
import { ColorFinger } from '~/consts'
const appStore = useAppStore()
const { setBar, setCurrentBarIdx, saveIdbNote } = appStore
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
			/>
			<button
				v-if="!appStore.currentNote.savedAt"
				class="btn px-[8px] rounded-xl"
				@click="saveIdbNote"
			>
				save
			</button>
		</header>

		<div class="flex flex-wrap gap-x-[8px] gap-y-[16px]">
			<div
				v-for="(bar, idx) in appStore.currentNote.bars"
				:key="`bar-${idx}`"
				:class="[
					{'ring-2 ring-gray-200': appStore.currentBarIdx === idx},
					'flex flex-col-reverse p-[2px] rounded w-[25px] text-center cursor-pointer',
				]"
				@click="setCurrentBarIdx(idx)"
			>
				<div
					v-for="str in appStore.currentNote.strings"
					:key="str"
					class="relative"
				>
					<div class="bg-gray-100 h-[4px] w-[calc(100%+16px)] left-0 top-[calc(50%-2px)] absolute -z-1" />
					<p
						:class="[
							{
								'bg-[--c] bg-opacity-30': bar[str]?.finger,
							},
							'text-center min-h-[22px] rounded-xl',
						]"
						:style="{
							'--c': bar[str]?.finger === 1
								? ColorFinger.finger1
								: bar[str]?.finger === 2
									? ColorFinger.finger2
									: bar[str]?.finger === 3
										? ColorFinger.finger3
										: bar[str]?.finger === 4
											? ColorFinger.finger4
											: undefined,
						}"
					>
						{{ bar[str]?.tab }}
					</p>
				</div>
			</div>
			<div class="flex flex-col min-h-[130px]">
				<button
					class="btn flex-1"
					style="border-bottom: none; border-bottom-right-radius: 0; border-bottom-left-radius: 0;"
					@click="setBar(10)"
				>
					+
				</button>
				<button
					class="btn flex-1"
					style="border-top-right-radius: 0; border-top-left-radius: 0;"
				>
					;
				</button>
			</div>
		</div>

		<Dialog ref="dialogRef" />
	</main>
</template>
