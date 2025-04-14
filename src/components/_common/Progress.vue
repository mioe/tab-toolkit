<template>
	<div
		class="border rounded bg-white flex h-[16px] w-full left-0 top-[-24px] absolute overflow-hidden"
	>
		<div
			class="progress bg-current h-full w-full left-0 top-0 absolute"
		/>
	</div>
</template>

<style>
.progress {
	animation-duration: 1s;
	animation-name: progress;
}

@keyframes progress {
	from {
		width: 0%;
	}

	to {
		width: 100%;
	}
}
</style>
