<script setup lang="ts">
import type { Bar } from '~/consts'
import { ColorFinger } from '~/consts'

const { readonly = false, currentBarIdx } = defineProps<{
	bars: Bar[]
	strings: number
	currentBarIdx?: number
	readonly?: boolean
}>()

const emit = defineEmits<{
	(e: 'change', idx: number): void
}>()

const btnBarsRef = shallowRef()
async function onLongPressBarsCallback() {
	if (readonly) { return }
	console.log('🦕 gg', currentBarIdx)
}
onLongPress(btnBarsRef, onLongPressBarsCallback, { delay: 1100 })

const isDragging = ref(false)

function handleClick(e: MouseEvent | TouchEvent) {
	const point = getPoint(e)
	const target = document.elementFromPoint(point.x, point.y) as HTMLElement | null
	const barEl = target?.closest<HTMLElement>('[data-bar-idx]')
	if (!barEl || readonly) return

	const idx = Number(barEl.dataset.barIdx)
	if (!isNaN(idx)) {
		emit('change', idx)
	}
}

function onPointerDown(e: MouseEvent | TouchEvent) {
	if (readonly) return

	isDragging.value = true
	handleDrag(e)
}

function onPointerMove(e: MouseEvent | TouchEvent) {
	if (!isDragging.value || readonly) return
	handleDrag(e)
}

function onPointerUp() {
	isDragging.value = false
}

function handleDrag(e: MouseEvent | TouchEvent) {
	const point = getPoint(e)
	const target = document.elementFromPoint(point.x, point.y) as HTMLElement | null
	const barEl = target?.closest<HTMLElement>('[data-bar-idx]')
	if (!barEl) return

	const idx = Number(barEl.dataset.barIdx)
	if (!isNaN(idx)) {
		emit('change', idx)
	}
}

function getPoint(e: MouseEvent | TouchEvent) {
	if ('touches' in e && e.touches.length > 0) {
		return { x: e.touches[0].clientX, y: e.touches[0].clientY }
	} else if ('changedTouches' in e && e.changedTouches.length > 0) {
		return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
	}
	return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }
}

onMounted(() => {
	window.addEventListener('mousemove', onPointerMove)
	window.addEventListener('mouseup', onPointerUp)
	window.addEventListener('touchmove', onPointerMove, { passive: false })
	window.addEventListener('touchend', onPointerUp)
})

onBeforeUnmount(() => {
	window.removeEventListener('mousemove', onPointerMove)
	window.removeEventListener('mouseup', onPointerUp)
	window.removeEventListener('touchmove', onPointerMove)
	window.removeEventListener('touchend', onPointerUp)
})
</script>

<template>
	<div
		ref="btnBarsRef"
		class="pt-[16px] flex flex-wrap gap-y-[32px]"
		@click="handleClick"
		@mousedown="onPointerDown"
		@touchstart="onPointerDown"
	>
		<div class="bg-gray-300 w-[3px]">
			<div
				v-for="str in strings"
				:key="str"
				class="h-[22px]"
			></div>
		</div>

		<div
			v-for="(bar, idx) in bars"
			:key="`bar-${idx}`"
			:data-bar-idx="idx"
			:class="[
				{
					'ring-2 ring-gray-200': currentBarIdx === idx,
					'cursor-pointer': !readonly,
				},
				'flex flex-col-reverse p-[2px] rounded w-[32px] text-center relative',
			]"
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
					class="flex justify-center relative"
				>
					<div class="bg-gray-100 h-[4px] w-[calc(100%+16px)] left-0 top-[calc(50%-2px)] absolute -z-1" />
					<p
						:class="[
							{
								'bg-[--c] bg-opacity-30': bar[str]?.finger,
							},
							'text-center h-[22px] w-[22px] rounded',
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
			class="ml-[16px] bg-gray-300 w-[3px]"
		>
			<div
				v-for="str in strings"
				:key="str"
				class="h-[22px]"
			></div>
		</div>
	</div>
</template>
