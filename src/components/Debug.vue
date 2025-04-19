<script setup lang="ts">
const appStore = useAppStore()
</script>

<template>
	<div class="text-white p-[16px] bg-black flex flex-col gap-[16px] w-full relative z-9">
		<header class="flex gap-[16px] items-center justify-between">
			<p>Debug</p>

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
