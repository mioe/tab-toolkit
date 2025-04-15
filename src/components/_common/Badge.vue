<script setup lang="ts">
import packageJson from '../../../package.json'
</script>

<template>
	<footer class="mx-auto mt-auto flex flex-col max-w-[340px] items-center bottom-[16px] justify-center sticky">
		<slot />
		<p class="text-[10px] px-[8px] py-[1px] rounded-full bg-white shadow">
			tab-toolkit_v{{ packageJson.version }}
			<a
				href="https://github.com/mioe/tab-toolkit"
				target="_blank"
				class="link"
			>
				by mioe
			</a>
		</p>
	</footer>
</template>
