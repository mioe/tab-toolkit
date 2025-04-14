<script setup lang="ts">
import Note from '~/components/Note.vue'
import Toolkit from '~/components/Toolkit.vue'
import Readonly from '~/components/Readonly.vue'

const appStore = useAppStore()
const { getIdbNotes } = appStore

const isWaiting = ref(true)

onMounted(async() => {
	await getIdbNotes()
	isWaiting.value = false

	// migrate from draft to v0
	if (localStorage.getItem('tab-toolkit:settings')) {
		localStorage.clear()
	}
})
</script>

<template>
	<div class="flex flex-col min-h-[100svh] select-none relative">
		<div
			v-if="isWaiting"
			class="flex flex-1 items-center justify-center"
		>
			<p>waiting...</p>
		</div>
		<template v-else>
			<template v-if="appStore.params?.n">
				<Readonly />
			</template>
			<template v-else>
				<Note />
				<Toolkit />
			</template>
		</template>
	</div>
</template>
