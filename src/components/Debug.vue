<script setup lang="ts">
const appStore = useAppStore()
const buildDate = import.meta.env.VITE_BUILD_DATE
</script>

<template>
	<div class="text-white p-[16px] bg-black flex flex-col gap-[16px] w-full relative z-9">
		<header class="flex gap-[16px] items-center justify-between">
			<div>
				<p>Debug</p>
				<span class="text-[8px]">{{ buildDate }}</span>
			</div>

			<div>
				<button
					class="debug-btn"
					@click="appStore.debugSettings.isBottomPanel = !appStore.debugSettings.isBottomPanel"
				>
					{{ appStore.debugSettings.isBottomPanel ? 'up to top' : 'down to bottom' }}
				</button>
			</div>
		</header>

		<div class="flex flex-wrap gap-[16px]">
			<button
				class="debug-btn"
				@click="appStore.debugSettings.showOrientation = !appStore.debugSettings.showOrientation"
			>
				show orientation
			</button>
		</div>
	</div>
</template>
