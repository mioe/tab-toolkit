<script setup lang="ts">
const appStore = useAppStore()
const { setBar, setCurrentBarIdx } = appStore
</script>

<template>
	<main class="p-[16px] flex flex-col gap-[16px]">
		<header>
			<input
				v-model="appStore.currentNote.name"
				type="text"
				class="text-[18px] px-[8px] py-[4px] border border-gray-200 rounded-xl w-full"
			/>
		</header>

		<div>
			<div class="bg-[#e64953] h-4 w-4"></div>
			<div class="bg-[#74de6b] h-4 w-4"></div>
			<div class="bg-[#52b5f9] h-4 w-4"></div>
			<div class="bg-[#fadf62] h-4 w-4"></div>
		</div>

		<div class="flex flex-wrap gap-x-[8px] gap-y-[16px]">
			<div
				v-for="(bar, idx) in appStore.currentNote.bars"
				:key="`bar-${idx}`"
				:class="[
					{'ring-2 ring-gray-200': appStore.currentBarIdx === idx},
					'flex flex-col-reverse px-[4px] py-[2px] rounded w-[25px] text-center cursor-pointer',
				]"
				@click="setCurrentBarIdx(idx)"
			>
				<div
					v-for="str in appStore.settings.strings"
					:key="str"
					class="relative"
				>
					<div class="bg-gray-100 h-[4px] w-[calc(100%+16px)] left-0 top-[calc(50%-2px)] absolute -z-1" />
					<p class="text-center min-h-[22px]">
						{{ bar[str]?.tab }}
					</p>
				</div>
			</div>
			<button
				class="btn min-h-[130px]"
				@click="setBar"
			>
				+
			</button>
		</div>
	</main>
</template>
