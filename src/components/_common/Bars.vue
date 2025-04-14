<script setup lang="ts">
import type { Bar } from '~/consts'
import { ColorFinger } from '~/consts'

const { readonly = false } = defineProps<{
	bars: Bar[]
	strings: number
	currentBarIdx?: number
	readonly?: boolean
}>()

const emit = defineEmits<{
	(e: 'click-bar', idx: number): void
}>()
</script>

<template>
	<div class="flex flex-wrap gap-x-[8px] gap-y-[16px]">
		<div class="mr-[-8px] bg-gray-300 w-[3px]">
			<div
				v-for="str in strings"
				:key="str"
				class="h-[22px]"
			></div>
		</div>

		<div
			v-for="(bar, idx) in bars"
			:key="`bar-${idx}`"
			:class="[
				{
					'ring-2 ring-gray-200': currentBarIdx === idx,
					'cursor-pointer': !readonly,
				},
				'flex flex-col-reverse p-[2px] rounded w-[25px] text-center relative',
			]"
			@click="emit('click-bar', idx)"
		>
			<template v-if="bar.separator">
				<div
					v-for="str in strings"
					:key="str"
					class="relative"
				>
					<div class="bg-gray-100 h-[4px] w-[calc(100%+16px)] left-0 top-[calc(50%-2px)] absolute -z-1" />
					<div class="h-[22px]">
					</div>
				</div>
				<div class="bg-gray-300 w-[3px] translate-x-[-50%] left-[50%] absolute">
					<div
						v-for="str in strings"
						:key="str"
						class="h-[22px]"
					></div>
				</div>
			</template>
			<template v-else>
				<div
					v-for="str in strings"
					:key="str"
					class="relative"
				>
					<div class="bg-gray-100 h-[4px] w-[calc(100%+16px)] left-0 top-[calc(50%-2px)] absolute -z-1" />
					<p
						:class="[
							{
								'bg-[--c] bg-opacity-30': bar[str]?.finger,
							},
							'text-center h-[22px] rounded-xl',
						]"
						:style="{
							'--c': bar[str]?.finger === 1
								? ColorFinger.finger1
								: bar[str]?.finger === 2
									? ColorFinger.finger2
									: bar[str]?.finger === 3
										? ColorFinger.finger3
										: bar[str]?.finger === 4
											? ColorFinger.finger4
											: undefined,
						}"
					>
						{{ bar[str]?.tab }}
					</p>
				</div>
			</template>
		</div>

		<slot />

		<div
			v-if="readonly"
			class="ml-[8px] bg-gray-300 w-[3px]"
		>
			<div
				v-for="str in strings"
				:key="str"
				class="h-[22px]"
			></div>
		</div>
	</div>
</template>
