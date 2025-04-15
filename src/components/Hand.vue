<script setup lang="ts">
import HandIcon from '~/components/_common/HandIcon.vue'
const appStore = useAppStore()
const { setFinger, nextFinger } = appStore
</script>

<template>
	<button class="text-gray-200 h-[120px] w-[120px] right-[24px] top-[-90px] absolute">
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

			<HandIcon
				@next-finger="nextFinger"
				@set-finger="setFinger($event)"
			/>
		</div>
	</button>
</template>
