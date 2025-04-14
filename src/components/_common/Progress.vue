<script setup lang="ts">
const { height = 27 } = defineProps<{
	height?: number
}>()
</script>

<template>
	<div
		class="border bg-white flex w-full relative overflow-hidden"
		:style="{
			height: `${height}px`,
		}"
	>
		<div
			class="progress bg-current h-full w-full left-0 top-0 absolute"
		/>
	</div>
</template>

<style>
.progress {
	animation-duration: 1s;
	animation-name: progress;
}

@keyframes progress {
	from {
		width: 0%;
	}

	to {
		width: 100%;
	}
}
</style>
