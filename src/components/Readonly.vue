<script setup lang="ts">
import Badge from '~/components/_common/Badge.vue'
import Bars from '~/components/_common/Bars.vue'

const appStore = useAppStore()
const { decodedNote } = appStore

onMounted(() => {
	decodedNote()
})
</script>

<template>
	<main
		v-if="appStore.sharedNote"
		class="p-[16px] flex flex-1 flex-col gap-[16px]"
	>
		<header class="text-center">
			<h1>{{ appStore.sharedNote.name }}</h1>
			<p
				v-if="appStore.sharedNote.savedAt"
				class="text-[8px]"
			>
				saved at: {{ new Date(appStore.sharedNote.savedAt).toLocaleString() }}
			</p>
			<p class="text-[8px] text-sky">
				{{ appStore.sharedNote.id }}
			</p>
		</header>

		<Bars
			:bars="appStore.sharedNote.bars"
			:strings="appStore.sharedNote.strings"
			readonly
		/>

		<Badge>
			<p>ff</p>
		</Badge>
	</main>
	<main
		v-else
		class="p-[16px] flex flex-1 flex-col gap-[16px]"
	>
		ERROR
	</main>
</template>
