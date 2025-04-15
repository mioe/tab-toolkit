<script setup lang="ts">
import { ColorFinger } from '~/consts'

const { readonly = false } = defineProps<{
	readonly?: boolean
}>()

const emit = defineEmits<{
	(e: 'next-finger'): void
	(e: 'set-finger', idx: number): void
}>()
</script>

<template>
	<svg
		viewBox="0 0 200 200"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="relative"
	>
		<path
			d="M170.007 80.5H200.001L200.001 150C200.001 163.261 194.734 175.979 185.359 185.355C175.984 194.732 163.269 200 150.011 200H77.826C69.3117 199.996 60.9395 197.817 53.5033 193.669L50.0317 191.543V143.1L50.0317 80.5H80.0255V90H90.0234V80.5H120.017V90H130.015L130.015 80.5H160.009L160.009 90H170.007L170.007 80.5Z"
			fill="currentColor"
			:class="[
				{'cursor-pointer': !readonly},
				'text-gray-300',
			]"
			@click="emit('next-finger')"
		/>
		<path
			d="M27.8364 107.1L50.0317 143.1V191.543C44.1139 187.578 39.0977 182.385 35.3348 176.3L2.24168 122.9C0.146907 119.505 -0.513784 115.417 0.404953 111.535C1.32369 107.653 3.7466 104.295 7.14066 102.2C10.5347 100.105 14.6219 99.4439 18.5031 100.363C22.3843 101.282 25.7416 103.705 27.8364 107.1Z"
			fill="currentColor"
			:class="{'cursor-pointer': !readonly}"
			@click="emit('set-finger', 0)"
		/>
		<path
			d="M75.633 24.3934C78.4455 27.2064 80.0255 31.0218 80.0255 35V80.5H50.0317V35C50.0317 31.0218 51.6118 27.2064 54.4242 24.3934C57.2367 21.5804 61.0512 20 65.0286 20C69.006 20 72.8205 21.5804 75.633 24.3934Z"
			:fill="ColorFinger.finger1"
			:class="{'cursor-pointer': !readonly}"
			@click="emit('set-finger', 1)"
		/>
		<path
			d="M115.625 4.3934C118.437 7.20644 120.017 11.0218 120.017 15V80.5H90.0234V15C90.0234 11.0218 91.6034 7.20644 94.4159 4.3934C97.2283 1.58035 101.043 0 105.02 0C108.998 0 112.812 1.58035 115.625 4.3934Z"
			:fill="ColorFinger.finger2"
			:class="{'cursor-pointer': !readonly}"
			@click="emit('set-finger', 2)"
		/>
		<path
			d="M155.616 14.3934C158.429 17.2064 160.009 21.0218 160.009 25V80.5H130.015V25C130.015 21.0218 131.595 17.2064 134.408 14.3934C137.22 11.5804 141.035 10 145.012 10C148.989 10 152.804 11.5804 155.616 14.3934Z"
			:fill="ColorFinger.finger3"
			:class="{'cursor-pointer': !readonly}"
			@click="emit('set-finger', 3)"
		/>
		<path
			d="M174.399 34.3934C177.212 31.5803 181.026 30 185.004 30C188.981 30 192.796 31.5803 195.608 34.3934C198.421 37.2064 200.001 41.0218 200.001 45V80.5H170.007V45C170.007 41.0218 171.587 37.2064 174.399 34.3934Z"
			:fill="ColorFinger.finger4"
			:class="{'cursor-pointer': !readonly}"
			@click="emit('set-finger', 4)"
		/>
	</svg>
</template>
