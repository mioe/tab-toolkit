<script setup lang="ts">
const appStore = useAppStore()
const { nextBar, prevBar } = appStore

const TABS = 25
const strings = computed(() => appStore.settings.strings)
</script>

<template>
	<aside class="mt-auto p-[16px] border-t border-gray-200 bg-white bottom-0 left-0 sticky z-1">
		<details>
			<summary class="px-[8px] py-[4px] border border-gray-200 rounded-xl bg-white cursor-pointer top-[-24px] absolute z-1">
				Toolkit
			</summary>
			<div class="flex flex-col gap-[8px]">
				<div class="text-[18px] relative">
					<div class="py-[8px] flex flex-col-reverse gap-[4px] w-full left-0 top-[1px] absolute">
						<div
							v-for="str in strings"
							:key="str"
							class="text-white relative"
						>
							{{ str }}
							<div
								class="bg-gray-200 w-full translate-y-[-50%] top-[50%] absolute"
								:style="{ height: `${2*str/1.5}px` }"
							/>
						</div>
					</div>
					<div class="px-[16px] py-[8px] border border-gray-200 rounded-xl flex gap-[16px] relative overflow-x-auto">
						<div class="flex flex-col-reverse gap-[4px]">
							<button
								v-for="str in strings"
								:key="str"
							>
								0
							</button>
						</div>
						<div
							v-for="tab in TABS"
							:key="tab"
							class="flex flex-col-reverse gap-[4px]"
						>
							<button
								v-for="str in strings"
								:key="str"
								class="cursor-pointer"
							>
								{{ tab }}
							</button>
						</div>
						<div class="flex flex-col-reverse gap-[4px]">
							<button
								v-for="str in strings"
								:key="str"
							>
								X
							</button>
						</div>
					</div>
				</div>

				<footer class="flex flex-wrap gap-[8px]">
					<button
						:class="appStore.soloMode ? 'btn-active' : 'btn'"
						@click="appStore.soloMode = !appStore.soloMode"
					>
						solo
					</button>
					<button
						class="btn"
						@click="prevBar"
					>
						prev
					</button>
					<button
						class="btn"
						@click="nextBar"
					>
						next
					</button>
				</footer>
			</div>
		</details>
	</aside>
</template>
