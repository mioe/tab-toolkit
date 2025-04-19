<script setup lang="ts">
import HandIcon from '~/components/_common/HandIcon.vue'
const appStore = useAppStore()
const { setFinger, nextFinger } = appStore
</script>

<template>
	<button
		:class="[
			{

			},
			(appStore.orientation === 'portrait-primary' || appStore.orientation === 'portrait-secondary')
				? 'right-[24px] top-[-90px] h-[120px]' : '-bottom-[calc(20px+var(--safe-area-bottom)-4px)] left-[50%] translate-x-[-50%] h-[90px]',
			'text-gray-200 w-[120px] absolute flex',
		]"
	>
		<div class="relative">
			<div
				:class="[
					appStore.currentFingerIdx === 1 ? 'top-0' : 'top-[16px]',
					'rounded-full bg-gray-300 h-[8px] w-[8px] left-[35px] absolute anime',
				]"
			/>
			<div
				:class="[
					appStore.currentFingerIdx === 2 ? 'top-[-12px]' : 'top-[4px]',
					'rounded-full bg-gray-300 h-[8px] w-[8px] left-[59px] absolute anime',
				]"
			/>
			<div
				:class="[
					appStore.currentFingerIdx === 3 ? 'top-[-5px]' : 'top-[11px]',
					'rounded-full bg-gray-300 h-[8px] w-[8px] left-[83px] absolute anime',
				]"
			/>
			<div
				:class="[
					appStore.currentFingerIdx === 4 ? 'top-[7px]' : 'top-[23px]',
					'rounded-full bg-gray-300 h-[8px] w-[8px] left-[107px] absolute anime',
				]"
			/>

			<div
				:class="[
					(appStore.orientation === 'portrait-primary' || appStore.orientation === 'portrait-secondary')
						? 'h-[120px]' : 'my-auto h-[90px] overflow-hidden',
					'w-[120px]  relative'
				]"
			>
				<HandIcon
					@next-finger="nextFinger"
					@set-finger="setFinger($event)"
				/>
			</div>
		</div>
	</button>
</template>
