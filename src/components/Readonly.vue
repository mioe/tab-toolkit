<script setup lang="ts">
import Badge from '~/components/_common/Badge.vue'
import Bars from '~/components/_common/Bars.vue'
import Progress from '~/components/_common/Progress.vue'
import { UseClipboard } from '@vueuse/components'

const appStore = useAppStore()
const { decodedNote } = appStore

const btnBackRef = shallowRef()
const { pressed: btnBackPressed } = useMousePressed({ target: btnBackRef })
function onLongPressBackCallback() {
	btnBackPressed.value = false
	delete appStore.params.n
}
onLongPress(btnBackRef, onLongPressBackCallback, { delay: 1100 })

const url = ref('')

onMounted(() => {
	decodedNote()
	url.value = location.href
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
			<div class="mb-[16px] px-[16px] py-[8px] border border-gray-200 rounded-xl flex flex-1 flex-wrap gap-[8px]">
				<button
					ref="btnBackRef"
					class="btn relative"
				>
					<Progress
						v-if="btnBackPressed"
						class="text-blue-300 border-blue-700"
					/>
					back
				</button>
				<UseClipboard
					v-slot="{ copy, copied }"
					:source="url"
				>
					<button
						class="btn relative"
						@click="copy()"
					>
						<span
							v-if="copied"
							class="text-green-700 rounded-xl bg-white flex translate-x-[-50%] left-[50%] top-[-24px] absolute z-1"
						>
							DONE!
						</span>
						copy url
					</button>
				</UseClipboard>
				<UseClipboard
					v-slot="{ copy, copied }"
					:source="`${appStore.params.n}`"
				>
					<button
						class="btn relative"
						@click="copy()"
					>
						<span
							v-if="copied"
							class="text-green-700 rounded-xl bg-white flex translate-x-[-50%] left-[50%] top-[-24px] absolute z-1"
						>
							DONE!
						</span>
						copy base64
					</button>
				</UseClipboard>
			</div>
		</Badge>
	</main>
	<main
		v-else
		class="p-[16px] flex flex-1 flex-col gap-[16px]"
	>
		ERROR
	</main>
</template>
