<script setup lang="ts">
import Note from '~/components/Note.vue'
import Toolkit from '~/components/Toolkit.vue'
import Readonly from '~/components/Readonly.vue'
import Debug from '~/components/Debug.vue'

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
	<div
		:class="[
			appStore.debugSettings.isBottomPanel ? 'flex-col' : 'flex-col-reverse',
			'flex',
		]"
	>
		<div
			:class="[
				{
					'flex-col gap-[24px]': appStore.orientation === 'portrait-primary',
				},
				'flex min-h-[100svh] select-none relative',
			]"
		>
			<div
				v-if="appStore.debugSettings.showOrientation"
				class="text-white p-[16px] bg-blue translate-[-50%] left-[50%] top-[50%] fixed z-9"
			>
				{{ appStore.orientation }}
			</div>

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

		<Debug v-if="appStore.debugSettings.isOpenPanel" />
	</div>
</template>
