<script setup lang="ts">
import Note from '~/components/Note.vue'
import Toolkit from '~/components/Toolkit.vue'

const appStore = useAppStore()
const { getIdbNotes } = appStore

onMounted(async() => {
	await getIdbNotes()
})
</script>

<template>
	<div class="flex flex-col min-h-[100svh] select-none relative">
		<Note />
		<Toolkit />
	</div>
</template>
