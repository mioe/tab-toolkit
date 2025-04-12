<script setup lang="ts">
const appStore = useAppStore()
const { setBar, setCurrentBarIdx } = appStore
</script>

<template>
	<main class="flex flex-row">
		<div
			v-for="(bar, idx) in appStore.currentNote.bars"
			:key="`bar-${idx}`"
			:class="{ 'btn-active': appStore.currentBarIdx === idx }"
			@click="setCurrentBarIdx(idx)"
		>
			{{ bar }}
		</div>
		<button
			class="btn"
			@click="setBar"
		>
			+
		</button>
	</main>
</template>
