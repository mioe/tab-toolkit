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
				class="px-[8px] py-[4px] border border-gray-200 rounded-xl w-full"
			/>
		</header>

		<div class="flex flex-wrap gap-x-[8px] gap-y-[16px]">
			<div
				v-for="(bar, idx) in appStore.currentNote.bars"
				:key="`bar-${idx}`"
				:class="[
					{'ring-2 ring-blue-700': appStore.currentBarIdx === idx},
					'flex flex-col-reverse px-[4px] py-[2px] rounded w-[25px] text-center',
				]"
				@click="setCurrentBarIdx(idx)"
			>
				<div
					v-for="str in appStore.settings.strings"
					:key="str"
					class="relative"
				>
					<div class="bg-gray-200 h-[2px] w-[calc(100%+16px)] left-0 top-[50%] absolute -z-1" />
					<p class="flex min-h-[22px]">
						00
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
