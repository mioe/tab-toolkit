<script setup lang="ts">
import Badge from '~/components/_common/Badge.vue'
import Bars from '~/components/_common/Bars.vue'
import Progress from '~/components/_common/Progress.vue'
import HandIcon from '~/components/_common/HandIcon.vue'
import ConfettiAlert from '~/components/_common/ConfettiAlert.vue'
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
		:class="[
			{
				'pl-safe pr-[16px]': appStore.orientation === 'landscape-primary',
				'pr-safe pl-[16px]': appStore.orientation === 'landscape-secondary',
				'px-[16px]': (appStore.orientation === 'portrait-primary' || appStore.orientation === 'portrait-secondary'),
			},
			'pt-[16px] pb-safe flex flex-1 flex-col gap-[16px]',
		]"
	>
		<header class="text-center">
			<h1>
				{{ appStore.sharedNote.name }}
				<template v-if="appStore.sharedNote.authorName">
					<template v-if="appStore.sharedNote.authorUrl">
						<a
							:href="appStore.sharedNote.authorUrl"
							target="_blank"
							class="link"
						>
							by {{ appStore.sharedNote.authorName }}
						</a>
					</template>
					<template v-else>
						by {{ appStore.sharedNote.authorName }}
					</template>
				</template>
			</h1>
			<p
				v-if="appStore.sharedNote.savedAt"
				class="text-[8px]"
			>
				saved at: {{ new Date(appStore.sharedNote.savedAt).toLocaleString() }}
			</p>
			<p class="text-[8px]">
				{{ appStore.sharedNote.id }}
			</p>
		</header>

		<Bars
			:bars="appStore.sharedNote.bars"
			:strings="appStore.sharedNote.strings"
			readonly
		/>

		<Badge>
			<div class="mb-[16px] px-[16px] py-[8px] border border-gray-200 rounded-xl bg-white flex flex-1 flex-wrap gap-[8px] relative">
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
						:disabled="copied"
						@click="copy()"
					>
						copy url
					</button>
					<ConfettiAlert
						v-if="copied"
						msg="copying url was successful!"
					/>
				</UseClipboard>
				<UseClipboard
					v-slot="{ copy, copied }"
					:source="`${appStore.params.n}`"
				>
					<button
						class="btn relative"
						:disabled="copied"
						@click="copy()"
					>
						copy base64
					</button>
					<ConfettiAlert
						v-if="copied"
						msg="copying base64 was successful!"
					/>
				</UseClipboard>

				<div class="trans text-gray-300 h-[60px] w-[60px] right-[-24px] top-[20px] absolute">
					<HandIcon readonly />
				</div>
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
