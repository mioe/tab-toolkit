<template>
	<footer class="mt-auto flex flex-col items-center bottom-[16px] justify-center sticky">
		<slot />
		<p class="text-[10px] px-[8px] py-[1px] rounded-full bg-white shadow">
			tab-toolkit_v0
			<a
				href="https://github.com/mioe/tab-toolkit"
				target="_blank"
				class="text-green-600 underline underline-dashed"
			>
				by mioe
			</a>
		</p>
	</footer>
</template>
