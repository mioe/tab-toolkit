<script setup lang="ts">
import JSConfetti from 'js-confetti'

const { msg = 'hello world' } = defineProps<{
	msg?: string
}>()

onMounted(() => {
	const jsConfetti = new JSConfetti()
	jsConfetti.addConfetti()
})
</script>

<template>
	<div
		class="text-blue px-[16px] py-[8px] text-center rounded-2xl bg-white ring-2 ring-sky shadow-2xl translate-[-50%] left-[50%] top-[50%] fixed z-9"
	>
		<p>🐣🐥🐥</p>
		<p>{{ msg }}</p>
	</div>
</template>


